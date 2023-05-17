import Book from "../component/Book";
import User from "../component/User";
import Class from "../component/Class";
import Layout from "../component/Layout";
import Page404 from "../component/404";
import Login from "../component/Login/login";
import Register from "../component/Login/register";

export default [
  {
    path: "/console",
    meta: {
      isLogin: true,
      isMenu: true,
    },
    component: Layout,
    children: [
      {
        path: "/console",
        meta: {
          isLogin: true,
        },
        component: User,
      },
      {
        path: "/console/book",
        meta: {
          isLogin: true,
        },
        component: Book,
      },
      {
        path: "/console/class",
        meta: {
          isLogin: true,
        },
        component: Class,
      },
      {
        path: "/console/*",
        meta: {
          isLogin: true,
        },
        component: Page404,
      },
    ],
  },
  {
    path: "/login",
    meta: {
      isLogin: false,
    },
    component: Login,
  },
  {
    path: "/register",
    meta: {
      isLogin: false,
    },
    component: Register,
  },
  {
    path: "*",
    meta: {
      isLogin: false,
    },
    component: Page404,
  },
];
