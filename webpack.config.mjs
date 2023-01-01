import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

export default (config) => {
  config.target = 'electron-renderer';

  config.plugins = [
    ...config.plugins,
    new NodePolyfillPlugin({
      excludeAliases: ["console"]
    })
  ];

  return config;
}
