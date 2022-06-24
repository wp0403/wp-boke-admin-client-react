/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-06 17:12:23
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-20 17:19:03
 */
import React, { useState, useEffect } from 'react';
import {history} from 'umi'
import { Menu } from 'antd';
import { useSize } from 'ahooks';
import type { MenuProps } from 'antd';
import { authRouterFilter, filterNoName } from '@/utils/authorityUtils';
import SysIcon from '@/components/SysIcon';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const MenuComponent = (props: any) => {
  const {
    route,
    collapsed,
    location: { pathname },
  } = props;

  // 过滤权限路由
  let routes = Array.isArray(authRouterFilter(route))
    ? authRouterFilter(route)
    : authRouterFilter(route)?.routes || [];

  // 过滤不需要展示的路由
  routes = filterNoName(routes);

  // 获取当前窗口大小
  const size = useSize(document.body);
  // 当前展示的一级路由
  const [openKeys, setOpenKeys] = useState<any[]>([]);
  // 当前展示的二级路由
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
  // SubMenu 展开/关闭的回调
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys([keys[1]]);
  };
  // 被选中时调用
  const onSelect = (v: any) => {
    setSelectedKeys(v.key);
    history.push(v.key);
  };
  // 路由数据结构重构
  const changeMenuList: any = (routerList: any[]) => {
    if (!Array.isArray(routerList)) return [];
    return routerList.map(({ path, name, icon = null, routes = null }) =>
      getItem(name, path, icon && <SysIcon type={icon} />, routes && changeMenuList(routes)),
    );
  };
  // 根据当前地址栏匹配路由高亮
  useEffect(() => {
    const pathnameList = pathname.split('/').filter((ite: any) => ite);

    const searchRputeInd = () => {
      routes.forEach((item: any, index: number) => {
        const routeList = item.path.split('/').filter((ite: any) => ite);

        if (routeList[0] === pathnameList[0]) {
          setOpenKeys([item.path]);
        }

        if (pathnameList.length > 1) {
          item?.routes?.forEach((ite: any, ind: number) => {
            if (ite.path === pathname) {
              setSelectedKeys([ite.path]);
            }
          });
        }
      });
    };

    searchRputeInd();
  }, [pathname]);

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      style={{ width: '100%' }}
      items={changeMenuList(routes)}
      triggerSubMenuAction={collapsed ? 'hover' : 'click'}
      inlineCollapsed={collapsed}
    />
  );
};

export default MenuComponent;
