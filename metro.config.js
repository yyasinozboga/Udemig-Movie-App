// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

// Start with Expo's default config
let config = getDefaultConfig(__dirname);

// Add NativeWind support
config = withNativeWind(config, { input: "./global.css" });

// Wrap with Reanimated's config
config = wrapWithReanimatedMetroConfig(config);

module.exports = config;
