const port = 7071;
const title = '星星社区'//配置标题
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port
  },
  configureWebpack: {
    name: title
  },
  chainWebpack(config) {
    // 1.让svgloader排除掉src/icons这个目录
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'));//以当前文件为起点 拼出src/icons的路径

    // 2.让插件svg-sprite-loader添加规则src/icons/svg
    config.module.rule('icons')
      .test(/\.svg$/)   //svg结尾的文件名
      .include.add(resolve('src/icons')).end()//include数组操作 end回退到上一层
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
  }
}