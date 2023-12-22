import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import React from 'react';
import { WelcomeTemplate } from '@shared/emails/templates/WelcomeTemplate';

import { AdminLayout } from '@/layouts/AdminLayout';

export default function WelcomeEmailPage() {
  const [isClient, setIsClient] = React.useState(false);
  const pageTitle = 'Welcome email';
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout activeHref="/admin/emails/welcome">
        <WelcomeTemplate />
      </AdminLayout>
    </>
  );
}

WelcomeEmailPage.authenticate = true;
