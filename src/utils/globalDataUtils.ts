/*
 * @Descripttion: 全局页面资源存储
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-18 11:05:40
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-30 18:09:42
 */
import { history } from 'umi';
import { localGet } from '@/utils/local';

interface Dict {
  id: string;
  bowen_class: string;
  bowen_class_sub: string;
}

// 字典缓存
let globalDictList: Dict | null = {} as Dict;

// 获取字典信息缓存
export const getGlobalDict = (): Dict | null => {
  const str = localGet('dict');
  if (str) {
    globalDictList = str;
  } else {
    globalDictList = null;
  }
  return globalDictList;
};
// 根据type获取字典
export const getOnlyDictObj = (type: string): any[] | any => {
  const str = localGet('dict');
  let onlyDict: any = [];
  if (str) {
    onlyDict = str[type];
  } else {
    onlyDict = null;
  }
  return onlyDict;
};
// 根据type和id获取字典对象
export const getDictObj = (type: string, id: number | string): any[] | any => {
  const str = localGet('dict');
  let dictObj: any = {};
  if (str) {
    dictObj = str[type]?.find((v: any) => +v.id === +id);
  } else {
    dictObj = null;
  }
  return dictObj;
};
