/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-27 15:32:24
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-09 17:39:32
 */
// 获取公网ip
export const _getIp = {
  url: '/adminApi/getIp',
  method: 'get',
};

// 获取登陆信息
export const _getLogin = {
  url: '/adminApi/login',
  method: 'post',
};

// 获取字典列表
export const _getDictList = {
  url: '/adminApi/getDictList',
  method: 'get',
};
