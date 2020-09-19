const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: 'src',

  siteMetadata: {
    title: 'React Typescript',
    description: 'React and TypeScript example starter project',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: ['Components'],
        mdPlugins: [],
        hastPlugins: [],
        ignore: ['README.md'],
        typescript: true,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/Users/uma.krishnan/projects/uma/entable-components/.docz',
        base: 'src',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'React Typescript',
        description: 'React and TypeScript example starter project',
        host: 'localhost',
        port: 4000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/uma.krishnan/projects/uma/entable-components',
          templates:
            '/Users/uma.krishnan/projects/uma/entable-components/node_modules/docz-core/dist/templates',
          docz: '/Users/uma.krishnan/projects/uma/entable-components/.docz',
          cache:
            '/Users/uma.krishnan/projects/uma/entable-components/.docz/.cache',
          app: '/Users/uma.krishnan/projects/uma/entable-components/.docz/app',
          appPackageJson:
            '/Users/uma.krishnan/projects/uma/entable-components/package.json',
          appTsConfig:
            '/Users/uma.krishnan/projects/uma/entable-components/tsconfig.json',
          gatsbyConfig:
            '/Users/uma.krishnan/projects/uma/entable-components/gatsby-config.js',
          gatsbyBrowser:
            '/Users/uma.krishnan/projects/uma/entable-components/gatsby-browser.js',
          gatsbyNode:
            '/Users/uma.krishnan/projects/uma/entable-components/gatsby-node.js',
          gatsbySSR:
            '/Users/uma.krishnan/projects/uma/entable-components/gatsby-ssr.js',
          importsJs:
            '/Users/uma.krishnan/projects/uma/entable-components/.docz/app/imports.js',
          rootJs:
            '/Users/uma.krishnan/projects/uma/entable-components/.docz/app/root.jsx',
          indexJs:
            '/Users/uma.krishnan/projects/uma/entable-components/.docz/app/index.jsx',
          indexHtml:
            '/Users/uma.krishnan/projects/uma/entable-components/.docz/app/index.html',
          db:
            '/Users/uma.krishnan/projects/uma/entable-components/.docz/app/db.json',
        },
        codeSandbox: false,
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
