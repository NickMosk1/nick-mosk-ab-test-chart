import { observer } from 'mobx-react-lite';
import { useStores } from '@/shared/hooks';
import { ChipOption, ChipSelectionMode, LineType } from '@/shared/types';
import { ChipGroup } from '@/shared/ui';

interface LineTypeSelectorProps {
  chartId: string;
};

const mockLineTypeOptions: ChipOption[] = [
  { value: LineType.MONOTONE, label: 'Line' },
  { value: LineType.NATURAL, label: 'Natural' },
  { value: LineType.LINEAR, label: 'Linear' },
  { value: LineType.STEP, label: 'Step' },
  { value: LineType.BUMP, label: 'Bumb' },
  { value: LineType.BASIS, label: 'Basis' },
];

const LineTypeSelector: React.FC<LineTypeSelectorProps> = observer(({ chartId }) => {
  const { chartStore } = useStores();
  const settings = chartStore.getChartSettings(chartId);

  if (!settings) return null;

  const handleLineTypeChange = (lineType: LineType) => chartStore.setLineType(chartId, lineType);

  return (
    <ChipGroup
      options={mockLineTypeOptions}
      value={settings.lineType}
      onChange={handleLineTypeChange}
      mode={ChipSelectionMode.SINGLE}
      label="Type:"
    />
  );
});

export default LineTypeSelector;
