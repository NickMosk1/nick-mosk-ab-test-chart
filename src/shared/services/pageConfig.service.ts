import { EMPTY_PAGE_DATA } from "@/shared/constants";
import { PageConfigStore } from "@/shared/stores";
import { PAGE_CONFIG_STORE } from "@/shared/stores/provider";
import { Endpoint, Page } from "@/shared/types";
import { checkAPIResponse, Injector } from "@/shared/utils";
import DataService from "./data.service";

class PageConfigService {
  private static _instance: PageConfigService;
  private _pageConfigStore: PageConfigStore;

  private _dataService: DataService;

  constructor () {
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
      case "/charts":
        return "/mock/pageConfig/chartPageConfig.json";
      default:
        return "/";
    };
  };
};

export default PageConfigService;
