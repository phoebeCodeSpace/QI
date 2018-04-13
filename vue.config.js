module.exports = {
    lintOnSave: false,
    baseUrl: '/demo/',
    outputDir: 'demo',
    devServer: {
        proxy: {
            '/Index': {
                // target: 'http://192.168.3.118:8080/',
                target: 'http://120.131.7.222/',
                changeOrigin: true
            }
        }
    },
    productionSourceMap: false,
    dll: true,
    // chainWebpack: config => {
    //     config.module
    //         .rule('js')
    //         .include
    //         .add(/some-module-to-transpile/)
    //     }
}