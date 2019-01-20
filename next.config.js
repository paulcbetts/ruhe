// https://github.com/zeit/next.js/issues/5750
const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {} // We're never in "production server" phase when in development mode
    : !process.env.NOW_REGION
    ? require('next/constants') // Get values from `next` package when building locally
    : require('next-server/constants'); // Get values from `next-server` package when building on now v2

module.exports = phase => {
  const env = require('dotenv').config();
  if (phase === PHASE_PRODUCTION_SERVER) {
    return { publicRuntimeConfig: env.parsed };
  }

  const withTypescript = require('@zeit/next-typescript');
  const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

  const ts = withTypescript({
    publicRuntimeConfig: env.parsed,
  });

  if (!process.env.BUNDLE_ANALYZE) {
    return ts;
  }

  return withBundleAnalyzer({
    analyzeServer: true,
    analyzeBrowser: true,
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html',
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html',
      },
    },
    ...ts,
  });
};
