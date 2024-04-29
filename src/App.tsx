import React from 'react';
import { GlobalStyles } from './styles/global'
import { AppRoutes } from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css'
import { SideBarProvider } from './hooks/useSidebarProvider';

const App: React.FC = () => {

  const queryClient = new QueryClient()
  return (
    <SideBarProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles/>
        <AppRoutes/>
      </QueryClientProvider>
    </SideBarProvider>

  );
}

export default App;
