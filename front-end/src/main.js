import Vue from "vue";
import App from "./App";
import router from "./router.js";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  vuetify: new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#4CAF50',
          secondary: '#cddc39',
          accent: '#80e27e',
          error: '#b71c1c',
          warning: '#009688',
          info: '#4CAF50',
          success: '#00bcd4'
        },
      },
    },
  }),
  render: (h) => h(App),
}).$mount("#app");