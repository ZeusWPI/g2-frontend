import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css"

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "mdi"
    },
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: "#ff7f00",
                secondary: "#b0bec5",
                accent: "#8c9eff",
                error: "#b71c1c"
            },

            dark: {
                primary: "#ff7f00",
                secondary: "#b0bec5",
                accent: "#8c9eff",
                error: "#b71c1c"
            }
        }
    }
});
