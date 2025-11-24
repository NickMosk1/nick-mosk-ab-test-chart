import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useStores } from '@/shared/hooks';
import { PropsWithClassName } from '@/shared/types';

const Header: React.FC<PropsWithClassName> = observer(({ className = '' }) => {
  const { pageConfigStore } = useStores();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = pageConfigStore.getPageConfig(location.pathname);
  
  const pageTitle = location.pathname === "/" ? "Home" : currentPage?.title?.length ? currentPage.title : "Page Not Found";

  const handleLogoClick = () => navigate('/');

  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.headerContent}>
        <button className={styles.logoButton} onClick={handleLogoClick}>
          <img src="/logo.jpg" alt="Logo" className={styles.logo} />
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
