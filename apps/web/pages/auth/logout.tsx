import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAppConfig } from '@/layouts/app/useAppConfig';
import { AuthLayout } from '@/layouts/AuthLayout';
// import { TynLoading } from '@/Tyn/views/TynLoading';

export default function AuthLogoutPage() {
  const pageTitle = 'Logout';

  const { clearSession } = useAppConfig();

  const router = useRouter();

  useEffect(() => {
    clearSession();
    router.push('/');
  }, [router, clearSession]);

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
