/* eslint-disable prefer-destructuring */
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import { AppModalContext, AppModalContextProps, ModalProps } from './useAppModal';

export const AppModal = ({ children }: any) => {
  const [modalState, setModalState] = useState<ModalProps | null>(null);
  function openModal(props: any) {
    setModalState(props);
  }
  const payload: AppModalContextProps = {
    ...AppModal,
    openModal,
  };

  return (
    <AppModalContext.Provider value={payload}>
      {children}
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
    </AppModalContext.Provider>
  );
};
