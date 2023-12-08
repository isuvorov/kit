import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import Link from 'next/link';

import { CabinetLayout } from '@/layouts/CabinetLayout';

export default function CabinetIndexPage() {
  const pageTitle = 'Cabinet Index';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <CabinetLayout activeHref="/cabinet">
        <Link href="/cabinet/products">Products</Link>
      </CabinetLayout>
    </>
  );
}
