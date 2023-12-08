import '@/styles/globals.css';
import '@/styles/variables.css';
import 'blb-table/dist/variables.css';

import { isDev, stage, version } from '@lsk4/env';
import { HeadEnv } from '@rckit/meta';
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';

import { AppConfig } from '@/layouts/app/AppConfig';

type AppProps2 = AppProps<{ dehydratedState: DehydratedState }>;

export default function App({ Component, pageProps }: AppProps2) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <HeadEnv isDev={isDev} stage={stage} version={version} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps?.dehydratedState}>
          <AppConfig>
            <Component {...pageProps} />
          </AppConfig>
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
