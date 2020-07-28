/* eslint-disable */
const purgeCSS = require("@fullhuman/postcss-purgecss");

const IN_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
    plugins: [
        IN_PRODUCTION &&
            purgeCSS({
                content: [`./public/**/*.html`, `./src/**/*.vue`, `./node_modules/vuetify/src/**/*.ts`],
                variables: true,
                whitelist: [
                    /**
                     * Vuetify
                     */
                    "v-application",
                    "v-application--wrap",
                    "layout",
                    "row",
                    "col"
                ],
                whitelistPatterns: [
                    /-(leave|enter|appear)(|-(to|from|active))$/,
                    /^(?!(|.*?:)cursor-move).+-move$/,
                    /^router-link(|-exact)-active$/,
                    /data-v-.*/,

                    /**
                     * Vuetify
                     */
                    /^v-((?!application).)*$/,
                    /^theme--*/,
                    /.*-transition/,
                    /^justify-*/,
                    /^p*-[0-9]/,
                    /^m*-[0-9]/,
                    /^text--*/,
                    /--text$/,
                    /^row-*/,
                    /^col-*/
                ],
                whitelistPatternsChildren: [
                    /**
                     * Vuetify
                     */
                    /^v-((?!application).)*$/,
                    /^theme--*/
                ]
            })
    ]
};
