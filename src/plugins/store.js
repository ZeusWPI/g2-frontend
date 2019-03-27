import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isDark: false
    },
    mutations: {
        toggleDark(state) {
            state.isDark = !state.isDark;
        }
    }
});

export default store;