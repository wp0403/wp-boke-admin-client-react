/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 09:59:41
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-27 16:37:33
 */
//获取博文列表
export const _getClassifyList = {
  url: '/adminApi/getClassifyList',
  method: 'get',
};
// 博文精选修改接口
export const _changeClassifySelected = {
  url: '/adminApi/changeClassifySelected',
  method: 'put',
}
// 博文删除和恢复接口
export const _delBowenList = {
  url: '/adminApi/delBowenList',
  method: 'put',
}
//获取博文详情
export const _getClassifyDetails = {
  url: '/adminApi/getClassifyDetails',
  method: 'get',
};
