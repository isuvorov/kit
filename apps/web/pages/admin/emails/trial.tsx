import { HeadMeta } from '@rckit/meta';
import { TrialTemplate } from '@shared/emails/TrialTemplate';
import Head from 'next/head';
import React from 'react';

import { emailsConfig } from '@/config/emails';
import { AdminLayout } from '@/layouts/AdminLayout';

export default function TrialEmailPage() {
  const pageTitle = 'Trial email';
  const preview = 'Trial Period Has Ended – Unlock Premium Features Now!';
  const header = 'Your trial is over';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout title={pageTitle} activeHref="/admin/emails/trial">
        <TrialTemplate
          preview={preview}
          header={header}
          config={emailsConfig}
          link="https://google.com"
          username="Alex"
          expirationDate="01/01/2021"
        />
      </AdminLayout>
    </>
  );
}
