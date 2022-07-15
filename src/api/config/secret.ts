/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-21 15:29:33
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-07-15 10:12:29
 */

// 树洞列表接口
export const _getSecretList = {
  url: '/adminApi/getSecretList',
  method: 'get',
};

// 树洞置顶修改接口
export const _changeSecretIsTop = {
  url: '/adminApi/changeSecretIsTop',
  method: 'put',
};

// 树洞删除和恢复接口
export const _delSecretList = {
  url: '/adminApi/delSecretList',
  method: 'put',
};

//编辑树洞详情
export const _putSecretDetails = {
  url: '/adminApi/putSecretDetails',
  method: 'put',
};

//新增树洞
export const _createSecretDetails = {
  url: '/adminApi/createSecretDetails',
  method: 'post',
};

// 修改树洞审核状态
export const _putSecretToExamine = {
  url: '/adminApi/putSecretToExamine',
  method: 'put',
};
