import { observer } from 'mobx-react-lite';
import styles from './ExportButton.module.css';
import { useStores } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { Nullable } from '@/shared/types';
import { handleExport } from '@/shared/utils';

interface ExportButtonProps {
  chartId: string;
  chartElement?: Nullable<HTMLElement>;
};

const ExportButton: React.FC<ExportButtonProps> = observer(({ 
  chartId, 
  chartElement,
}) => {
  const { chartStore } = useStores();
  const settings = chartStore.getChartSettings(chartId);

  if (!settings?.exportEnabled) return null;

  return (
    <Button
      variant="secondary"
      size="medium"
      onClick={() => handleExport(chartElement)}
      className={styles.exportBtn}
    >
      Export PNG
    </Button>
  );
});

export default ExportButton;
