import { isDev, stage } from '@lsk4/env';

import { config } from './config';

const isProd = stage === 'prod' && !isDev;
// const isProd = true

export const brandLogo = '/assets/logo.svg';
export const brandCompany = config?.site?.company || 'Lsk.js';
export const brandTitle = config?.site?.title || 'KIT4';
export const brandDescription =
  config?.site?.desription ||
  'Starter kit of landing and support pages aimed at helping companies promote new products and business launches.';
export const brandVersion = isProd ? '' : config?.site?.version || '';
