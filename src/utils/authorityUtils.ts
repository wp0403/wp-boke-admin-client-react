/*
 * @Descripttion: 此utils存放全局的登录和用户权限以及路由权限的校验方法函数
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-13 11:29:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-08-16 11:30:29
 */

import { cloneDeep } from 'lodash';
import type { Route } from '@/types/connect';
import api from '@/api';
import { localGet } from '@/utils/local';

const { all } = api;

export interface AuthorityModuleType {
  id: string;
  authName: string;
  desc: string;
}

// 全局资源存储
let globalAuthorityModules: AuthorityModuleType[] | null = [];

// 获取全局权限缓存
export const getGlobalAuthorityModule = (): AuthorityModuleType[] | null => {
  const str = localGet('auth');
  if (str) {
    globalAuthorityModules = JSON.parse(str);
  } else {
    globalAuthorityModules = null;
  }
  return globalAuthorityModules;
};

// 权限校验
export const authCheck = (routerItem: Route) => {
  // 判断是否需要权限校验
  if (!routerItem.authority) return true;
  // 获取权限列表
  const AuthorityModule: AuthorityModuleType[] | null =
    getGlobalAuthorityModule();
  // 校验是否有该权限
  const authKey =
    AuthorityModule?.some((item) => item.authName === routerItem.authority) ||
    false;
  // 返回校验结果
  return authKey;
};

/**
 * 过滤没有name的路由
 */
export const filterNoName: any = (routerNode: Route[] | Route) => {
  const newRoutes = cloneDeep(routerNode);

  // 判断是否是数组
  if (Array.isArray(newRoutes)) {
    return newRoutes
      .filter((item: Route) => item.name)
      .map((item: Route) => filterNoName(item));
  }
  // 判断是否包含子路由
  if (newRoutes.routes && newRoutes.routes[0]) {
    return {
      ...newRoutes,
      // 递归调用
      routes: filterNoName(newRoutes.routes),
    };
  }
  return newRoutes;
};

/**
 * 路由权限过滤
 */
export const authRouterFilter: any = (routerNode: Route) => {
  const newRoutes = cloneDeep(routerNode);

  // 判断是否是数组
  if (Array.isArray(newRoutes)) {
    return newRoutes
      .filter(
        (item: Route) => !item.authority || (item.authority && authCheck(item)),
      )
      .map((item: Route) => authRouterFilter(item));
  }
  // 判断是否包含子路由
  if (newRoutes.routes && newRoutes.routes[0]) {
    return {
      ...newRoutes,
      // 递归调用
      routes: authRouterFilter(newRoutes.routes),
    };
  }
  return newRoutes;
};

/**
 * 根据当前地址栏信息匹配路由对象
 */
export const matchingRoute: any = (pathname: string, route: Route) => {
  if (Array.isArray(route)) {
    return route
      .map((item) => matchingRoute(pathname, item))
      .find((item) => item);
  }
  if (route.path === pathname) {
    return authCheck(route) ? pathname : '403';
  }
  if (route.routes && route.routes[0]) {
    return route.routes
      .map((item) => matchingRoute(pathname, item))
      .find((item) => item);
  }
};

/**
 * 判断当前路由是否包含某个路由
 */
export const isRouteInclude: any = (pathname: string, seekRoute: string) => {
  const reg = RegExp(seekRoute);
  return reg.test(pathname);
};
