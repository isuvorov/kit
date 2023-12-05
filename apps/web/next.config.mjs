import { isDev, stage, version } from '@lsk4/env';
import { log } from '@lsk4/log/log';
import { loadEnvConfig } from './loadEnvConfig.mjs';

const config = await loadEnvConfig(
  ['process.env.ENV_JSON', '.env.cjs', '../.env.cjs', '../../.env.cjs'],
  { cwd: process.cwd(), throwError: false },
);
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin',
  },
];
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  // distDir: 'build',
  // output: 'standalone',
  poweredByHeader: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['kit-caps.s3.eu-central-2.wasabisys.com', isDev ? 'picsum.photos' : null].filter(
      Boolean,
    ),
  },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
  async rewrites() {
    if (!isDev) return [];
    const prefix = config?.next?.server?.baseURL || 'UNKNOWN';
    log.debug(`Proxy: /api/:path* => ${prefix}/api/:path*`);
    return [
      {
        source: '/api/:path*',
        destination: `${prefix}/api/:path*`,
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: securityHeaders,
  //     },
  //   ];
  // },
  publicRuntimeConfig: {
    stage,
    version,
    ...(config?.next?.client || {}),
    ...(config?.next?.public || {}),
  },
  serverRuntimeConfig: {
    ...(config?.next?.server || {}),
  },
};

export default nextConfig;
