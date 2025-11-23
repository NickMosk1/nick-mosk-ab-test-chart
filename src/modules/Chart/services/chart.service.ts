import { ChartStore, ProcessDataArgs } from "@/modules/Chart";
import {
  ConversionRate,
  ElementId,
  Endpoint,
  PreparedChartData,
  ProcessedDataPoint,
  RawChartData,
  RawChartDataPoint,
  Variation,
  VariationId,
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

    // console.log("response", JSON.stringify(response, null, 2));

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
    const processedDataPoints = rawData.map(rawPoint => this.processDataPoint(rawPoint, settings.variations));
    return { chartId, data: processedDataPoints };
  };

  private processDataPoint(
    rawPoint: RawChartDataPoint,
    variations: Variation[],
  ): ProcessedDataPoint {
    const variationsData: Record<VariationId, ConversionRate> = {};

    variations.forEach(variation => {
      const visits = rawPoint.visits[variation.id] || 0;
      const conversions = rawPoint.conversions[variation.id] || 0;
      variationsData[variation.id] = visits > 0 ? (conversions / visits) * 100 : 0;
    });

    const dateObject = new Date(rawPoint.date);
    
    return { date: rawPoint.date, timestamp: dateObject.getTime(), variations: variationsData };
  };

  // ========== DATA TRANSFORMATIONS FOR RECHARTS ==========

  formatForRecharts(preparedData: PreparedChartData): any[] {
    return preparedData.data.map(point => {
      const dateObj = typeof point.date === 'string' ? new Date(point.date) : point.date;

      const formatted: any = {
        date: dateObj.toISOString().split('T')[0],
        timestamp: point.timestamp,
        originalDate: dateObj,
      };

      Object.entries(point.variations).forEach(([variationId, rate]) => {
        formatted[`variation_${variationId}`] = rate;
      });

      return formatted;
    });
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
