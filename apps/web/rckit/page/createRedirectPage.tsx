import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAppConfig } from '@/rckit/app/AppConfig/useAppConfig';

export function createRedirectPage({ redirectPath }: { redirectPath: string }) {
  return function RedirectPage() {
    const router = useRouter();
    const { sessionStatus } = useAppConfig();

    useEffect(() => {
      if (sessionStatus === 'loading') return;
      router.push(redirectPath);
    }, [router, sessionStatus]);

    return null; // This can be an empty component or your loading indicator
  };
}
