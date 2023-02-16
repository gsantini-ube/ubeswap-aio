const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const fs = require('fs')
const path = require('path')
const { getLoader, loaderByName } = require('@craco/craco')

const packages = []
packages.push(path.join(__dirname, '../ubeswap-header'))
packages.push(path.join(__dirname, '../ubeswap-v3'))

const now = Math.floor(new Date().getTime() / 1000)

module.exports = {
  webpack: {
    configure: (config, { env, paths }) => {
      paths.appBuild = config.output.path = path.resolve('../../build')
      if (process.env.SENTRY_AUTH_TOKEN) {
        config.plugins.push(
          new SentryWebpackPlugin({
            // sentry-cli configuration
            authToken: process.env.SENTRY_AUTH_TOKEN,
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            release:
              process.env.REACT_APP_SENTRY_RELEASE ??
              `${
                process.env.VERCEL_GIT_COMMIT_REF ? process.env.VERCEL_GIT_COMMIT_REF.replace(/\//g, '--') : 'unknown'
              }-${process.env.VERCEL_GIT_COMMIT_SHA ? process.env.VERCEL_GIT_COMMIT_SHA : 'unknown'}`,

            // webpack specific configuration
            include: './build/',
            ignore: ['node_modules'],
            setCommits: {
              repo: process.env.GITHUB_REPO,
              commit: process.env.GIT_COMMIT_SHA ?? process.env.VERCEL_GIT_COMMIT_SHA,
            },
            deploy: {
              env: process.env.REACT_APP_SENTRY_ENVIRONMENT ?? process.env.VERCEL_ENV,
              url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
              started: now,
            },
          })
        )
      }
      const { isFound, match } = getLoader(config, loaderByName('babel-loader'))
      if (isFound) {
        const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include]
        match.loader.include = include.concat(packages)
      }

      return config
    },
  },
  eslint: {
    enable: false,
  },
  typescript: { enableTypeChecking: false },
}
