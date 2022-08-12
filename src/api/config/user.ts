/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-07-06 11:54:44
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-08-11 15:36:39
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
