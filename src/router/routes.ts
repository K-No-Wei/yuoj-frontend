/* eslint-disable prettier/prettier */
import { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "浏览题目",
    component: HomeView,
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: () => import("../views/NoAuthView.vue"),
  },
  {
    path: "/admin",
    name: "管理员可见",
    meta: {
      access: "canAdmin",
    },
    component: () => import("../views/AdminView.vue"),
  },
  {
    path: "/about",
    name: "关于我的",
    component: () => import("../views/AboutView.vue"),
  },
];
