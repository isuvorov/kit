import { Err } from '@lsk4/err';
import {
  AuthRestoreForm,
  AuthRestoreFormValues,
  fetchAuthRestore,
  useAppSession,
  useAuthGuard,
} from '@rckit/auth';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AuthLayout } from '@/layouts/AuthLayout';

export default function AuthLoginPage() {
  useAuthGuard(useRouter(), { role: 'guestOnly' });
  const pageTitle = 'Restore password';
  const { updateSessionWithRedirect } = useAppSession();
  const router = useRouter();

  async function onSubmit(values: AuthRestoreFormValues) {
    // @ts-ignore
    const { session, otp } = await fetchAuthRestore(values);
    if (session) {
      await updateSessionWithRedirect(session, router, '/cabinet');
    } else if (otp) {
      router.push(`/auth/otp?_id=${otp._id}`);
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
          <AuthRestoreForm onSubmit={onSubmit} />
        </AuthLayout.Body>
        <AuthLayout.Footer>
          Don&apos;t have an account? <Link href="/auth/signup">Sign Up</Link>
        </AuthLayout.Footer>
      </AuthLayout>
    </>
  );
}
