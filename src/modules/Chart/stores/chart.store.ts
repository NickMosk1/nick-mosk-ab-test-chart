import { makeAutoObservable } from "mobx";
import { ChartSettings, ElementId, LineType, RawChartData, TimeRange } from "@/shared/types";

class ChartStore {
  private _chartDatas: Record<ElementId, RawChartData> = {};
  private _chartDataLoadingStates: Record<ElementId, boolean> = {};

  private _chartSettings: Record<ElementId, ChartSettings> = {};

  constructor() {
    makeAutoObservable(this);
  };

  // ========== DATA STORAGE ==========

  getChartData(elementId: ElementId): RawChartData | undefined {
    return this._chartDatas[elementId];
  };

  setChartData(elementId: ElementId, data: RawChartData) {
    this._chartDatas[elementId] = data;
  };

  // ========== SETTINGS STORAGE ==========

  getChartSettings(elementId: ElementId): ChartSettings | undefined {
    return this._chartSettings[elementId];
  };

  setChartSettings(elementId: ElementId, settings: ChartSettings) {
    this._chartSettings[elementId] = settings;
  };

  updateChartSettings(elementId: ElementId, newSettings: Partial<ChartSettings>) {
    const existing = this._chartSettings[elementId];
    if (existing) this._chartSettings[elementId] = { ...existing, ...newSettings };
  };

  // ========== LOADING STATES ==========

  getChartDataLoadingState(elementId: ElementId): boolean {
    return !!this._chartDataLoadingStates[elementId];
  };

  setChartDataLoadingState(elementId: ElementId, loading: boolean) {
    this._chartDataLoadingStates[elementId] = loading;
  };

  // ========== SIMPLE ACTIONS ==========

  setTimeRange(elementId: ElementId, timeRange: TimeRange) {
    this.updateChartSettings(elementId, { timeRange });
  };

  setLineType(elementId: ElementId, lineType: LineType) {
    this.updateChartSettings(elementId, { lineType });
  };

  toggleVariation(elementId: ElementId, variationId: string) {
    const settings = this._chartSettings[elementId];
    if (settings) {
      const variation = settings.variations.find(v => v.id === variationId);
      if (variation) variation.enabled = !variation.enabled;
    };
  };

  // ========== BULK OPERATIONS ==========

  initializeChart(elementId: ElementId, settings: ChartSettings) {
    this.setChartSettings(elementId, settings);
  };

  removeChart(elementId: ElementId) {
    delete this._chartDatas[elementId];
    delete this._chartSettings[elementId];
    delete this._chartDataLoadingStates[elementId];
  };

  // ========== UTILITIES ==========

  isInitialized(elementId: ElementId): boolean {
    return !!this._chartSettings[elementId];
  };
};

export default ChartStore;
