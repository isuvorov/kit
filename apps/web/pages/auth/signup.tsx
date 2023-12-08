import { Err } from '@lsk4/err';
import { AuthSignupForm, AuthSignupFormValues, fetchAuthSignup } from '@rckit/auth';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppConfig } from '@/layouts/app/useAppConfig';
import { AuthLayout } from '@/layouts/AuthLayout';

export default AuthSignup;
function AuthSignup() {
  const pageTitle = 'Sing Up';
  const router = useRouter();
  const { updateSession } = useAppConfig();

  async function onSubmit(values: AuthSignupFormValues) {
    const { otp, session } = await fetchAuthSignup(values);
    if (session) {
      await updateSession(session);
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
          <AuthSignupForm onSubmit={onSubmit} />
        </AuthLayout.Body>
        <AuthLayout.Footer>
          Already have an account? <Link href="/auth/login">Login</Link>
        </AuthLayout.Footer>
      </AuthLayout>
    </>
  );
}
