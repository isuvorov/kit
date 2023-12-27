import { HeadMeta } from '@rckit/meta';
import { ResetTemplate } from '@shared/emails/templates/ResetTemplate';
import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '@/layouts/AdminLayout';

export default function ResetEmailPage() {
  const pageTitle = 'Reset email';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout title={pageTitle} activeHref="/admin/emails/reset">
        <ResetTemplate link={'https://google.com'} />
      </AdminLayout>
    </>
  );
}
