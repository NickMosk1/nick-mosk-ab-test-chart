import { useCallback, useMemo } from 'react';
import ChartService from '../services/chart.service';
import { Endpoint, ElementId, PreparedChartData, ChartSettings, RawChartData, Variation } from '@/shared/types';
import { useStores } from '@/shared/hooks';

interface UseChartDataReturn {
  rawData?: RawChartData;
  preparedData?: PreparedChartData;
  rechartsData: any[];

  isLoading: boolean;
  hasData: boolean;

  conversionRateRange: { min: number; max: number };
  settings: ChartSettings | undefined;
  enabledVariations: Variation[];

  fetchData: () => Promise<void>;
};

const useChartData = (
  chartId: ElementId,
  endpoint: Endpoint,
): UseChartDataReturn => {
  const { chartStore } = useStores();
  const chartService = ChartService.getInstance();

  const rawData = chartStore.getChartData(chartId);
  const settings = chartStore.getChartSettings(chartId);
  const isLoading = chartStore.getChartDataLoadingState(chartId);
  const hasData = !!rawData?.length;

  const enabledVariations = useMemo(() => {
    return settings?.variations.filter(v => v.enabled) || [];
  }, [settings]);

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

  const fetchData = useCallback(async () => {
    await chartService.fetchChartData(endpoint, chartId);
  }, [endpoint, chartId, chartService]);

  return {
    rawData,
    preparedData,
    rechartsData,
    conversionRateRange,
    settings,
    enabledVariations,
    isLoading,
    hasData,
    fetchData,
  };
};

export default useChartData;
