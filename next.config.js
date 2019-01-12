// https://github.com/zeit/next.js/issues/5750
const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {} // We're never in "production server" phase when in development mode
    : !process.env.NOW_REGION
    ? require('next/constants') // Get values from `next` package when building locally
    : require('next-server/constants'); // Get values from `next-server` package when building on now v2

module.exports = phase => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {};
  }

  const withTypescript = require('@zeit/next-typescript');
  const env = require('dotenv').config();

  return withTypescript({
    publicRuntimeConfig: env.parsed,
  });
};