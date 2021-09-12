import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
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
