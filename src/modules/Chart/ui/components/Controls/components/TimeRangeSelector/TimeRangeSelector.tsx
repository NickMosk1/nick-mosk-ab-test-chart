import { observer } from 'mobx-react-lite';
import { useStores } from '@/shared/hooks';
import { ChipOption, ChipSelectionMode, TimeRange } from '@/shared/types';
import { ChipGroup } from '@/shared/ui';

interface TimeRangeSelectorProps {
  chartId: string;
};

const mockTimeRangeOptions: ChipOption[] = [
  { value: TimeRange.DAY, label: 'Day' },
  { value: TimeRange.WEEK, label: 'Week' },
];

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = observer(({ chartId }) => {
  const { chartStore } = useStores();
  const settings = chartStore.getChartSettings(chartId);

  if (!settings) return null;

  const handleTimeRangeChange = (timeRange: TimeRange) => chartStore.setTimeRange(chartId, timeRange);

  return (
    <ChipGroup
      options={mockTimeRangeOptions}
      value={settings.timeRange}
      onChange={handleTimeRangeChange}
      mode={ChipSelectionMode.SINGLE}
      label="View:"
    />
  );
});

export default TimeRangeSelector;
