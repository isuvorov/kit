/* eslint-disable prefer-destructuring */
import { createContext, useContext } from 'react';

export interface ModalProps {
  title: string;
  body: string;
  footer: string;
}

export interface AppModalType {}

export const defaultAppModal: AppModalType = {};

export type AppModalContextProps = AppModalType & {
  // openLightbox?: (props: any) => void;
  openModal: (props: ModalProps) => void;
};

// @ts-ignore
export const AppModalContext = createContext<AppModalContextProps>(defaultAppModal);
export const useAppModal = () => useContext(AppModalContext);
