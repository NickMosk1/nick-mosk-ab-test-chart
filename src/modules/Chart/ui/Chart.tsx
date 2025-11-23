import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Chart.module.css';
import { ChartService } from '../services';
import { ChartElement, ZoomState } from '@/shared/types';
import { useStores } from '@/shared/hooks';
import { DEFAULT_ZOOM_STATE } from '@/shared/constants';
import useChartData from '../hooks/useChartData';
import { ChartContainer, Controls, LineChart } from './components';

interface ChartProps {
  element: ChartElement;
};

const Chart: React.FC<ChartProps> = observer(({ element }) => {
  const { chartStore } = useStores();
  const chartService = ChartService.getInstance();
  const [zoomState, setZoomState] = useState<ZoomState>(DEFAULT_ZOOM_STATE);

  const { id, settings, dataSourceEndpoint, title } = element;

  const {
    rechartsData,
    conversionRateRange,
    enabledVariations,
    isLoading,
    hasData,
  } = useChartData(id, dataSourceEndpoint);

  useEffect(() => {
    if (!chartStore.isInitialized(id)) chartStore.initializeChart(id, settings);
  }, [id, settings, chartStore]);

  useEffect(() => {
    if (!hasData && !isLoading) chartService.fetchChartData(dataSourceEndpoint, id);
  }, [id, hasData, isLoading, dataSourceEndpoint, chartService]);

  const visibleData = zoomState.isZoomed
    ? rechartsData.slice(zoomState.startIndex, zoomState.endIndex + 1)
    : rechartsData;

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chartHeader}>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <Controls chartId={id} />

      <ChartContainer
        isLoading={isLoading}
        className={styles.chartContainer}
      >
        <LineChart
          data={visibleData}
          variations={enabledVariations}
          conversionRateRange={conversionRateRange}
          // zoomState={zoomState}
          // onZoomChange={setZoomState}
        />
      </ChartContainer>
    </div>
  );
});

export default Chart;
