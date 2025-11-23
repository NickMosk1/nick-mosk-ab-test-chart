import { observer } from 'mobx-react-lite';
import { Chart } from '@/modules/Chart';
import { Element, isChartElement } from '@/shared/types';
import styles from './PageElement.module.css';

interface PageElementProps {
  element: Element;
};

const PageElement: React.FC<PageElementProps> = observer(({ element }) => {
  const renderElement = () => {
    if (isChartElement(element)) return <Chart element={element} />;

    return (
      <div className={styles.unknownElement}>
        <h3>Unknown Element Type</h3>
        <p>Type: {element.type}</p>
        <p>ID: {element.id}</p>
      </div>
    );
  };

  return (
    <div className={styles.pageElement}>
      {renderElement()}
    </div>
  );
});

export default PageElement;
