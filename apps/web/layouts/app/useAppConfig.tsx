/* eslint-disable prefer-destructuring */
import { Session } from '@rckit/auth';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export interface ModalProps {
  title: string;
  body: string;
  footer: string;
}

export interface AppConfigType {
  isDebug: boolean;
  theme: 'light' | 'dark';
  notify: 'all' | 'users' | 'manual' | 'off';

  sessionId?: string;
  session?: Session;
  sessionStatus?: string;
  sessionFetchedAt?: number;
}

export const defaultAppConfig: AppConfigType = {
  isDebug: false,
  theme: 'light',
  notify: 'manual',
};

export type AppConfigContextProps = AppConfigType & {
  // openLightbox?: (props: any) => void;
  openModal: (props: ModalProps) => void;
  updateSession: (session?: Session) => void;
  clearSession: () => void;
  setAppConfig: Dispatch<SetStateAction<AppConfigType>>;
};

// @ts-ignore
export const AppConfigContext = createContext<AppConfigContextProps>(defaultAppConfig);
export const useAppConfig = () => useContext(AppConfigContext);
