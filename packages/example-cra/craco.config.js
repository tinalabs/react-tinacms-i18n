module.exports = function ({ env }) {
  return {
    webpack: {
      // Fixes the "import outside of src" bug
      configure: webpackConfig => {
        const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
          ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
        );
  
        webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
        return webpackConfig;
      }
    },
  };
};
