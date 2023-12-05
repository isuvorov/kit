/* eslint-disable @next/next/no-sync-scripts */
import { Err } from '@lsk4/err';
import { Debug } from '@rckit/debug';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { AuthLayout } from '@/layouts/AuthLayout';
import { AuthOtpForm, AuthOtpFormValues } from '@/rckit/auth/forms/AuthOtpForm';
import { fetchAuthOtpActivate } from '@/rckit/auth/queries/authOtpQuery';
import { HeadMeta } from '@/rckit/meta/HeadMeta';

export default function AuthOtpPage() {
  const pageTitle = 'One time code';
  const router = useRouter();
  const otpId = router.query._id as string;

  async function onSubmit(raw: AuthOtpFormValues) {
    const values = {
      ...raw,
    };
    const { session } = await fetchAuthOtpActivate({
      otpId,
      ...values,
    });
    if (session) {
      router.push(`/cabinet`);
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
            Если не пришел код, попробуйте <a href="/auth/otp">еще раз</a>
          </Debug>
        </AuthLayout.Footer>
      </AuthLayout>
    </>
  );
}
