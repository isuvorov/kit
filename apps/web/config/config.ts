import { deepMerge } from '@lsk4/algos';
import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const defaultConfig = {
  site: {
    title: 'Unknown',
    version: 'u',
  },
};

export type Config = typeof defaultConfig;

// TODO: сделать валидацию значений конфигов по типу
export const config = deepMerge<Config>(defaultConfig, publicRuntimeConfig, serverRuntimeConfig);
