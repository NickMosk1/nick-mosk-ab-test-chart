import { observer } from 'mobx-react-lite';
import styles from './ZoomControls.module.css';
import { useStores } from '@/shared/hooks';

interface ZoomControlsProps {
  chartId: string;
};

const ZoomControls: React.FC<ZoomControlsProps> = observer(({ chartId }) => {
  const { chartStore } = useStores();
  const settings = chartStore.getChartSettings(chartId);

  // В реальной реализации zoom state будет в компоненте LineChart
  // Это заглушка для демонстрации
  const handleResetZoom = () => {
    // Реализация сброса zoom будет в LineChart компоненте
    console.log('Reset zoom for chart:', chartId);
    // Будет вызывать callback из LineChart
  };

  const handleZoomIn = () => {
    console.log('Zoom in for chart:', chartId);
  };

  const handleZoomOut = () => {
    console.log('Zoom out for chart:', chartId);
  };

  if (!settings?.zoomEnabled) return null;

  return (
    <div className={styles.zoomControls}>
      <div className={styles.zoomButtons}>
        <button
          className={styles.zoomButton}
          onClick={handleZoomOut}
          title="Zoom Out"
        >
          ➖
        </button>
        <button
          className={styles.zoomButton}
          onClick={handleResetZoom}
          title="Reset Zoom"
        >
          🔍
        </button>
        <button
          className={styles.zoomButton}
          onClick={handleZoomIn}
          title="Zoom In"
        >
          ➕
        </button>
      </div>
    </div>
  );
});

export default ZoomControls;
