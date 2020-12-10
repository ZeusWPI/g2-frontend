import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

import "./plugins/i18n";
import "./assets/scss/main.scss";

import "./assets/scss/main.scss";

axios.defaults.withCredentials = true;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
