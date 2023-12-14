import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import Link from 'next/link';

import { AdminLayout } from '@/layouts/AdminLayout';

export default function AdminEmailsPage() {
  const pageTitle = 'Emails';
  const items = [
    {
      title: 'Welcome email',
      href: '/admin/emails/welcome',
    },
    {
      title: 'Reset password email',
      href: '/admin/emails/reset',
    },
    {
      title: 'Invite email',
      href: '/admin/emails/invite',
    },
    {
      title: 'Confirm email',
      href: '/admin/emails/confirm',
    },
    {
      title: 'Invoice email',
      href: '/admin/emails/invoice',
    },
    {
      title: 'Trial ending email',
      href: '/admin/emails/trial',
    },
  ];
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout activeHref="/admin/emails">
        {items.map((item) => (
          <p key={item.href}>
            <Link href={item.href}>{item.title}</Link>
          </p>
        ))}
      </AdminLayout>
    </>
  );
}

AdminEmailsPage.authenticate = true;
