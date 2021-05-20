module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        /*端口号*/
        port: 8080,
        https: false,
        hotOnly: false,
        // proxy: {
        //     '/api':{
        //         target:'http://172.20.10.7:8080',
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '/api':''
        //         }
        //     }
        // }
    }
}