import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { useStores } from '@/shared/hooks';

interface HeaderProps {
  className?: string;
};

const Header: React.FC<HeaderProps> = observer(({ className = '' }) => {
  const { pageConfigStore } = useStores();
  const location = useLocation();
  const pathname = location.pathname;

  const currentPage = pageConfigStore.getPageConfig(pathname);

  if (!currentPage) {
    return (
      <header className={`${styles.header} ${className}`}>
        <div className={styles.headerContent}>
          <div className={styles.pageInfo}>
            <h1 className={styles.pageTitle}>Page Not Found</h1>
          </div>
          <div className={styles.headerActions}>
            {/* Пока без тоггла темы */}
          </div>
        </div>
      </header>
    );
  };

  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.headerContent}>
        <div className={styles.pageInfo}>
          <h1 className={styles.pageTitle}>{currentPage.title}</h1>
        </div>
        <div className={styles.headerActions}>
          {/* Пока без тоггла темы */}
        </div>
      </div>
    </header>
  );
});

export default Header;
