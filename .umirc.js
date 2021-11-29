export default {
  title: "components",
  logo: "./index.ico",
  favicon: "./index.ico",
  resolve: {
    includes: ["example"],
  },
  history: {
    type: "hash",
  },
  publicPath: "./",
  outputPath: "docs",
  extraBabelPlugins: [
    [
      "babel-plugin-import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true,
      },
    ],
  ],
};
