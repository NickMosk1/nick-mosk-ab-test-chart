import { ElementId, TimeRange } from "@/shared/types";
import { ChartService } from "../services";
import { useStores } from "@/shared/hooks";
import { useMemo } from "react";

const useChartData = (chartId: ElementId) => {
  const { chartStore } = useStores();
  const chartService = ChartService.getInstance();

  const rawData = chartStore.getChartData(chartId);
  const settings = chartStore.getChartSettings(chartId);
  const isLoading = chartStore.getChartDataLoadingState(chartId);
  
  const hasData = !!rawData?.length;
  const enabledVariations = settings?.variations.filter(v => !!v.enabled) || [];

  const preparedData = useMemo(() => {
    if (!rawData || !settings) return;
    return chartService.processData({ rawData, settings, chartId });
  }, [rawData, settings, chartId, chartService]);

  const rechartsData = useMemo(() => {
    if (!preparedData) return [];
    return chartService.formatForRecharts(preparedData);
  }, [preparedData, chartService]);

  const conversionRateRange = useMemo(() => {
    if (!preparedData) return { min: 0, max: 100 };
    return chartService.getConversionRateRange(preparedData);
  }, [preparedData, chartService]);

  const timeRange = preparedData?.timeRange || TimeRange.DAY;

  return {
    rechartsData,
    conversionRateRange,
    enabledVariations,
    isLoading,
    hasData,
    timeRange,
  };
};

export default useChartData;
