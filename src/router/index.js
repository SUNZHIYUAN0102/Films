import Vue from "vue";
import VueRouter from "vue-router";
import Film from "../views/Film.vue";
import Cinema from "../views/Cinema.vue";
//import Center from "../views/Center.vue";
import Nowplaying from "../views/film/Nowplaying.vue";
import Comingsoon from "../views/film/Comingsoon.vue";
import Detail from "../views/Detail.vue";
import Search from "../views/Search.vue";
//import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/film",
    component: Film,
    children: [
      {
        path: "/film/nowplaying",
        component: Nowplaying,
      },
      {
        path: "/film/comingsoon",
        component: Comingsoon,
      },
      {
        path: "",
        redirect: "/film/nowplaying",
      },
    ],
  },
  {
    path: "/cinema",
    component: Cinema,
  },
  {
    path: "/cinema/search",
    component: Search,
  },
  {
    path: "/center",
    component: () => import("../views/Center.vue"),
  },
  {
    path: "/detail/:myid",
    component: Detail,
    name: "meowDetail",
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    //component: import ( /* webpackChunkNmae: "meowgroup" */ '../views/Login.vue')
  },
  {
    path: "/city",
    component: () => import("../views/City.vue"),
  },
  {
    path: "*",
    redirect: "/film",
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

// router.beforeEach((to, from, next) => {
//     const auth = ['/center', '/order', '.money', '/card'];

//     if (auth.includes(to.fullPath)) {
//         if (!localStorage.getItem("token")) {
//             next('/login')
//             console.log("验证token");
//         }
//     } else {
//         next()
//     }
// })

export default router;
