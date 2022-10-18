/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-07-06 11:54:44
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-17 15:19:35
 */
// 根据关键字获取用户列表
export const _searchUserList = {
  url: '/adminApi/searchUserList',
  method: 'get',
};

// 获取用户列表
export const _getUserList = {
  url: '/adminApi/getUserList',
  method: 'get',
};

// 修改用户状态
export const _putUserToExamine = {
  url: '/adminApi/putUserToExamine',
  method: 'put',
};

// 修改用户角色
export const _putUserState = {
  url: '/adminApi/putUserState',
  method: 'put',
};

// 根据用户id获取详情信息
export const _getUserDetails = {
  url: '/adminApi/getUserDetails',
  method: 'get',
};

// 更新用户信息
export const _putUserDetails = {
  url: '/adminApi/putUserDetails',
  method: 'put',
};
