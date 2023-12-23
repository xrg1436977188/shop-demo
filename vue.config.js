const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './', // 配置相对路径  打包后可直接上线
  transpileDependencies: true
})
