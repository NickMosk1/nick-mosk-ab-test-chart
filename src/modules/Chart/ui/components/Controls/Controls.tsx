import { observer } from 'mobx-react-lite';
import styles from './Controls.module.css';
import { ExportButton, LineTypeSelector, TimeRangeSelector, VariationsSelector } from './components';
import { Nullable } from '@/shared/types';
import { useState, useEffect } from 'react';

interface ControlsProps {
  chartId: string;
  chartRef: React.RefObject<Nullable<HTMLDivElement>>;
};

const Controls: React.FC<ControlsProps> = observer(({ chartId, chartRef }) => {
  const [currentChartElement, setCurrentChartElement] = useState<Nullable<HTMLElement>>(null);

  useEffect(() => {
    if (chartRef.current) setCurrentChartElement(chartRef.current);
  }, [chartRef.current]);

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.primaryControls}>
        <VariationsSelector chartId={chartId} />
        <TimeRangeSelector chartId={chartId} />
        <LineTypeSelector chartId={chartId} />
      </div>

      <div className={styles.secondaryControls}>
        <ExportButton 
          chartId={chartId} 
          chartElement={currentChartElement}
        />
      </div>
    </div>
  );
});

export default Controls;
