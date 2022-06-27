/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 09:59:41
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-27 13:29:58
 */
//获取博文列表
export const _getClassifyList = {
  url: '/api/getClassifyList',
  method: 'get',
};
// 博文精选修改接口
export const _changeClassifySelected = {
  url: '/api/changeClassifySelected',
  method: 'put',
}
// 博文删除和恢复接口
export const _delBowenList = {
  url: '/api/delBowenList',
  method: 'put',
}
//获取博文详情
export const _getClassifyDetails = {
  url: '/api/getClassifyDetails',
  method: 'get',
};
