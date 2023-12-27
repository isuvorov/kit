import { HeadMeta } from '@rckit/meta';
import { InviteTemplate } from '@shared/emails/InviteTemplate';
import Head from 'next/head';

import { emailsConfig } from '@/config/emails';
import { AdminLayout } from '@/layouts/AdminLayout';

export default function InviteEmailPage() {
  const pageTitle = 'Invite email';
  const preview = 'Someone invited you to join their team';
  const header = 'You have been invited to join a team!';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout title={pageTitle} activeHref="/admin/emails/invite">
        <InviteTemplate
          preview={preview}
          header={header}
          config={emailsConfig}
          username="Alex"
          inviter={{
            username: 'John',
            teamName: 'Kit Team',
            email: 'somemail@mail.com',
          }}
          link="https://google.com"
        />
      </AdminLayout>
    </>
  );
}
