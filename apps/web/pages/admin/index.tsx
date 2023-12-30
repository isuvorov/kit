import { useAuthGuard } from '@rckit/auth';
import { useAppMenuConfig } from '@rckit/breadcrumbs';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import { useRouter } from 'next/router';

// import { adminMenuItems } from '@/config/menus';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Toc } from '@/rckit/helpers/Toc';

export default function AdminIndexPage() {
  useAuthGuard(useRouter(), { role: 'admin' });
  const pageTitle = 'Admin Index';
  const { adminItems } = useAppMenuConfig();
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AdminLayout activeHref="/admin">
        <Toc items={adminItems} />
      </AdminLayout>
    </>
  );
}
