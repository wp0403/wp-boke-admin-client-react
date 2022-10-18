/*
 * @Descripttion: 此utils存放项目全局通用的事件和组件函数
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-13 11:29:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-17 16:14:05
 */

// 全局滚动的盒子
export let layoutContent: any = null;
// 全局导航盒子
export let layoutTop: any = null;

// 初始化获取全局元素
export const getLayoutDom = () => {
  layoutContent = document.getElementById('pro_layout_content_page');
  layoutTop = document.getElementById('layout_top');
};

// 重置全局导航的样式
export const removeLayoutTopStyle = () => {
  if (!layoutTop) return;
  layoutTop?.classList.remove('pro_layout_content_top');
};

// 设置全局导航样式
export const addLayoutTopStyle = () => {
  if (!layoutTop) return;
  layoutTop?.classList.add('pro_layout_content_top_home');
};

// 页面滚动事件
export const pageScroll = () => {
  if (!layoutTop) return;
  if (layoutContent?.scrollTop && layoutContent?.scrollTop > 40) {
    layoutTop.className = 'pro_layout_content_top';
  } else {
    layoutTop.className = 'pro_layout_content_top_home';
  }
};

// 设置页面滚动事件
export const bindHandleScroll = () => {
  if (!layoutContent) return;
  layoutContent.addEventListener('scroll', pageScroll, false);
};

// 卸载页面滚动事件
export const removeScroll = () => {
  if (!layoutContent) return;
  layoutContent.removeEventListener('scroll', pageScroll, false);
};
