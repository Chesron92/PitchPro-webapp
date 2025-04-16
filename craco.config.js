const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Voeg een alias toe voor react-refresh/runtime naar het interne src/react-refresh-fix pad
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        'react-refresh/runtime': path.resolve(__dirname, 'src/react-refresh-fix')
      };
      
      // Pas de ModuleScopePlugin aan om imports van buiten src/ toe te staan
      const moduleScopePlugin = webpackConfig.resolve.plugins.find(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );
      
      if (moduleScopePlugin) {
        moduleScopePlugin.allowedFiles.add(path.resolve(__dirname, 'node_modules/react-refresh/runtime.js'));
      }

      return webpackConfig;
    }
  }
}; 