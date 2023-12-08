/* eslint-disable prefer-destructuring */
import { useCallback, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import useLocalStorageState from 'use-local-storage-state';

import { fetchAuthSession } from '@/rckit/auth/queries/authSessionQuery';
import { Session } from '@/rckit/auth/types';

// import TopupBanner from '@/components/TopupBanner/TopupBanner';
import {
  AppConfigContext,
  AppConfigContextProps,
  defaultAppConfig,
  ModalProps,
} from './useAppConfig';

export const AppConfig = ({ children, showAppbar = true }: any) => {
  // const router = useRouter();

  const [appConfig, setAppConfig] = useLocalStorageState('appConfig', {
    defaultValue: defaultAppConfig,
  });

  const updateSession = useCallback(
    async (data?: Session) => {
      let session = data;
      // console.log('updateSession', { data, session });
      if (!data?._id) {
        setAppConfig((prev) => ({
          ...prev,
          sessionStatus: 'loading',
        }));
        ({ session } = await fetchAuthSession({}));
      }
      setAppConfig((prev) => ({
        ...prev,
        session,
        sessionId: session?._id,
        sessionFetchedAt: Date.now(),
        sessionStatus: 'fetched',
        sessionLoggedIn: Boolean(session),
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appConfig.sessionId, appConfig.session, appConfig.sessionFetchedAt],
  );

  const clearSession = useCallback(() => {
    setAppConfig((prev) => ({
      ...prev,
      session: undefined,
      sessionId: undefined,
      sessionFetchedAt: undefined,
      sessionStatus: undefined,
      sessionLoggedIn: false,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [modalState, setModalState] = useState<ModalProps | null>(null);
  function openModal(props: any) {
    setModalState(props);
  }
  const payload: AppConfigContextProps = {
    ...appConfig,

    // openLightbox,
    setAppConfig,
    openModal,
    updateSession,
    clearSession,
  };

  // if (chatsStatus.error) return `Error: ${chatsStatus.error.message}`;
  return (
    <AppConfigContext.Provider value={payload}>
      {/* <Debug>TopupBanner</Debug> */}
      {children}
      {/* <FsLightbox {...lightboxState} /> */}
      <Modal size="xl" centered show={!!modalState} onHide={() => setModalState(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalState?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalState?.body}</Modal.Body>
        <Modal.Footer>{modalState?.footer}</Modal.Footer>
      </Modal>
      <ToastContainer
        //
        position="bottom-right"
        theme="dark"
        limit={10}
      />
      {/* <TynModals /> */}
    </AppConfigContext.Provider>
  );
};
