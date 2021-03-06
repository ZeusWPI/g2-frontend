import Vue from "vue";
import store from "@/store/store";
import { Store } from "vuex";

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
 * Convert a dotted path string to a property value from a given object.
 * @param path Path to find.
 * @param object Object to get data from.
 */
function getPathValue(path: string, object: any) {
    return path.split(".").reduce((p, c) => (p && p[c]) || null, object);
}

/**
 * Translate function.
 * @param store Vuex store instance.
 * @param path Path to the key to translate.
 * @param params Optional parameters (counting from $0).
 */
function getTranslation(store: Store<unknown>, path: string, ...params: unknown[]) {
    const language = store.getters["i18n/language"];
    const defaultLanguage = languages.find(language => language.default);

    // Convert a dotted path to a nested property selector of an object.
    let value = getPathValue(path, language.locale) ?? null;

    // Default fallback: default language.
    if (!value && defaultLanguage) {
        value = getPathValue(path, defaultLanguage.locale);
    }

    // Make sure the value is not null.
    if (!value) {
        console.warn(`No translation for ${language.name} for key '${path}'.`);

        value = "";
    }

    // Replace the optional params if available.
    for (const index in params) {
        const param = params[index];

        value = value.replace(new RegExp(`\\$${index}`, "g"), param);
    }

    return value;
}

/**
 * Translate function.
 * @param path Path to the key to translate.
 * @param params Optional parameters (counting from $0).
 */
export function t(path: string, ...params: unknown[]) {
    return getTranslation(store, path, params);
}

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
        t(path: string, ...params: unknown[]) {
            return getTranslation(this.$store, path, params);
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
