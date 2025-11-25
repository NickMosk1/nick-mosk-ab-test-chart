import { observer } from 'mobx-react-lite';
import { useStores } from '@/shared/hooks';
import { ChipOption, ChipSelectionMode } from '@/shared/types';
import { ChipGroup } from '@/shared/ui';

interface VariationsSelectorProps {
  chartId: string;
};

const VariationsSelector: React.FC<VariationsSelectorProps> = observer(({ chartId }) => {
  const { chartStore } = useStores();
  const settings = chartStore.getChartSettings(chartId);

  if (!settings) return null;

  const handleVariationsChange = (selectedValues: string | string[]) => {
    const selectedArray = Array.isArray(selectedValues) ? selectedValues : [selectedValues];
    settings.variations.forEach(variation => {
      const shouldBeEnabled = selectedArray.includes(variation.id);
      if (variation.enabled !== shouldBeEnabled) chartStore.toggleVariation(chartId, variation.id);
    });
  };

  const variationOptions: ChipOption[] = settings.variations.map(variation => ({
    value: variation.id,
    label: variation.name,
    color: variation.color,
  }));

  const selectedVariations = settings.variations.filter(v => v.enabled).map(v => v.id);

  return (
    <ChipGroup
      options={variationOptions}
      value={selectedVariations}
      onChange={handleVariationsChange}
      mode={ChipSelectionMode.MULTIPLE}
      requireAtLeastOne
      label="Variations:"
    />
  );
});

export default VariationsSelector;
