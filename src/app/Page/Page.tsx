import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Page.module.css';
import { useStores } from '@/shared/hooks';
import { PageConfigService } from '@/shared/services';
import PageElement from './PageElement';

const Page: React.FC = observer(() => {
  const { pageConfigStore } = useStores();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentPath = location.pathname;
  const currentPage = pageConfigStore.getPageConfig(currentPath);

  useEffect(() => {
    const loadPageConfig = async () => {
      setIsLoading(true);

      try {
        if (!currentPage) {
          const pageConfigService = PageConfigService.getInstance();
          await pageConfigService.fetchPageConfig(currentPath);
        };
      } catch (error) {
        console.error('Failed to load page config:', error);
      } finally {
        setIsLoading(false);
      };
    };
    loadPageConfig();
  }, [currentPath, currentPage, pageConfigStore]);

  if (currentPath === '/') {
    return (
      <div className={styles.homePage}>
        <div className={styles.homeContent}>
          <h1 className={styles.homeTitle}>A/B Test Analytics</h1>
          <p className={styles.homeDescription}>
            Welcome to the A/B Test Analytics Dashboard. Analyze conversion rates and test variations.
          </p>
          <button
            className={styles.chartsButton}
            onClick={() => navigate('/charts')}
          >
            View Charts Dashboard
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading page...</p>
      </div>
    );
  };

  if (!currentPage) {
    return (
      <div className={styles.errorPage}>
        <h2>Page not found</h2>
        <p>No configuration found for: {currentPath}</p>
        <button
          className={styles.backButton}
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      {currentPage.elements.map((element) => (
        <PageElement
          key={element.id}
          element={element}
        />
      ))}
    </div>
  );
});

export default Page;
