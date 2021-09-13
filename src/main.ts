import Vue from "vue";
import AsyncComputed from "vue-async-computed";
import App from "./App.vue";
import router from "./router";
import FullBlogItem from "./components/FullBlogItem.vue";
import "./quasar";
import { DescriptionMixin, TitleMixin } from "./mixins/metaMixins";

Vue.config.productionTip = false;

Vue.use(AsyncComputed);

Vue.component("FullBlogItem", FullBlogItem);
Vue.mixin(TitleMixin);
Vue.mixin(DescriptionMixin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
