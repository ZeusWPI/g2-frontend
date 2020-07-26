import Vue from "vue";
import Vuetify from "vuetify/lib";

/**
 * Material Design Icons
 * @ref https://materialdesignicons.com/
 */
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: "#ff7f00",
                secondary: "#FF0000"
            },

            dark: {
                primary: "#ff7f00",
                secondary: "#FF0000"
            }
        }
    }
});
