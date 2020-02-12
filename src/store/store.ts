import Vue from "vue";
import Vuex from "vuex";
import { theme } from "./modules/theme";
import { modal } from "./modules/modal";
import { snackbar } from "./modules/snackbar";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        theme,
        modal,
        snackbar
    }
});
