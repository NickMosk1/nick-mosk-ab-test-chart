import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from "@/shared/stores/provider";
import { AppLayout, Toaster } from "@/shared/ui";
import Page from './Page';

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppLayout>
          <Page />
        </AppLayout>
        <Toaster />
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
