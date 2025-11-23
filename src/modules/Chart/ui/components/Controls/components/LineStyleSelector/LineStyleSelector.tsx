import { observer } from 'mobx-react-lite';
import styles from './LineStyleSelector.module.css';
import { useStores } from '@/shared/hooks';
import { LineStyle } from '@/shared/types';

interface LineStyleSelectorProps {
  chartId: string;
};

const LineStyleSelector: React.FC<LineStyleSelectorProps> = observer(({ chartId }) => {
  const { chartStore } = useStores();
  const settings = chartStore.getChartSettings(chartId);

  if (!settings) return null;

  const handleLineStyleChange = (lineStyle: LineStyle) => chartStore.setLineStyle(chartId, lineStyle);

  const stylesConfig = { //consts
    [LineStyle.LINE]: { label: 'Line', icon: '📈' },
    [LineStyle.SMOOTH]: { label: 'Smooth', icon: '🔄' },
    [LineStyle.AREA]: { label: 'Area', icon: '🔽' }
  };

  return (
    <div className={styles.lineStyleSelector}>
      <label className={styles.label}>Style:</label>
      <div className={styles.buttonGroup}>
        {Object.entries(stylesConfig).map(([key, config]) => (
          <button
            key={key}
            className={`${styles.button} ${settings.lineStyle === key ? styles.active : ''}`}
            onClick={() => handleLineStyleChange(key as LineStyle)}
            title={config.label}
          >
            <span className={styles.icon}>{config.icon}</span>
            <span className={styles.labelText}>{config.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
});

export default LineStyleSelector;
