import { HeadMeta } from '@rckit/meta';
import { TrialTemplate } from '@shared/emails/templates/TrialTemplate';
import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '@/layouts/AdminLayout';

export default function TrialEmailPage() {
  const pageTitle = 'Trial email';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout title={pageTitle} activeHref="/admin/emails/trial">
        <TrialTemplate />
      </AdminLayout>
    </>
  );
}
