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
                primary: "#ff7f00"
            },

            dark: {
                primary: "#ff7f00"
            }
        }
    }
});
