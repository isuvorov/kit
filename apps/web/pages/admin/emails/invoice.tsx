import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import React from 'react';
import { InvoiceTemplate } from 'shared/emails/templates/InvoiceTemplate';

import { AdminLayout } from '@/layouts/AdminLayout';

export default function InvoiceEmailPage() {
  const [isClient, setIsClient] = React.useState(false);
  const pageTitle = 'Invoice email';
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout activeHref="/admin/emails/invoice">
        <InvoiceTemplate />
      </AdminLayout>
    </>
  );
}

InvoiceEmailPage.authenticate = true;
