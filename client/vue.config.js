const path = require("path");
module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  productionSourceMap: false,
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/service-worker.js",
    },
    manifestOptions: {
      name: "Where we watch",
      short_name: "WWW",
      theme_color: "#9e9e9e",
      background_color: "#ffffff",
      icons: [
        { src: "./img/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        { src: "./img/icons/android-chrome-512x512.png", sizes: "192x192", type: "image/png" },
      ],
    },
  },
  devServer: {
    proxy: "http://127.0.0.1:3000",
  },
  transpileDependencies: ["vuetify"],
};
