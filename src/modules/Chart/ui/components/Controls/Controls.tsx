import { observer } from 'mobx-react-lite';
import styles from './Controls.module.css';
import { ExportButton, LineTypeSelector, TimeRangeSelector, VariationsSelector } from './components';
import { Nullable } from '@/shared/types';

interface ControlsProps {
  chartId: string;
  chartRef: React.RefObject<Nullable<HTMLDivElement>>;
};

const Controls: React.FC<ControlsProps> = observer(({ chartId, chartRef }) => {
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
          chartElement={chartRef?.current}
        />
      </div>
    </div>
  );
});

export default Controls;
