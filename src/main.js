import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/vi";

// Filter
import * as filters from "@/filters";

// Aixos OK
import "@/api/config.js";

import VueClipboards from "vue-clipboards";

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

// element-ui
Vue.use(ElementUI, { locale });
Vue.use(VueClipboards);

// CSS
import "@/static/css/style.css";
import "@/static/css/screen.css";
import "@/static/css/style-v2.css";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
