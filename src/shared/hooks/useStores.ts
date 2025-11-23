import { useContext } from "react";
import { StoreContext } from "@/shared/stores/context";

export function useStores() {
  const context = useContext(StoreContext);
  if (context === null) throw new Error("useStores must be used within a StoreProvider");
  return context;
};
