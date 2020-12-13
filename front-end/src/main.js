import Vue from "vue";
import App from "./App";
import router from "./router.js";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount("#app");