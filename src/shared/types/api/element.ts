import { ChartElement } from "@/shared/types";

export type ElementId = string;

export interface Element {
  id: ElementId;
  type: ElementTypes;
};

export enum ElementTypes {
  CHART = "CHART",
};

export type AnyElement = ChartElement;
