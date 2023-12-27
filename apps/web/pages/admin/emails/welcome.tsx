import { HeadMeta } from '@rckit/meta';
import { WelcomeTemplate } from '@shared/emails/WelcomeTemplate';
import Head from 'next/head';

import { emailsConfig } from '@/config/emails';
import { AdminLayout } from '@/layouts/AdminLayout';

export default function WelcomeEmailPage() {
  const pageTitle = 'Welcome email';
  const preview = 'Welcome to Kit Company!';
  const header = 'Welcome to Kit Company!';
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout title={pageTitle} activeHref="/admin/emails/welcome">
        <WelcomeTemplate
          preview={preview}
          header={header}
          config={emailsConfig}
          link="https://google.com"
          username="Alex"
        />
      </AdminLayout>
    </>
  );
}
