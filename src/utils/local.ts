/*
 * @Descripttion: 本地存储方法集
 * @version:
 * @Author: WangPeng
 * @Date: 2022-04-06 10:45:51
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-17 15:42:24
 */
// 获取本地存储
export function localGet(key: string) {
  const value = window.localStorage.getItem(key) as any;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}
// 设置本地存储
export function localSet(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
// 删除本地存储
export function localRemove(key: string) {
  window.localStorage.removeItem(key);
}

// 获取本地存储
export function sessionGet(key: string) {
  const value = window.sessionStorage.getItem(key) as any;

  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}
// 设置本地存储
export function sessionSet(key: string, value: any) {
  window.sessionStorage.setItem(key, JSON.stringify(value));
}
// 删除本地存储
export function sessionRemove(key: string) {
  window.sessionStorage.removeItem(key);
}
