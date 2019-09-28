const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd', libraryDirectory: 'es', style: true, // change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#0087e0', // primary color for all components
      '@secondary-color': '#0087e0', // primary color for all components
      '@link-color': '#0087e0', // link color
      '@success-color': '#0087e0', // success state color
      '@warning-color': '#faad14', // warning state color
      '@error-color': '#f5222d', // error state color
      '@font-size-base': '14px', // major text font size
      '@heading-color': 'rgba(0, 0, 0, .85)', // heading text color
      '@text-color': 'rgba(0, 0, 0, .9)', // major text color
      '@text-color-secondary': 'rgba(0, 0, 0, .65)', // secondary text color
      '@disabled-color': 'rgba(0, 0, 0, .25)', // disable state color
      '@border-radius-base': '4px', // major border radius
      // '@border-color-base': '#039be9', // major border color
      '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)', // major shadow for layers
      '@layout-header-background': '#23282d', // DASK BACGROUND
    },
  }),
);
