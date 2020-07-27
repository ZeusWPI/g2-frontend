module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH ? process.env.VUE_APP_PUBLIC_PATH : "",
    productionSourceMap: process.env.VUE_APP_SOURCEMAP ? Boolean(process.env.VUE_APP_SOURCEMAP) : false
};
