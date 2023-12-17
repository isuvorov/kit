import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { queryClientConfig } from '@/config/queryClientConfig';

type AppQueryProps = {
  children: React.ReactNode;
};

export function AppQuery({ children }: AppQueryProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
