import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';

import { useSession } from '@/hooks/useSession';
import { TextLayout } from '@/layouts/TextLayout';

export default function LinksTosPage() {
  const pageTitle = 'Terms of Service';
  useSession({ redirectTo: '/auth' });

  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <TextLayout>
        <h1>{pageTitle}</h1>
        bla bla
      </TextLayout>
    </>
  );
}
