/*
 * @Descripttion: 此utils存放项目全局通用的事件和组件函数
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-13 11:29:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-06 17:00:16
 */

// 页面背景盒子
let bgDom: any = null;
// 全局滚动的盒子
export let layoutContent: any = null;
// 全局导航盒子
export let layoutNav: any = null;
// 当前的主题
export let theme: boolean = false;

// 初始化获取全局元素
export const getLayoutDom = () => {
  bgDom = document.getElementById('layout_bg');
  layoutContent = document.getElementById('pro_layout_content');
  layoutNav = document.getElementById('layout_nav');
};

// 重置全局导航的样式
export const removeLayoutNavStyle = () => {
  if (!layoutNav) return;
  layoutNav?.classList.remove('nav_active');
};

// 设置全局导航样式
export const addLayoutNavStyle = () => {
  if (!layoutNav) return;
  layoutNav?.classList.add('nav_active');
};

// 获取当前的主题
export const getTheme = () => {
  theme = document.documentElement.classList.contains('dark');
};
