import { useAuthGuard } from '@rckit/auth';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CabinetLayout } from '@/layouts/CabinetLayout';

export default function CabinetIndexPage() {
  useAuthGuard(useRouter());
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
