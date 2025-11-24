import { PropsWithChildren } from 'react';
import styles from './ChartContainer.module.css';
import { PropsWithClassName } from '@/shared/types';

interface ChartContainerProps {
  isLoading?: boolean;
};

const ChartContainer: React.FC<PropsWithChildren<PropsWithClassName<ChartContainerProps>>> = ({
  isLoading = false,
  children,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={`${styles.container} ${styles.loading} ${className}`}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>Loading chart data...</p>
        </div>
      </div>
    );
  };

  return <div className={`${styles.container} ${className}`}> {children} </div>;
};

export default ChartContainer;
