"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Nullable } from "@/shared/types";
import RootStore from "../root.store";
import { CHART_STORE, PAGE_CONFIG_STORE } from "./identifiers";
import { Injector } from "@/shared/utils";
import { StoreContext, StoreContextValue } from "../context";

const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [rootStore, setRootStore] = useState<Nullable<StoreContextValue>>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const rootStr = new RootStore();
      setRootStore({ rootStore: rootStr, pageConfigStore: rootStr.pageConfigStore, chartStore: rootStr.chartStore });
    };
  }, []);

  if (rootStore) {
    Injector.register(PAGE_CONFIG_STORE, rootStore.pageConfigStore);
    Injector.register(CHART_STORE, rootStore.chartStore);
    
    return <StoreContext.Provider value={{ ...rootStore }}> {children} </StoreContext.Provider>;
  };

  return null;
};

export default StoreProvider;
