import { EMPTY_PAGE_DATA } from "@/shared/constants";
import { PageConfigStore } from "@/shared/stores";
import { PAGE_CONFIG_STORE } from "@/shared/stores/provider";
import { Page } from "@/shared/types";
import { checkAPIResponse, Injector } from "@/shared/utils";
import DataService from "./data.service";
import { APP_CONFIG } from "../config/app-config";

class PageConfigService {
  private static _instance: PageConfigService;
  private _pageConfigStore: PageConfigStore;

  private _dataService: DataService;

  constructor() {
    this._pageConfigStore = Injector.get<PageConfigStore>(PAGE_CONFIG_STORE);

    this._dataService = DataService.getInstance();
  };

  static getInstance(): PageConfigService {
    return (this._instance ??= new PageConfigService());
  };

  async fetchPageConfig(url: string) {
    const mockURL = this.getMockUrl(url);

    this._pageConfigStore.setPageConfigLoadingState(url, true);
    const response = await this._dataService.getMockData<Page>(mockURL);
    this._pageConfigStore.setPageConfigLoadingState(url, false);

    if (!checkAPIResponse(response)) return this._pageConfigStore.setPageConfig(url, { ...EMPTY_PAGE_DATA, url });
    return this._pageConfigStore.setPageConfig(url, response.data);
  };

  private getMockUrl(url: string): string {
    switch (url) {
      case `${APP_CONFIG.BASE_PATH}/charts`:
        return `${APP_CONFIG.BASE_PATH}/mock/pageConfig/chartPageConfig.json`;
      default:
        return APP_CONFIG.BASE_PATH || "/";
    };
  };
};

export default PageConfigService;
