import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import {
  User,
  Menu as IconMenu,
  SwitchFilled,
} from '@element-plus/icons-vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: "goods",
    children: [
      {
        path: "goods",
        name: "goods",
        component: () => import("../views/GoodsView.vue"),
        meta: {
          isShow: true,
          title: "商品列表",
          icon:IconMenu
        },
      },
      {
        path: "user",
        name: "user",
        component: () => import("../views/UserView.vue"),
        meta: {
          isShow: true,
          title: "用户列表",
          icon:User
        },
      },
      {
        path: "role",
        name: "role",
        component: () => import("../views/RoleView.vue"),
        meta: {
          isShow: true,
          title: "角色列表",
          icon:SwitchFilled
        },
      },
      {
        path: "authority/:id/:auths",
        name: "authority",
        component: () => import("../views/AuthorityView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/:path(.*)*",
    // . :匹配除换行符 \n 之外的任何单字符
    name: "error",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem("token");
  if (!token && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});

export default router;
