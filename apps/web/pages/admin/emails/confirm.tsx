/* eslint-disable max-len */
import { HeadMeta } from '@rckit/meta';
import { ConfirmTemplate } from '@shared/emails/templates/ConfirmTemplate';
import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '@/layouts/AdminLayout';

export default function ConfirmEmailPage() {
  const pageTitle = 'Confirm email';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout title={pageTitle} activeHref="/admin/emails/confirm">
        <ConfirmTemplate />
      </AdminLayout>
    </>
  );
}
