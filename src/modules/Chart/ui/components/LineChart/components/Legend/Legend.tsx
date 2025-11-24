import styles from './Legend.module.css';
import { LegendPayloadItem } from './types';

interface LegendProps {
  payload?: LegendPayloadItem[];
};

const Legend: React.FC<LegendProps> = ({ payload }) => {
  if (!payload || !payload.length) return null;
  
  return (
    <div className={styles.legend}>
      {payload.map((entry, index) => (
        <div key={index} className={styles.legendItem}>
          <span className={styles.legendColor} style={{ backgroundColor: entry.color }} />
          <span className={styles.legendText}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
