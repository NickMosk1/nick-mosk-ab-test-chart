import { makeAutoObservable } from "mobx";
import { Page } from "../types";

class PageConfigStore {
  private _pageConfigs: Record<string, Page> = {};
  private _pageConfigLoadingStates: Record<string, boolean> = {};

  constructor() {
    makeAutoObservable(this);
  };

  // ========== DATA STORAGE ==========

  getPageConfig(url: string): Page | undefined {
    return this._pageConfigs[url];
  };

  setPageConfig(url: string, config: Page) {
    this._pageConfigs[url] = config;
  };

  // ========== LOADING STATES ==========

  getPageConfigLoadingState(url: string): boolean {
    return !!this._pageConfigLoadingStates[url];
  };

  setPageConfigLoadingState(url: string, loading: boolean) {
    this._pageConfigLoadingStates[url] = loading;
  };
};

export default PageConfigStore;
