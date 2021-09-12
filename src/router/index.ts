import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

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
    path: "/blog/:id",
    name: "Blog Item",
    props: true,
    component: () =>
      import(/* webpackChunkName: "blog" */ "../views/BlogPost.vue"),
  },
  {
    path: "/blogdev",
    name: "Blog IDE",
    component: () =>
      import(/* webpackChunkName: "blog" */ "../views/BlogIDE.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
