import { ChartStore } from "@/modules/Chart";
import PageConfigStore from "./pageConfig.store";

class RootStore {
  pageConfigStore: PageConfigStore;
  chartStore: ChartStore;

  constructor() {
    this.pageConfigStore = new PageConfigStore();
    this.chartStore = new ChartStore();
  };
};

export default RootStore;
