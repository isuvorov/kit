import { useAuthGuard } from '@rckit/auth';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { CabinetLayout } from '@/layouts/CabinetLayout';

export default function CabinetIndexPage() {
  useAuthGuard(useRouter());
  const pageTitle = 'Cabinet Forbidden';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <CabinetLayout activeHref="/cabinet/forbidden">Forbidden</CabinetLayout>
    </>
  );
}
