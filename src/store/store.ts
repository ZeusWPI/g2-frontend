import Vue from "vue";
import Vuex from "vuex";
import { theme } from "./modules/theme";
import { session } from "@/store/modules/session";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        theme,
        session
    }
});
