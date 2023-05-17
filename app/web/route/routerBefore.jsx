import React from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import routes from ".";
import { getCookie } from "../util/dataTool";
// 拦截
const RouterBeforeEach = (props) => {
  document.title = "Study Online";

  const isLogin = !!getCookie("EGG_SESS");
  if (props?.route?.meta?.isLogin) {
    if (!isLogin) {
      return <Navigate to={"/login"} replace />;
    }
  }
  const location = useLocation();
  const routerKey = location.pathname;
  if (isLogin && ["/login", "/register"].includes(routerKey)) {
    return <Navigate to={"/console"} replace />;
  }
  return <div>{props.children}</div>;
};
// 渲染路由
const renderRoutes = (routes) => {
  return routes.map((item) => {
    const route = { meta: item.meta, path: item.path };
    if (item.component) {
      // element 要接收react.element类型 item.component 是对象 所以要转一下
      // 看着里看着里
      route.element = (
        <RouterBeforeEach route={item}>
          <item.component />
        </RouterBeforeEach>
      );
    }
    if (item.children) {
      route.children = renderRoutes(item.children);
    }
    if (item.redirect) {
      route.element = <Navigate to={item.redirect} />;
    }
    return route;
  });
};

export default function Router() {
  return useRoutes(renderRoutes(routes));
}
