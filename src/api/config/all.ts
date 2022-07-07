/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-27 15:32:24
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-07-07 10:05:17
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

// 获取cos的临时密钥
export const _getCosKeyTemporary = {
  url: '/adminApi/sts',
  method: 'get',
};

// 获取cos的密钥
export const _getCosKey = {
  url: '/adminApi/stsCosKey',
  method: 'get',
};
