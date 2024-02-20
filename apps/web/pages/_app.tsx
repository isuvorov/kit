import '@/styles/globals.css';

import { isDev, stage, version } from '@lsk4/env';
import { AppSession } from '@rckit/auth';
import { AppMenuConfig } from '@rckit/breadcrumbs';
import { AppConfig } from '@rckit/config';
// import { App } from '@rckit/breadcrumbs';
import { ComponentProvider } from '@rckit/link';
import { HeadEnv } from '@rckit/meta';
import { AppModal } from '@rckit/modal';
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';

import { menus } from '@/config/menus';
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
                    <AppMenuConfig items={menus}>
                      <Component {...pageProps} />
                    </AppMenuConfig>
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
