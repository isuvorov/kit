import { useAuthGuard } from '@rckit/auth';
import { useAppMenuConfig } from '@rckit/breadcrumbs';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { CabinetLayout } from '@/layouts/CabinetLayout';
import { Toc } from '@/rckit/helpers/Toc';

export default function CabinetIndexPage() {
  useAuthGuard(useRouter());
  const pageTitle = 'Cabinet Index';
  const { cabinetItems } = useAppMenuConfig();
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <CabinetLayout activeHref="/cabinet">
        <Toc items={cabinetItems} />
      </CabinetLayout>
    </>
  );
}
