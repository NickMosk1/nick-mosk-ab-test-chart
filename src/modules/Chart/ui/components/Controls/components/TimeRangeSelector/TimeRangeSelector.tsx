import { observer } from 'mobx-react-lite';
import styles from './TimeRangeSelector.module.css';
import { useStores } from '@/shared/hooks';
import { TimeRange } from '@/shared/types';

interface TimeRangeSelectorProps {
  chartId: string;
};

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = observer(({ chartId }) => {
  const { chartStore } = useStores();
  const settings = chartStore.getChartSettings(chartId);

  if (!settings) return null;

  const handleTimeRangeChange = (timeRange: TimeRange) => chartStore.setTimeRange(chartId, timeRange);

  return (
    <div className={styles.timeRangeSelector}>
      <label className={styles.label}>View:</label>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${settings.timeRange === TimeRange.DAY ? styles.active : ''}`}
          onClick={() => handleTimeRangeChange(TimeRange.DAY)}
        >
          Day
        </button>
        <button
          className={`${styles.button} ${settings.timeRange === TimeRange.WEEK ? styles.active : ''}`}
          onClick={() => handleTimeRangeChange(TimeRange.WEEK)}
        >
          Week
        </button>
      </div>
    </div>
  );
});

export default TimeRangeSelector;
