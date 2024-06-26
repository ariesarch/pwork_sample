const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const { generate } = require('@storybook/react-native/scripts/generate')

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

generate({
  configPath: path.resolve(__dirname, './.storybook'),
});

const config = {
  resolver: {
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'cjs', 'mjs', 'json'],
  },
  transformer: {
    unstable_allowRequireContext: true,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
