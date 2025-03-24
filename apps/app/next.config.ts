import { type SentryBuildOptions, withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

// import path from 'path';
// import { getTheme } from '@finda-co/theme';
// import { createTheme, extendTheme } from '@mui/material';
// import { withPigment } from '@pigment-css/nextjs-plugin';

const isProd = process.env.NODE_ENV === 'production';

/**
 * @type {import('@pigment-css/nextjs-plugin').PigmentOptions}
 */
// const pigmentConfig = {
//   theme: createTheme({
//     cssVariables: true,
//     ...getTheme('light'),
//     // colorSchemes: { light: true, dark: true },
//   }),
//   transformLibraries: ['@mui/material'],
// };

let nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
  ],
  // next.js 15 experimental features
  // experimental: {
  //   ppr: true,
  //   reactCompiler: true,
  // },

  async redirects() {
    return [];
  },

  // https://nextjs.org/docs/app/api-reference/next-config-js/output#automatically-copying-traced-files
  output: 'standalone',
  // https://nextjs.org/docs/architecture/nextjs-compiler#remove-console
  compiler: {
    removeConsole: isProd
      ? {
        exclude: ['error'],
      }
      : false,
  },
};

const sentryConfig: SentryBuildOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'finda-starter',
  project: 'app',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Unables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: false,
};

nextConfig = withSentryConfig(nextConfig, sentryConfig);

export default nextConfig;
// export default withPigment(nextConfig, pigmentConfig);
