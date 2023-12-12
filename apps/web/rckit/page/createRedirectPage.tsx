import { useAppSession } from '@rckit/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function createRedirectPage({ redirectPath }: { redirectPath: string }) {
  return function RedirectPage() {
    const router = useRouter();
    const { sessionStatus } = useAppSession();

    useEffect(() => {
      if (sessionStatus === 'loading') return;
      router.push(redirectPath);
    }, [router, sessionStatus]);

    return null; // This can be an empty component or your loading indicator
  };
}
