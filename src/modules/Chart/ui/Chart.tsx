import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Chart.module.css';
import { ChartService } from '../services';
import { ChartElement } from '@/shared/types';
import { useStores } from '@/shared/hooks';
import useChartData from '../hooks/useChartData';
import { ChartContainer, Controls, LineChart } from './components';

interface ChartProps {
  element: ChartElement;
};

const Chart: React.FC<ChartProps> = observer(({ element }) => {
  const { chartStore } = useStores();
  const chartService = ChartService.getInstance();
  const chartRef = useRef<HTMLDivElement>(null);

  const { id, settings, dataSourceEndpoint, title } = element;

  const {
    rechartsData,
    conversionRateRange,
    enabledVariations,
    isLoading,
    hasData,
  } = useChartData(id);

  useEffect(() => {
    if (!chartStore.isInitialized(id)) chartStore.initializeChart(id, settings);
  }, [id, settings, chartStore]);

  useEffect(() => {
    if (!hasData && !isLoading) chartService.fetchChartData(dataSourceEndpoint, id);
  }, [id, hasData, isLoading, dataSourceEndpoint, chartService]);

  const chartSettings = chartStore.getChartSettings(id);

  return (
    <div 
      className={styles.chartWrapper}
      ref={chartRef}
    >
      <div className={styles.chartHeader}>
        <div className={styles.title}>{title}</div>
      </div>

      <ChartContainer
        isLoading={isLoading}
        className={styles.chartContainer}
      >
        {chartSettings && (
          <LineChart
            data={rechartsData}
            variations={enabledVariations}
            conversionRateRange={conversionRateRange}
            lineType={chartSettings.lineType}
          />
        )}
      </ChartContainer>
    
      {chartSettings && <Controls chartId={id} chartRef={chartRef} />}
    </div>
  );
});

export default Chart;
