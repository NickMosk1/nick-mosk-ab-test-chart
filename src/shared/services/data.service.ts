import axios from "axios";
import ErrorService from "./error.service";
import { APIResponse } from "@/shared/types";

class DataService {
  private static instance: DataService;
  private errorService: ErrorService;

  private constructor() {
    this.errorService = ErrorService.getInstance();
  };

  static getInstance(): DataService {
    return (this.instance ??= new DataService());
  };

  async getMockData<T = any>(mockFilePath: string): Promise<APIResponse<T> | undefined> {
    try {
      const res = await axios.get<APIResponse<T>>(mockFilePath);
      return res.data;
    } catch (error) {
      this.errorService.hadleError(error, `Failed to load mock data from ${mockFilePath}`);
      return;
    };
  };
};

export default DataService;
