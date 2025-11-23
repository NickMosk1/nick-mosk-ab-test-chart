import { observer } from 'mobx-react-lite';
import { useStores } from '@/shared/hooks';
import { ChipOption, ChipSelectionMode, LineStyle } from '@/shared/types';
import { ChipGroup } from '@/shared/ui';

interface LineStyleSelectorProps {
  chartId: string;
};

const mockLineStyleOptions: ChipOption[] = [
  { value: LineStyle.MONOTONE, label: 'Line' },
  { value: LineStyle.NATURAL, label: 'Natural' },
  { value: LineStyle.LINEAR, label: 'Linear' },
  { value: LineStyle.STEP, label: 'Step' },
  { value: LineStyle.BUMP, label: 'Bumb' },
  { value: LineStyle.BASIS, label: 'Basis' },
];

const LineStyleSelector: React.FC<LineStyleSelectorProps> = observer(({ chartId }) => {
  const { chartStore } = useStores();
  const settings = chartStore.getChartSettings(chartId);

  if (!settings) return null;

  const handleLineStyleChange = (lineStyle: LineStyle) => chartStore.setLineStyle(chartId, lineStyle);

  return (
    <ChipGroup
      options={mockLineStyleOptions}
      value={settings.lineStyle}
      onChange={handleLineStyleChange}
      mode={ChipSelectionMode.SINGLE}
      label="Style:"
    />
  );
});

export default LineStyleSelector;
