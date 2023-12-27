import { HeadMeta } from '@rckit/meta';
import { ResetTemplate } from '@shared/emails/ResetTemplate';
import Head from 'next/head';
import React from 'react';

import { emailsConfig } from '@/config/emails';
import { AdminLayout } from '@/layouts/AdminLayout';

export default function ResetEmailPage() {
  const pageTitle = 'Reset email';
  const preview = 'Did you forget your password?';
  const header = 'Reset your password';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout title={pageTitle} activeHref="/admin/emails/reset">
        <ResetTemplate
          preview={preview}
          header={header}
          config={emailsConfig}
          username="Alex"
          link="https://google.com"
        />
      </AdminLayout>
    </>
  );
}
