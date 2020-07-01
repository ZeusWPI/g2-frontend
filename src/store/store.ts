import Vue from "vue";
import Vuex from "vuex";
import { theme } from "./modules/theme";
import { session } from "./modules/session";
import { i18n } from "./modules/i18n";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        theme,
        session,
        i18n
    }
});
