// generator.js
module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    "scripts": {
      "check-version": "node checkVersion.js",
      "serve": "vue-cli-service serve --port=5000",
      "build": "vue-cli-service build",
      "postbuild": "node cordovaConfig.js && cordova-hcp build",
      "dev-dev": "npm run check-version && cross-env PROJECT_ENV=dev npm run serve",
      "dev-test": "npm run check-version && cross-env PROJECT_ENV=testing npm run serve",
      "build-dev": "npm run check-version && cross-env PROJECT_ENV=dev npm run build",
      "build-test": "npm run check-version && cross-env PROJECT_ENV=testing npm run build",
      "build-uat": "npm run check-version && cross-env PROJECT_ENV=uat npm run build",
      "build-prod": "npm run check-version && cross-env PROJECT_ENV=production npm run build",
      "copy-app": "fcli copy platforms/android/app/build/outputs/apk/debug/app-debug.apk www/app/app.apk -o",
      "static": "node service.js",
      "lint": "vue-cli-service lint"
    },
    "dependencies": {
      "core-js": "^3.20.2",
      "pl-mobile2": "^1.2.14",
      "vconsole": "^3.11.0",
      "vue": "^3.2.26",
      "vue-router": "^4.0.12",
      "vuex": "^4.0.2"
    },
    "devDependencies": {
      "@vue/cli-plugin-babel": "~4.5.0",
      "@vue/cli-plugin-eslint": "~4.5.0",
      "@vue/cli-plugin-router": "~4.5.0",
      "@vue/cli-plugin-vuex": "~4.5.0",
      "@vue/cli-service": "~4.5.0",
      "@vue/compiler-sfc": "^3.2.26",
      "babel-eslint": "^10.1.0",
      "cordova": "^11.0.0",
      "cordova-hot-code-push-cli": "^1.1.1",
      "cross-env": "^7.0.3",
      "eslint": "^6.8.0",
      "eslint-plugin-vue": "^7.20.0",
      "file-cli": "^1.2.0",
      "koa": "^2.13.4",
      "koa-server-http-proxy": "^0.1.0",
      "koa-static": "^5.0.0",
      "less": "^4.1.2",
      "less-loader": "^6.2.0"
    }
  });
  // 复制template模版
  api.render('./template');
}
