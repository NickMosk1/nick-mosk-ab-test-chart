import { ChartElement, ConversionRate, ElementTypes, VariationId, Element, TimeRange, ElementId } from "@/shared/types";

export interface ProcessedDataPoint {
  date: Date;
  timestamp: number;
  variations: Record<VariationId, ConversionRate>;
  visits?: Record<VariationId, number>;
  conversions?: Record<VariationId, number>;
};

export interface WeekDataPoint extends ProcessedDataPoint {
  startDate: Date;
  endDate: Date;
  weekNumber: number;
};

export interface PreparedChartData {
  chartId: ElementId;
  data: ProcessedDataPoint[] | WeekDataPoint[];
  timeRange: TimeRange;
};

export function isChartElement(element: Element): element is ChartElement {
  return element.type === ElementTypes.CHART;
};
