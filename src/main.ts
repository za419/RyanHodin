import Vue from "vue";
import AsyncComputed from "vue-async-computed";
import App from "./App.vue";
import router from "./router";
import FullBlogItem from "./components/FullBlogItem.vue";
import "./quasar";

Vue.config.productionTip = false;

Vue.use(AsyncComputed);

Vue.component("FullBlogItem", FullBlogItem);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
