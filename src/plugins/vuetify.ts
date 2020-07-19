import Vue from "vue";
import Vuetify from "vuetify/lib";

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
