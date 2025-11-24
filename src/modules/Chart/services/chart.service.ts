import { ChartStore, ProcessDataArgs } from "@/modules/Chart";
import {
  ConversionRate,
  ElementId,
  Endpoint,
  PreparedChartData,
  ProcessedDataPoint,
  RawChartData,
  RawChartDataPoint,
  TimeRange,
  Variation,
  VariationId,
  WeekDataPoint,
} from "@/shared/types";
import { EMPTY_CHART_DATA } from "@/shared/constants";
import { DataService } from "@/shared/services";
import { CHART_STORE } from "@/shared/stores/provider";
import { checkAPIResponse, Injector } from "@/shared/utils";

class ChartService {
  private static _instance: ChartService;
  private _chartStore: ChartStore;

  private _dataService: DataService;

  constructor() {
    this._chartStore = Injector.get<ChartStore>(CHART_STORE);

    this._dataService = DataService.getInstance();
  };

  static getInstance(): ChartService {
    return (this._instance ??= new ChartService());
  };

  // ========== MAIN DATA FETCHING ==========

  async fetchChartData(
    endpoint: Endpoint,
    chartId: ElementId,
  ) {
    const mockURL = this.getMockUrl(endpoint.url);

    this._chartStore.setChartDataLoadingState(chartId, true);
    const response = await this._dataService.getMockData<RawChartData>(mockURL);
    this._chartStore.setChartDataLoadingState(chartId, false);

    if (!checkAPIResponse(response)) return this._chartStore.setChartData(chartId, EMPTY_CHART_DATA);
    return this._chartStore.setChartData(chartId, response.data);
  };

  private getMockUrl(url: string): string {
    switch (url) {
      case "/chart-data-1":
        return "/mock/data/chartData.json";
      default:
        return "/";
    };
  };

  // ========== DATA PROCESSING ==========

  processData({
    rawData,
    settings,
    chartId,
  }: ProcessDataArgs): PreparedChartData {
    const processedDataPoints = rawData.map(rawPoint => 
      this.processDataPoint(rawPoint, settings.variations)
    );
    
    if (settings.timeRange === TimeRange.WEEK) {
      const weeklyData = this.groupByWeek(processedDataPoints);
      return { 
        chartId,
        data: weeklyData, 
        timeRange: TimeRange.WEEK 
      };
    };
    
    return { 
      chartId,
      data: processedDataPoints, 
      timeRange: TimeRange.DAY 
    };
  };

  private processDataPoint(
    rawPoint: RawChartDataPoint,
    variations: Variation[],
  ): ProcessedDataPoint {
    const variationsData: Record<VariationId, ConversionRate> = {};
    const visitsData: Record<VariationId, number> = {};
    const conversionsData: Record<VariationId, number> = {};

    variations.forEach(variation => {
      const visits = rawPoint.visits[variation.id] || 0;
      const conversions = rawPoint.conversions[variation.id] || 0;
      variationsData[variation.id] = visits > 0 ? (conversions / visits) * 100 : 0;
      visitsData[variation.id] = visits;
      conversionsData[variation.id] = conversions;
    });

    const dateObject = new Date(rawPoint.date);
    
    return { 
      date: dateObject,
      timestamp: dateObject.getTime(), 
      variations: variationsData,
      visits: visitsData,
      conversions: conversionsData
    };
  };

  private groupByWeek(dataPoints: ProcessedDataPoint[]): WeekDataPoint[] {
    const weeksMap = new Map<string, WeekDataPoint>();
    
    dataPoints.forEach(point => {
      const date = point.date;
      const weekStart = this.getWeekStart(new Date(date));
      const weekEnd = this.getWeekEnd(new Date(date));
      const weekKey = weekStart.toISOString().split('T')[0];
      
      if (!weeksMap.has(weekKey)) {
        weeksMap.set(weekKey, {
          date: weekStart,
          timestamp: weekStart.getTime(),
          startDate: weekStart,
          endDate: weekEnd,
          weekNumber: this.getWeekNumber(weekStart),
          variations: {},
          visits: {},
          conversions: {}
        });
      };
      
      const weekData = weeksMap.get(weekKey)!;
      
      Object.keys(point.variations).forEach(variationId => {
        const currentVisits = point.visits?.[variationId] || 0;
        const currentConversions = point.conversions?.[variationId] || 0;
        
        weekData.visits![variationId] = (weekData.visits![variationId] || 0) + currentVisits;
        weekData.conversions![variationId] = (weekData.conversions![variationId] || 0) + currentConversions;
        
        const totalVisits = weekData.visits![variationId];
        const totalConversions = weekData.conversions![variationId];
        weekData.variations[variationId] = totalVisits > 0 ? (totalConversions / totalVisits) * 100 : 0;
      });
    });
    
    return Array.from(weeksMap.values()).sort((a, b) => a.timestamp - b.timestamp);
  };

  private getWeekStart(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.getFullYear(), date.getMonth(), diff);
  };

  private getWeekEnd(date: Date): Date {
    const start = this.getWeekStart(new Date(date));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
  };

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // ========== DATA TRANSFORMATIONS FOR RECHARTS ==========

  formatForRecharts(preparedData: PreparedChartData): any[] {
    return preparedData.data.map(point => {
      const isWeekly = preparedData.timeRange === TimeRange.WEEK;
      const weekPoint = point as WeekDataPoint;
      
      const formatted: any = {
        date: point.date.toISOString().split('T')[0],
        timestamp: point.timestamp,
        originalDate: point.date,
        timeRange: preparedData.timeRange,
        chartId: preparedData.chartId,
      };

      if (isWeekly) {
        formatted.startDate = weekPoint.startDate.toISOString().split('T')[0];
        formatted.endDate = weekPoint.endDate.toISOString().split('T')[0];
        formatted.weekNumber = weekPoint.weekNumber;
        formatted.displayDate = `Week ${weekPoint.weekNumber} (${this.formatDateRange(weekPoint.startDate, weekPoint.endDate)})`;
      } else {
        formatted.displayDate = point.date.toISOString().split('T')[0];
      };

      Object.entries(point.variations).forEach(([variationId, rate]) => {
        formatted[`variation_${variationId}`] = rate;
      });

      return formatted;
    });
  };

  private formatDateRange(startDate: Date, endDate: Date): string {
    const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    
    const startStr = startDate.toLocaleDateString('en-US', formatOptions);
    const endStr = endDate.toLocaleDateString('en-US', formatOptions);
    
    return `${startStr} - ${endStr}`;
  };

  getConversionRateRange(preparedData: PreparedChartData): { min: number; max: number } {
    if (preparedData.data.length === 0) return { min: 0, max: 100 };

    const allRates = preparedData.data.flatMap(point =>
      Object.values(point.variations).filter(rate => !isNaN(rate))
    );

    if (allRates.length === 0) return { min: 0, max: 100 };

    return { min: Math.min(...allRates), max: Math.max(...allRates) };
  };
};

export default ChartService;
