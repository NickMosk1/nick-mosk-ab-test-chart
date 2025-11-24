import styles from './Tooltip.module.css';
import { TooltipPayloadItem } from './types';

interface TooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
};

const Tooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const firstEntry = payload[0]?.payload;
  const isWeekly = firstEntry?.timeRange === 'week';
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipDate}>
        {isWeekly ? firstEntry.displayDate : formatDate(label || '')}
      </div>
      {isWeekly && (
        <div className={styles.tooltipDateRange}>
          {formatDate(firstEntry.startDate)} to {formatDate(firstEntry.endDate)}
        </div>
      )}
      {payload.map((entry, index) => (
        <div key={index} className={styles.tooltipItem}>
          <span
            className={styles.tooltipColor}
            style={{ backgroundColor: entry.color }}
          />
          <span className={styles.tooltipName}>{entry.name}:</span>
          <span className={styles.tooltipValue}>
            {typeof entry.value === "number" ? entry.value.toFixed(2) + "%" : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Tooltip;
