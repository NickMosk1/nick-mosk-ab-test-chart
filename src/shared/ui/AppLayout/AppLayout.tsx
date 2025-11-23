import { PropsWithChildren } from 'react';
import styles from './AppLayout.module.css';
import { Header } from './components';

interface AppLayoutProps {
  className?: string;
};

const AppLayout: React.FC<PropsWithChildren<AppLayoutProps>> = ({ children, className = '' }) => {
  return (
    <div className={`${styles.appLayout} ${className}`}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.pageContainer}> {children} </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2025 A/B Test Analytics Dashboard</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
