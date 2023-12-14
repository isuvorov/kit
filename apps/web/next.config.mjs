import { isDev, stage, version } from '@lsk4/env';
import { log } from '@lsk4/log/log';
import { loadConfig } from '@lsk4/config';
const { config } = await loadConfig('.env', {
  cwd: process.cwd(),
  processEnvKey: 'ENV_JSON',
  throwError: isDev,
});
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
    remotePatterns: [
      'kit-caps.s3.eu-central-2.wasabisys.com',
      'gravatar.com',
      'avatars.githubusercontent.com',
      isDev ? 'picsum.photos' : null,
    ]
      .filter(Boolean)
      .map((hostname) => ({
        protocol: 'https',
        hostname,
      })),
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
    const localPaths = [
      {
        source: '/api/:path*',
        destination: `${prefix}/api/:path*`,
      },
    ];
    localPaths.forEach(({ source, destination }) => {
      log.debug(`${source} => ${destination}`);
    });
    return localPaths;
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
