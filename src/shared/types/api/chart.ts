import { ElementTypes, Endpoint } from "@/shared/types";

export enum TimeRange {
  DAY = "day",
  WEEK = "week",
};

export enum LineStyle {
  MONOTONE = "monotone",
  NATURAL = "natural",
  LINEAR = "linear",
  STEP = "step",
  BUMP = "bump",
  BASIS = "basis",
};

export type VariationId = string;
export type ConversionRate = number;

export interface Variation {
  id: VariationId;
  name: string;
  color: string;
  enabled: boolean;
};

export interface ChartSettings {
  timeRange: TimeRange;
  lineStyle: LineStyle;
  variations: Variation[];
  zoomEnabled: boolean;
  exportEnabled: boolean;
  colors: string[];
};

export interface ChartElement extends Element {
  type: ElementTypes.CHART;
  title: string;
  dataSourceEndpoint: Endpoint;
  settings: ChartSettings;
};

export type RawChartData = RawChartDataPoint[];

export interface RawChartDataPoint {
  date: Date;
  visits: Record<VariationId, number>;
  conversions: Record<VariationId, number>;
};
