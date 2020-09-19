const path = require('path')
exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    resolve: {
      // ⚠ Note the '..' in the path because the docz gatsby project lives in the `.docz` directory
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      alias: {
        "@apps":  path.resolve(__dirname, '../src/apps/'),
        '@components': path.resolve(__dirname, '../src/components/'),
        "@config": path.resolve(__dirname, '../src/config/'),
        "@context": path.resolve(__dirname, '../src/context/'),
        "@endpoints": path.resolve(__dirname, '../src/endpoints/'),
        "@helpers": path.resolve(__dirname, '../src/helpers/'),
        "@i18n":  path.resolve(__dirname, '../src/i18n/'),
        "@layouts": path.resolve(__dirname, '../src/layouts/'),
        "@mocks": path.resolve(__dirname, '../src/mocks/'),
        "@pages": path.resolve(__dirname, '../src/pages/'),
        "@settings": path.resolve(__dirname, '../src/settings/'),
        "@theme": path.resolve(__dirname, '../src/theme/'),
        "@types": path.resolve(__dirname, '../src/types/'),
      },
    },
  })
}