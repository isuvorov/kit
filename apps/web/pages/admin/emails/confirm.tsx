/* eslint-disable max-len */
import { HeadMeta } from '@rckit/meta';
import { ConfirmTemplate } from '@shared/emails/ConfirmTemplate';
import Head from 'next/head';
import React from 'react';

import { emailsConfig } from '@/config/emails';
import { AdminLayout } from '@/layouts/AdminLayout';

export default function ConfirmEmailPage() {
  const pageTitle = 'Confirm email';
  const preview = "It's time to confirm your email address";
  const header = 'Confirm your email address';
  const code = '123-456';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout title={pageTitle} activeHref="/admin/emails/confirm">
        <ConfirmTemplate code={code} preview={preview} header={header} config={emailsConfig} />
      </AdminLayout>
    </>
  );
}
