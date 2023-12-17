/* eslint-disable prefer-destructuring */
import { createContext, useContext } from 'react';

export interface ModalProps {
  wrapper?: React.ComponentType<any>;
  wrapperProps?: Record<string, any>;
  title?: string | React.ReactNode;
  body?: string | React.ReactNode;
  footer?: string | React.ReactNode;
}

export interface AppModalType {}

export const defaultAppModal: AppModalType = {};

export type AppModalContextProps = AppModalType & {
  // openLightbox?: (props: any) => void;
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
};

// @ts-ignore
export const AppModalContext = createContext<AppModalContextProps>(defaultAppModal);
export const useAppModal = () => useContext(AppModalContext);
