/* eslint-disable @next/next/no-sync-scripts */
import { Err } from '@lsk4/err';
import {
  AuthOtpForm,
  AuthOtpFormValues,
  fetchAuthOtpActivate,
  useAppSession,
  useAuthGuard,
} from '@rckit/auth';
import { Debug } from '@rckit/debug';
import { HeadMeta } from '@rckit/meta';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { AuthLayout } from '@/layouts/AuthLayout';

export default function AuthOtpPage() {
  useAuthGuard(useRouter(), { role: 'guestOnly' });
  const pageTitle = 'One time code';
  const { updateSessionWithRedirect } = useAppSession();
  const router = useRouter();
  const otpId = router.query._id as string;

  async function onSubmit(values: AuthOtpFormValues) {
    const { session } = await fetchAuthOtpActivate({
      otpId,
      ...values,
    });
    if (session) {
      await updateSessionWithRedirect(session, router, '/cabinet');
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
          <AuthOtpForm onSubmit={onSubmit} />
        </AuthLayout.Body>
        <AuthLayout.Footer>
          <Debug>
            Если не пришел код, попробуйте{' '}
            <a data-testid="otpLink" href="/auth/otp">
              еще раз
            </a>
          </Debug>
        </AuthLayout.Footer>
      </AuthLayout>
    </>
  );
}
