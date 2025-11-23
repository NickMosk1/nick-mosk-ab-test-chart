import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { toPng } from 'html-to-image';
import styles from './ExportButton.module.css';
import { useStores } from '@/shared/hooks';

interface ExportButtonProps {
  chartId: string;
};

const ExportButton: React.FC<ExportButtonProps> = observer(({ chartId }) => {
  const { chartStore } = useStores();
  const settings = chartStore.getChartSettings(chartId);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!chartRef.current) return;

    try {
      const dataUrl = await toPng(chartRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });

      const link = document.createElement('a');
      link.download = `chart-${chartId}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();

      console.log('Chart exported successfully:', chartId);
    } catch (error) {
      console.error('Error exporting chart:', error);
    };
  };

  if (!settings?.exportEnabled) return null;

  return (
    <div className={styles.exportButton}>
      <button
        className={styles.button}
        onClick={handleExport}
        title="Export as PNG"
      >
        <span className={styles.icon}>📥</span>
        <span className={styles.text}>Export</span>
      </button>

      <div ref={chartRef} className={styles.hiddenChart}>
        <div className={styles.exportContent}>
          <h3 className={styles.exportTitle}>Chart Export</h3>
          <p className={styles.exportSubtitle}>Chart ID: {chartId}</p>
        </div>
      </div>
    </div>
  );
});

export default ExportButton;
