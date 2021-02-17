const { resolve } = require('path');
module.exports = function ({ env }) {
  let webpack_config = {
    alias: {},
  };

  webpack_config.alias['react'] = resolve(__dirname, './node_modules/react');
  webpack_config.alias['react-dom'] = resolve(
    __dirname,
    './node_modules/react-dom'
  );
  return {
    webpack: webpack_config,
  };
};
