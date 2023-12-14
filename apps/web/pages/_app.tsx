import '@/styles/globals.css';

// import '@rckit/table/lib/index.css';
import { isDev, stage, version } from '@lsk4/env';
import { AppSession } from '@rckit/auth';
import { ComponentProvider } from '@rckit/link';
import { HeadEnv } from '@rckit/meta';
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';

import { queryClientConfig } from '@/config/queryClientConfig';
import { AppConfig } from '@/layouts/app/AppConfig';

type AppProps2 = AppProps<{ dehydratedState: DehydratedState }>;

const NoSsr2 = ({ children }: React.PropsWithChildren<any>) => (
  <React.Fragment>{children}</React.Fragment>
);

export const NoSsr = dynamic(() => Promise.resolve(NoSsr2), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps2) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));
  return (
    <>
      <Head>
        <HeadEnv isDev={isDev} stage={stage} version={version} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ComponentProvider Link={Link} Image={Image} Router={Router}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps?.dehydratedState}>
            <NoSsr>
              <AppConfig>
                <AppSession>
                  <Component {...pageProps} />
                </AppSession>
              </AppConfig>
            </NoSsr>
          </HydrationBoundary>
        </QueryClientProvider>
      </ComponentProvider>
    </>
  );
}
