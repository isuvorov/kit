/* eslint-disable max-len */
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import React from 'react';
import { ConfirmTemplate } from '@shared/emails/templates/ConfirmTemplate';

import { AdminLayout } from '@/layouts/AdminLayout';

export default function ConfirmEmailPage() {
  const [isClient, setIsClient] = React.useState(false);
  const pageTitle = 'Confirm email';
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout activeHref="/admin/emails/confirm">
        <ConfirmTemplate />
      </AdminLayout>
    </>
  );
}

ConfirmEmailPage.authenticate = true;
