import { useAppSession } from '@rckit/auth';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AuthLayout } from '@/layouts/AuthLayout';
// import { TynLoading } from '@/Tyn/views/TynLoading';

export default function AuthLogoutPage() {
  const pageTitle = 'Logout';

  const { clearSession } = useAppSession();

  const router = useRouter();

  useEffect(() => {
    clearSession();
    const r = router.query.r as string;
    router.push(r || '/');
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
