/* eslint-disable */
module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH || "",
    productionSourceMap: process.env.VUE_APP_SOURCEMAP === "true",

    /**
     * Transpile certain dependencies from ES6 to lower ES versions
     * for older browser support (eg: IE11, Safari 9)
     */
    transpileDependencies: ["vuetify"],

    /**
     * Prevent error on compilation when ESLint found errors/warnings.
     */
    lintOnSave: "warning"
};
