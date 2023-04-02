import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router";

import "./assets/scss/index.scss";

import store from "./store";
import App from "./App.vue";
import Notifications from "vue-notification";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Notifications);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
