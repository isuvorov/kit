import '@/styles/globals.css';

import { isDev, stage, version } from '@lsk4/env';
import { AppConfig, AppSession } from '@rckit/auth';
import { ComponentProvider } from '@rckit/link';
import { HeadEnv } from '@rckit/meta';
import { AppModal } from '@rckit/modal';
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';

import { AppQuery } from '@/layouts/components/AppQuery';
import { NoSsr } from '@/rckit/helpers/NoSsr';

type AppProps2 = AppProps<{ dehydratedState: DehydratedState }>;

export default function App({ Component, pageProps }: AppProps2) {
  return (
    <>
      <Head>
        <HeadEnv isDev={isDev} stage={stage} version={version} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NoSsr>
        <ComponentProvider Link={Link} Image={Image} Router={Router}>
          <AppQuery>
            <HydrationBoundary state={pageProps?.dehydratedState}>
              <AppConfig>
                <AppModal>
                  <AppSession>
                    <Component {...pageProps} />
                  </AppSession>
                </AppModal>
              </AppConfig>
            </HydrationBoundary>
          </AppQuery>
        </ComponentProvider>
      </NoSsr>
    </>
  );
}
