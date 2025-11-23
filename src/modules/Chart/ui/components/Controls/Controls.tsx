import { observer } from 'mobx-react-lite';
import styles from './Controls.module.css';
import { ExportButton, LineStyleSelector, TimeRangeSelector, VariationsSelector, ZoomControls } from './components';

interface ControlsProps {
  chartId: string;
};

const Controls: React.FC<ControlsProps> = observer(({ chartId }) => {
  return (
    <div className={styles.controlsContainer}>
      <div className={styles.primaryControls}>
        <VariationsSelector chartId={chartId} />
        <TimeRangeSelector chartId={chartId} />
        <LineStyleSelector chartId={chartId} />
      </div>

      <div className={styles.secondaryControls}>
        <ZoomControls chartId={chartId} />
        <ExportButton chartId={chartId} />
      </div>
    </div>
  );
});

export default Controls;
