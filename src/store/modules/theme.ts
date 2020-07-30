/* eslint-disable */
import Vuetify from "@/plugins/vuetify";

export const theme = {
    namespaced: true,

    state: {
        dark: true
    },

    mutations: {
        /**
         * Change the dark option.
         * @param state Vuex state.
         * @param dark If the current theme is dark or not.
         */
        SET_DARK(state: any, dark: boolean) {
            state.dark = dark;

            // Update localstorage.
            //  When dark -> theme.dark: true
            //  When not dark -> theme.dark: undefined
            const theme = JSON.parse(localStorage.theme || "{}");
            theme.dark = dark;

            // Store the changes into local storage.
            localStorage.theme = JSON.stringify(theme);

            // Update Vuetify dark theme.
            Vuetify.framework.theme.dark = dark;
        }
    },

    actions: {
        /**
         * Toggle dark theme on/off.
         * @param context Vuex context.
         */
        toggleDark(context: any) {
            context.commit("SET_DARK", !context.state.dark);
        },

        /**
         * Fetch if dark theme is enabled or not.
         * @param context Vuex context.
         */
        fetchDark(context: any) {
            const theme = JSON.parse(localStorage.theme || "{}");

            // If the local storage dark option is set, use that.
            if (theme.dark !== undefined) {
                context.commit("SET_DARK", theme.dark);
            }

            // If the dark theme CSS media query is provided, use that.
            else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                context.commit("SET_DARK", true);
            }
        }
    },

    getters: {
        /**
         * Get if the dark theme is enabled.
         * @param state Vuex state.
         */
        dark(state: any): boolean {
            return state.dark;
        }
    }
};
