import { Err } from '@lsk4/err';
import {
  AuthRestoreForm,
  AuthRestoreFormValues,
  fetchAuthRestore,
  useAuthGuard,
} from '@rckit/auth';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { AuthLayout } from '@/layouts/AuthLayout';

export default function AuthRestorePage() {
  useAuthGuard(useRouter(), { role: 'guestOnly' });
  const [sent, setSent] = useState(false);
  const pageTitle = 'Restore password';

  async function onSubmit(values: AuthRestoreFormValues) {
    const isSuccess = await fetchAuthRestore(values);
    if (isSuccess) {
      setSent(true);
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
          {sent ? (
            <p data-test-id="restore-sent">
              We&apos;ve sent you an email with a link to reset your password. Please check your
              inbox.
            </p>
          ) : (
            <AuthRestoreForm onSubmit={onSubmit} />
          )}
        </AuthLayout.Body>
        <AuthLayout.Footer>
          Don&apos;t have an account? <Link href="/auth/signup">Sign Up</Link>
        </AuthLayout.Footer>
      </AuthLayout>
    </>
  );
}
