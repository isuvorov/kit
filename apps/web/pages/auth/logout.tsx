import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAppConfig } from '@/layouts/app/useAppConfig';

export default function AuthLogoutPage() {
  const { clearSession } = useAppConfig();

  const router = useRouter();

  useEffect(() => {
    clearSession();
    router.push('/');
  }, [router, clearSession]);

  // LogoutPage
  return null; // This can be an empty component or your loading indicator
}
