import { Toaster as ReactHotToaster } from 'react-hot-toast';
import styles from './Toaster.module.css';

const Toaster: React.FC = () => {
  return (
    <ReactHotToaster 
      position="top-right"
      toastOptions={{
        duration: 4000,
        className: styles.toaster,
        style: {
          background: '#363636',
          color: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 500,
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        success: {
          duration: 3000,
          style: {
            background: '#10b981',
            color: '#ffffff',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#10b981',
          },
        },
        error: {
          duration: 5000,
          style: {
            background: '#ef4444',
            color: '#ffffff',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#ef4444',
          },
        },
        loading: {
          style: {
            background: '#363636',
            color: '#ffffff',
          },
        },
      }}
    />
  );
};

export default Toaster;
