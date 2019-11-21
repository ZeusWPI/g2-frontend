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
                secondary: "#b0bec5",
                accent: "#8c9eff",
                error: "#b71c1c"
            }
        }
    }
});
