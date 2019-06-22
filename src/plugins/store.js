import Vue from "vue";
import Vuex from "vuex";

const storage = window.localStorage;
const initialIsDark = storage.getItem("isDark");

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isDark: initialIsDark === "true"
  },
  mutations: {
    toggleDark(state) {
      const toggle = !state.isDark;
      state.isDark = toggle;
      storage.setItem("isDark", toggle.toString());
    }
  }
});

export default store;
