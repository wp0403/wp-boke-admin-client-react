/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 09:59:41
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-07-06 10:50:44
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
};
// 博文删除和恢复接口
export const _delBowenList = {
  url: '/adminApi/delBowenList',
  method: 'put',
};
//获取博文详情
export const _getClassifyDetails = {
  url: '/adminApi/getClassifyDetails',
  method: 'get',
};

//编辑博文详情
export const _putClassifyDetails = {
  url: '/adminApi/putClassifyDetails',
  method: 'put',
};

//新增博文
export const _createClassifyDetails = {
  url: '/adminApi/createClassifyDetails',
  method: 'post',
};
