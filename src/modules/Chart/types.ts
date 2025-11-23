import { ChartSettings, RawChartData } from "@/shared/types";

export type ProcessDataArgs = {
  rawData: RawChartData,
  settings: ChartSettings,
  chartId: string,
};
