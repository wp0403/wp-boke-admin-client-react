import React, { useEffect, useState } from 'react';
import { Redirect } from 'umi';
import { Button } from 'antd';
import { useSize } from 'ahooks';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import LoadingCard from '@/components/LoadingCard';
import LayoutSearch from '@/components/LayoutSearch';
import LayoutUser from '@/components/LayoutUser';
import Menu from './Menu';
import * as authorityUtils from '@/utils/authorityUtils';
import { localGet } from '@/utils/local';
import { getLayoutDom } from '@/utils/utils';
import smallLogo from '../../public/favicon1.png';
import bigLogoBai from '../../public/defaultGraph/weiguang_bai.png';
import style from './index.less';

const LayoutPage = (props: any) => {
  const {
    children,
    location: { pathname },
    route,
  } = props;
  // 全局loading
  const [readPage, setReadPage] = useState<Boolean>(true);
  // 获取当前窗口大小
  const size = useSize(document.body);
  // 当前导航面板的状态
  const [collapsed, setCollapsed] = useState((size?.width || 1000) > 1000);
  // 检查当前路由是否可以访问（或者有没有权限访问）
  const checkAuth = authorityUtils.matchingRoute(pathname, route) || '/404';
  // 判断当前路由是否为首页路由
  const isHome = authorityUtils.isRouteInclude(pathname, '/home');
  // 判断children是否为空
  const childrenRender: React.ReactNode =
    typeof children === 'undefined' ? null : children;
  // 判断当前的路由是否重定向
  const Authorized = () => {
    if (!localGet('token')) {
      return <Redirect to={`/login`} />;
    } else if (checkAuth !== '403' && checkAuth !== '404') {
      return childrenRender;
    } else if (checkAuth === '403') {
      return <Redirect to={`/${checkAuth}`} />;
    } else {
      return <Redirect to={checkAuth} />;
    }
  };
  // 黑白切换
  const switchTheme = () => {
    document.documentElement.classList.toggle('dark');
  };
  // 设置导航面板的状态
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  // 监听页面宽度设置导航样式
  useEffect(() => {
    setCollapsed((size?.width || 1000) <= 1000);
  }, [size?.width]);

  useEffect(() => {
    getLayoutDom();
  }, []);

  return readPage ? (
    <div className={style.pro_layout}>
      <div
        className={
          collapsed ? style.pro_layout_menu_small : style.pro_layout_menu
        }
      >
        <div className={style.pro_layout_menu_top}>
          <div className={style.pro_layout_menu_icon}>
            {collapsed ? (
              <img src={smallLogo} alt="" />
            ) : (
              <img src={bigLogoBai} alt="" />
            )}
          </div>
        </div>
        {/* 导航 */}
        <Menu {...props} collapsed={collapsed} />
      </div>
      <div className={style.pro_layout_content}>
        {/* 全局搜索和用户登陆信息展示 */}
        <div
          className={
            isHome
              ? style.pro_layout_content_top_home
              : style.pro_layout_content_top
          }
          id="layout_top"
        >
          {/* 导航样式切换按钮 */}
          <Button
            type="ghost"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          {/* 全局搜索框 */}
          <div className={style.pro_layout_search_box}>
            <LayoutSearch />
          </div>
          {/* 当前登陆用户信息展示 */}
          <div className={style.pro_layout_user}>
            <LayoutUser />
          </div>
        </div>
        {/* 导航对应页面展示 */}
        <div
          className={style.pro_layout_content_page}
          id="pro_layout_content_page"
        >
          {Authorized()}
        </div>
      </div>
    </div>
  ) : (
    <LoadingCard />
  );
};

export default LayoutPage;
