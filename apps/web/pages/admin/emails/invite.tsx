import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import React from 'react';

import { InviteTemplate } from '@/emails/templates/InviteTemplate';
import { AdminLayout } from '@/layouts/AdminLayout';

export default function InviteEmailPage() {
  const [isClient, setIsClient] = React.useState(false);
  const pageTitle = 'Invite email';
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout activeHref="/admin/emails/invite">
        <InviteTemplate />
      </AdminLayout>
    </>
  );
}

InviteEmailPage.authenticate = true;
