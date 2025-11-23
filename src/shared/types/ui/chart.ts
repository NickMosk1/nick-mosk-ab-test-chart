import { ChartElement, ConversionRate, ElementTypes, VariationId, Element } from "@/shared/types";

export interface PreparedChartData {
  chartId: string;
  data: ProcessedDataPoint[];
};

export interface ProcessedDataPoint {
  date: Date;
  timestamp: number;
  variations: Record<VariationId, ConversionRate>;
};

export function isChartElement(element: Element): element is ChartElement {
  return element.type === ElementTypes.CHART;
};
