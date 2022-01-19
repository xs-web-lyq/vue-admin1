module .exports = {
    pages:{
        index:{
            // 入口
            entry:'src/main.js',
        }
    },
    lintOnSave:false, //关闭语法检查
    // 此方法只能配置一个服务器代理，也就是说只能向一台服务器请求数据（方法一）
    // devServer: {
    //     proxy: 'http://localhost:5000'
    //   },

    // 方式二
    devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:5000',
            pathRewrite:{'^/api':''},
            ws: true, //用于支持websocket
            changeOrigin: false //用于控制请求头中的host值
          },
          '/love': {
            target: 'http://localhost:5001',
            pathRewrite:{'^/love':''},
            ws: true, //用于支持websocket
            changeOrigin: false //用于控制请求头中的host值
          },
        //   '/foo': {
        //     target: '<other_url>'
        //   }
        }
      }
}