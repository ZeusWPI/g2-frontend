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
         */
        t(path: string) {
            const language = this.$store.getters["i18n/language"];

            // Convert a dotted path to a nested property selector of an object.
            return path.split(".").reduce((p, c) => (p && p[c]) || null, language.locale) ?? "";
        }
    }
});

/**
 * Typescript Declarations
 */
declare module "vue/types/vue" {
    interface Vue {
        t(path: string): string;
        languages(): Language[];
    }
}

export type Language = {
    code: string;
    name: string;
    locale: unknown;
    default?: boolean;
};
