import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/privacy",
    name: "Privacy Policy",
    component: PrivacyPolicy,
  },
  {
    path: "/blog/:id",
    name: "Blog Item",
    props: true,
    component: () =>
      import(/* webpackChunkName: "blog" */ "../views/BlogPost.vue"),
  },
  {
    path: "/blogdevinfo",
    name: "Blog IDE Info",
    props: true,
    component: () =>
      import(/* webpackChunkName: "blog" */ "../views/BlogInfo.vue"),
  },
  {
    path: "/blogdev",
    name: "Blog IDE",
    component: () =>
      import(/* webpackChunkName: "blog" */ "../views/BlogIDE.vue"),
  },
  {
    path: "*",
    name: "Not Found",
    component: Home,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
