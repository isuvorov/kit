import { useAppSession } from '@rckit/auth';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { AuthLayout } from '@/layouts/AuthLayout';
// import { TynLoading } from '@/Tyn/views/TynLoading';

export default function AuthLogoutPage() {
  const pageTitle = 'Logout';
  const { updateSessionWithRedirect } = useAppSession();
  const router = useRouter();
  updateSessionWithRedirect(null, router, '/');
  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AuthLayout showNavbar>
        <AuthLayout.Body title={pageTitle}>{'<TynLoading />'}</AuthLayout.Body>
      </AuthLayout>
    </>
  );
}
