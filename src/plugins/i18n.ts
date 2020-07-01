import Vue from "vue";

/**
 * Available languages.
 */
export const languages: Language[] = [
    {
        name: "English",
        code: "en",
        locale: require("@/i18n/en.json"),
        default: true
    },

    {
        name: "Nederlands",
        code: "nl",
        locale: require("@/i18n/nl.json")
    }
];

/**
 * Mixin for translation.
 */
Vue.mixin({
    methods: {
        /**
         * Translate function.
         * @param path Path to the key to translate.
         * @param params Optional parameters (counting from $0).
         */
        t(path: string, ...params: [unknown]) {
            const language = this.$store.getters["i18n/language"];

            // Convert a dotted path to a nested property selector of an object.
            let value = path.split(".").reduce((p, c) => (p && p[c]) || null, language.locale) ?? "";

            // Replace the optional params if available.
            for (const index in params) {
                const param = params[index];

                value = value.replace(new RegExp(`\\$${index}`, "g"), param);
            }

            return value;
        }
    }
});

/**
 * Typescript Declarations
 */
declare module "vue/types/vue" {
    interface Vue {
        t(path: string): string;
    }
}

export type Language = {
    code: string;
    name: string;
    locale: unknown;
    default?: boolean;
};
