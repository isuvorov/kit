import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import React from 'react';
import { ResetTemplate } from '@shared/emails/templates/ResetTemplate';

import { AdminLayout } from '@/layouts/AdminLayout';

export default function ResetEmailPage() {
  const [isClient, setIsClient] = React.useState(false);
  const pageTitle = 'Reset email';
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout activeHref="/admin/emails/reset">
        <ResetTemplate link={'https://google.com'} />
      </AdminLayout>
    </>
  );
}

ResetEmailPage.authenticate = true;
