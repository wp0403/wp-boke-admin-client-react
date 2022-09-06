/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-09-05 15:02:33
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-09-05 15:03:49
 */
// 列表接口
export const _getTimeAxisList = {
  url: '/adminApi/getTimeAxisList',
  method: 'get',
};

//编辑
export const _putTimeAxisDetails = {
  url: '/adminApi/putTimeAxisDetails',
  method: 'put',
};

//新增
export const _createTimeAxisDetails = {
  url: '/adminApi/createTimeAxisDetails',
  method: 'post',
};

// 修改审核状态
export const _putTimeAxisToExamine = {
  url: '/adminApi/putTimeAxisToExamine',
  method: 'put',
};

//删除
export const _deleteTimeAxisDetails = {
  url: '/adminApi/deleteTimeAxisDetails',
  method: 'delete',
};
