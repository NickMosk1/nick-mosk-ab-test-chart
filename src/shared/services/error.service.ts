import toast from "react-hot-toast";

class ErrorService {
  private static _instance: ErrorService;

  private constructor() {}

  static getInstance(): ErrorService {
    return (this._instance ??= new ErrorService());
  };

  hadleError(error: unknown, description?: string) {
    console.error(description, error);

    let errorMessage = "An error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (error && typeof error === "object" && "message" in error) {
      errorMessage = String(error.message);
    };

    toast.error(errorMessage);
  };
};

export default ErrorService;
