import { HeadMeta } from '@rckit/meta';
import { InviteTemplate } from '@shared/emails/templates/InviteTemplate';
import Head from 'next/head';

import { AdminLayout } from '@/layouts/AdminLayout';

export default function InviteEmailPage() {
  const pageTitle = 'Invite email';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout title={pageTitle} activeHref="/admin/emails/invite">
        <InviteTemplate />
      </AdminLayout>
    </>
  );
}
