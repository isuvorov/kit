import { Err } from '@lsk4/err';
import {
  AuthResetPasswordForm,
  AuthResetPasswordFormValues,
  fetchAuthResetPassword,
  useAuthGuard,
} from '@rckit/auth';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { AuthLayout } from '@/layouts/AuthLayout';

export default function AuthResetPasswordPage() {
  const router = useRouter();
  useAuthGuard(router, { role: 'guestOnly' });
  const pageTitle = 'Enter new password';

  const searchParams = useMemo(() => new window.URLSearchParams(window.location.search), []);
  useEffect(() => {
    if (!searchParams.has('_id') && !searchParams.has('code')) {
      router.push('/auth/login');
    }
  }, [searchParams, router]);

  async function onSubmit(values: AuthResetPasswordFormValues) {
    const isSuccess = await fetchAuthResetPassword(values);
    if (isSuccess) {
      router.push('/auth/login');
    } else {
      throw new Err('Something went wrong');
    }
  }

  return (
    <>
      <Head>
        <HeadMeta title={pageTitle} />
      </Head>
      <AuthLayout>
        <AuthLayout.Body title={pageTitle}>
          <AuthResetPasswordForm
            defaultValues={{
              otpId: searchParams.get('_id')!,
              code: searchParams.get('code')!,
            }}
            onSubmit={onSubmit}
          />
        </AuthLayout.Body>
      </AuthLayout>
    </>
  );
}
