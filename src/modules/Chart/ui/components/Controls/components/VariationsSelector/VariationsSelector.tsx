import { observer } from 'mobx-react-lite';
import styles from './VariationsSelector.module.css';
import { useStores } from '@/shared/hooks';

interface VariationsSelectorProps {
  chartId: string;
};

const VariationsSelector: React.FC<VariationsSelectorProps> = observer(({ chartId }) => {
  const { chartStore } = useStores();
  const settings = chartStore.getChartSettings(chartId);

  if (!settings) return null;

  const enabledVariations = settings.variations.filter(v => v.enabled);

  const handleVariationToggle = (variationId: string) => {
    if (enabledVariations.length > 1 || !settings.variations.find(v => v.id === variationId)?.enabled) {
      chartStore.toggleVariation(chartId, variationId);
    };
  };

  return (
    <div className={styles.variationsSelector}>
      <label className={styles.label}>Variations:</label>
      <div className={styles.variationsList}>
        {settings.variations.map(variation => (
          <label key={variation.id} className={styles.variationItem}>
            <input
              type="checkbox"
              checked={variation.enabled}
              onChange={() => handleVariationToggle(variation.id)}
              className={styles.checkbox}
            />
            <span
              className={styles.colorDot}
              style={{ backgroundColor: variation.color }}
            />
            <span className={styles.variationName}>{variation.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
});

export default VariationsSelector;
