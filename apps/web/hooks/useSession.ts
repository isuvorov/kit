import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AppConfigContextProps, useAppConfig } from '@/layouts/app/useAppConfig';

interface SessionData {
  update: AppConfigContextProps['updateSession'];
  clear: AppConfigContextProps['clearSession'];
  session: AppConfigContextProps['session'];
  id: AppConfigContextProps['sessionId'];
  status: AppConfigContextProps['sessionStatus'];
  fetchedAt: AppConfigContextProps['sessionFetchedAt'];
  isLoggedIn: AppConfigContextProps['sessionLoggedIn'];
}

interface UseSessionParams {
  redirectTo?: string;
}

export function useSession(params?: UseSessionParams): SessionData {
  const router = useRouter();
  const app = useAppConfig();
  if (app === undefined) {
    throw new Error('useSession was used outside of the AppConfig provider');
  }

  useEffect(() => {
    if (app.sessionStatus !== 'loading' && !app.sessionLoggedIn && params?.redirectTo) {
      router.replace(params?.redirectTo);
    }
  }, [app.sessionStatus, app.sessionLoggedIn, router, params?.redirectTo]);

  return {
    update: app.updateSession,
    clear: app.clearSession,
    session: app.session,
    id: app.sessionId,
    status: app.sessionStatus,
    fetchedAt: app.sessionFetchedAt,
    isLoggedIn: app.sessionLoggedIn,
  };
}
