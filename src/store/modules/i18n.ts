import { Language, languages } from "@/plugins/i18n";

export const i18n = {
    namespaced: true,

    state: {
        language: null
    },

    mutations: {
        /**
         * Set the users language.
         * @param state Vuex state.
         * @param data {
         *      code Code of the selected language.
         *      save If the language should be written to localstorage.
         * }
         */
        SET_LANGUAGE(state: any, data: { code: string; save: boolean }) {
            // Update the local language.
            state.language = data.code;

            // Update the language in localstorage.
            if (data.save) {
                localStorage.language = data.code;
            }
        }
    },

    actions: {
        /**
         * Fetch the user language.
         *  1. Search in localstorage.
         *  2. Search for the system language.
         *  3. Use the default.
         *  @param context Vuex context.
         */
        fetch(context: any) {
            // Search in the localstorage for language.
            const localLanguage = localStorage.language
                ? languages.find(language => language.code === localStorage.language)
                : null;

            // Search in the system language for language.
            const systemLanguage = navigator.language
                ? languages.find(language => navigator.language.startsWith(language.code))
                : null;

            // Search for the first default language.
            const defaultLanguage = languages.find(language => language.default);

            // Language to set.
            const language = localLanguage || systemLanguage || defaultLanguage;

            // Update the language.
            context.commit("SET_LANGUAGE", {
                code: language?.code,
                save: false
            });
        }
    },

    getters: {
        /**
         * Get the language of the user.
         * @param state Vuex state.
         */
        language(state: any): Language {
            return languages.find(language => language.code === state.language)!!;
        }
    }
};
