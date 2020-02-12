import Vuetify from "@/plugins/vuetify";

export const theme = {
    namespaced: true,
    
    state: {
        dark: false
    },

    mutations: {
        SET_DARK(state, dark: boolean) {
            state.dark = dark;

            // Update localstorage.
            //      When dark -> theme.dark: true
            //      When not dark -> theme.dark: undefined
            let theme = localStorage.theme || "{}";
            theme = JSON.parse(theme);

            if (dark) {
                theme.dark = true;
            } else {
                theme.dark = false;
            }

            localStorage.theme = JSON.stringify(theme);

            // Update Vuetify dark theme.
            Vuetify.framework.theme.dark = dark;
        }
    },

    actions: {
        /**
         * Toggle dark theme on/off.
         *
         * @param {*} context
         */
        toggleDark(context) {
            context.commit("SET_DARK", !context.state.dark);
        },

        /**
         * Fetch if dark theme is enabled or not.
         *
         * @param {*} context
         */
        fetchDark(context) {
            let theme = localStorage.theme || "{}";
            theme = JSON.parse(theme);

            // Check localstorage for dark query.
            if (theme.dark !== undefined) {
                context.commit("SET_DARK", theme.dark);
            }

            // Check CSS media query for dark theme.
            else if (
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            ) {
                context.commit("SET_DARK", true);
            }
        }
    }
};
