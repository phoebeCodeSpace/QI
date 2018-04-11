module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.3.118:8080/',
                changeOrigin: true
            }
        }
    },
    productionSourceMap: false,
    dll: true
}