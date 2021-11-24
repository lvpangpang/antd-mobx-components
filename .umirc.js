export default {
  title: 'components',
  logo: '/logo.png',
  favicon: '/logo.png',
  resolve: {
    includes: ['example'],
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
}
