import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useStores } from '@/shared/hooks';
import { PropsWithClassName } from '@/shared/types';
import { APP_CONFIG } from '@/shared/config/app-config';
import { getPageUrl } from './utils';

const Header: React.FC<PropsWithClassName> = observer(({ className = '' }) => {
  const { pageConfigStore } = useStores();
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentPage = pageConfigStore.getPageConfig(location.pathname);
  const pageTitle = getPageUrl(location.pathname, currentPage?.title);

  const handleLogoClick = () => navigate(`${APP_CONFIG.BASE_PATH}/`);

  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.headerContent}>
        <button className={styles.logoButton} onClick={handleLogoClick}>
          <img src="logo.jpg" alt="Logo" className={styles.logo} />
        </button>
        <div className={styles.pageInfo}>
          <div className={styles.pageTitle}>{pageTitle}</div>
        </div>
        <div className={styles.headerActions}>
          {/* Пока без тоггла темы */}
        </div>
      </div>
    </header>
  );
});

export default Header;
