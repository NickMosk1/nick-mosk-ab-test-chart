import { ChartStore } from "@/modules/Chart";
import { Nullable } from "@/shared/types";
import PageConfigStore from "../pageConfig.store";
import RootStore from "../root.store";
import { createContext } from "react";

export interface StoreContextValue {
  rootStore: RootStore;
  pageConfigStore: PageConfigStore;
  chartStore: ChartStore;
};

export const StoreContext = createContext<Nullable<StoreContextValue>>(null);
