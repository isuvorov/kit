import { HeadMeta } from '@rckit/meta';
import { WelcomeTemplate } from '@shared/emails/templates/WelcomeTemplate';
import Head from 'next/head';

import { AdminLayout } from '@/layouts/AdminLayout';

export default function WelcomeEmailPage() {
  const pageTitle = 'Welcome email';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout title={pageTitle} activeHref="/admin/emails/welcome">
        <WelcomeTemplate />
      </AdminLayout>
    </>
  );
}
