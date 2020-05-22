
const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const env = process.env.NODE_ENV === 'production'
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  chainWebpack: config => {
    // 来将 svg 图标作为 Vue 组件导入
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader').options({
        svgo: {
          plugins: [
            { 'cleanupIDs': false },
            { 'convertShapeToPath': false },
            { 'convertStyleToAttrs': false }
          ]
        }
      })
    // 修复HMR
    // config.resolve.symlinks(true)
    // 添加别名
    config.resolve.alias
      // 内部为正则表达式  vue结尾的
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('@ant-design/icons/lib/dist$', resolve('./icons.js'))
    if (env) {
      // 压缩图片
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false }
          // webp: { quality: 75 }
        })
    }
    return config
  },
  configureWebpack: config => {
    config.resolve.extensions = ['.vue', '.js', '.jsx', '.json', '.less', '.css', '.scss', '.jpg', '.png', '.svg']
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    if (env) {
      const plugins = []
      // 开启 gzip 压缩
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      config.plugins = [...config.plugins, ...plugins]

      // 利用splitChunks单独打包第三方模块
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial'
            },
            antvUI: {
              name: 'chunk-antvUI',
              priority: 20,
              test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
              chunks: 'all'
            }
          }
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#36a065',
          'warning-color': '#fa6400',
          'link-color': '#333',
          'link-hover-color': '#36a065'
        },
        javascriptEnabled: true
      }
    }
  },
  // LESS全局变量
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('./src/less/theme.less')]
    }
  },
  transpileDependencies: [
    'ant-design-vue',
    'resize-detector'
  ],
  outputDir: process.env.VUE_APP_OUTPUTDIR,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: false
}
