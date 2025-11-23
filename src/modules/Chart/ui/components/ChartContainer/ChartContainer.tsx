import { PropsWithChildren } from 'react';
import styles from './ChartContainer.module.css';
import { Nullable } from '@/shared/types';

interface ChartContainerProps {
  isLoading?: boolean;
  error?: Nullable<string>;
  onRetry?: () => void;
  className?: string;
};

const ChartContainer: React.FC<PropsWithChildren<ChartContainerProps>> = ({
  isLoading = false,
  error = null,
  onRetry,
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

  if (error) {
    return (
      <div className={`${styles.container} ${styles.error} ${className}`}>
        <div className={styles.errorContent}>
          <div className={styles.errorText}>
            <h3 className={styles.errorTitle}>Failed to load chart</h3>
            <p className={styles.errorDescription}>{error}</p>
          </div>
          {onRetry && (
            <button
              className={styles.retryButton}
              onClick={onRetry}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  };

  return <div className={`${styles.container} ${className}`}> {children} </div>;
};

export default ChartContainer;
