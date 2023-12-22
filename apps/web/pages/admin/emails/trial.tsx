import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import React from 'react';
import { TrialTemplate } from '@shared/emails/templates/TrialTemplate';

import { AdminLayout } from '@/layouts/AdminLayout';

export default function TrialEmailPage() {
  const [isClient, setIsClient] = React.useState(false);
  const pageTitle = 'Trial email';
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout activeHref="/admin/emails/trial">
        <TrialTemplate />
      </AdminLayout>
    </>
  );
}

TrialEmailPage.authenticate = true;
