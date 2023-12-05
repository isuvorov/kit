import { isDev } from '@lsk4/env';
import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const clientBaseURL = publicRuntimeConfig.baseURL || 'http://localhost:3000';
export const serverBaseURL = serverRuntimeConfig.baseURL || 'http://localhost:8888';
export const socketBaseURL = isDev ? 'http://localhost:8888' : '/';
export const authCookieName = publicRuntimeConfig.authCookieName || 'sid';
export const redirectPrefix = publicRuntimeConfig.redirectPrefix || '?r=';
export const defaultAuthRedirect = publicRuntimeConfig.defaultAuthRedirect || false;
export const imageLoaderURL = publicRuntimeConfig.imageLoaderUrl || null;
// export const fallbackImage = '/images/avatar/1.jpg';
export const fallbackImage = '/images/avatar2/1.png';
