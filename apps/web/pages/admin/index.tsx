import { useAuthGuard } from '@rckit/auth';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AdminLayout } from '@/layouts/AdminLayout';

export default function AdminIndexPage() {
  useAuthGuard(useRouter(), { role: 'admin' });
  const pageTitle = 'Admin Index';
  const items = [
    {
      title: 'Users',
      href: '/admin/users',
    },
  ];
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout activeHref="/admin">
        {items.map((item) => (
          <p key={item.href}>
            <Link href={item.href}>{item.title}</Link>
          </p>
        ))}
      </AdminLayout>
    </>
  );
}

AdminIndexPage.authenticate = true;
