import Vue from "vue";
import AsyncComputed from "vue-async-computed";
import App from "./App.vue";
import router from "./router";
import FullBlogItem from "./components/FullBlogItem.vue";
import titleMixin from "./mixins/titleMixin";
import "./quasar";

Vue.config.productionTip = false;

Vue.use(AsyncComputed);

Vue.component("FullBlogItem", FullBlogItem);
Vue.mixin(titleMixin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
