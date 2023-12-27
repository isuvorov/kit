import { HeadMeta } from '@rckit/meta';
import { InvoiceTemplate } from '@shared/emails/templates/InvoiceTemplate';
import Head from 'next/head';

import { AdminLayout } from '@/layouts/AdminLayout';

export default function InvoiceEmailPage() {
  const pageTitle = 'Invoice email';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout title={pageTitle} activeHref="/admin/emails/invoice">
        <InvoiceTemplate />
      </AdminLayout>
    </>
  );
}
