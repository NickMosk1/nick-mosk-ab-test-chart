import styles from './Tooltip.module.css';

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
};

const Tooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipDate}>{label}</div>
      {payload.map((entry: any, index: number) => (
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
