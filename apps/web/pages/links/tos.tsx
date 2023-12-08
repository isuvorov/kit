import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';

import { TextLayout } from '@/layouts/TextLayout';

export default function LinksTosPage() {
  const pageTitle = 'Terms of Service';

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
