import Vue from "vue";
import store from "@/store/store";

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
 * @param path Path to the key to translate.
 * @param params Optional parameters (counting from $0).
 */
export function t(path: string, ...params: unknown[]) {
    const language = store.getters["i18n/language"];
    const defaultLanguage = languages.find(language => language.default);

    // Convert a dotted path to a nested property selector of an object.
    let value = getPathValue(path, language.locale) ?? null;

    // Default fallback: default language.
    if (!value && defaultLanguage) {
        value = getPathValue(path, defaultLanguage.locale);
    }

    // Replace the optional params if available.
    for (const index in params) {
        const param = params[index];

        value = value.replace(new RegExp(`\\$${index}`, "g"), param);
    }

    return value;
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
            return t(path, ...params);
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
