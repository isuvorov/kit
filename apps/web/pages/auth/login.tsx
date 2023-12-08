import { Err } from '@lsk4/err';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useSession } from '@/hooks/useSession';
import { useAppConfig } from '@/layouts/app/useAppConfig';
import { AuthLayout } from '@/layouts/AuthLayout';
import { AuthLoginForm, AuthLoginFormValues } from '@/rckit/auth/forms/AuthLoginForm';
import { fetchAuthLogin } from '@/rckit/auth/queries/authLoginQuery';
import { trimAndLower } from '@/rckit/auth/utils';

export default function AuthLoginPage() {
  const pageTitle = 'Login';
  const { update } = useSession();
  const router = useRouter();

  async function onSubmit(raw: AuthLoginFormValues) {
    const values = {
      ...raw,
      email: trimAndLower(raw?.email),
    };
    const { session, otp } = await fetchAuthLogin(values);
    if (session) {
      await update(session);
      router.push(`/cabinet`);
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
          <AuthLoginForm onSubmit={onSubmit} />
        </AuthLayout.Body>
        <AuthLayout.Footer>
          Don&apos;t have an account? <Link href="/auth/signup">Sign Up</Link>
        </AuthLayout.Footer>
      </AuthLayout>
    </>
  );
}
