/*
 * @Descripttion: 全局页面资源存储
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-18 11:05:40
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-09 17:39:52
 */
import { history } from 'umi';
import api from '@/api';

const { all } = api;

export interface UserDate {
  id: string;
  bokePath: string;
  userName: string;
  title: string;
  desc: string;
  qq: string;
  weixin: string;
  email: string;
  about: string;
  aboutTags: string;
  secret_guide: string;
  about_page: string;
}

interface Dict {
  id: string;
  bowen_class: string;
  bowen_class_sub: string;
}

// 全局博主信息储存
let globalUserDate: UserDate | null = {} as UserDate;
// 字典缓存
let globalDictList: Dict | null = {} as Dict;

// 设置博主信息缓存
export const setGlobalUserDate = (globalUserDate: UserDate | null) => {
  sessionStorage.setItem('userDate', JSON.stringify(globalUserDate));
};
// 设置字典信息缓存
export const setGlobalDict = (globalDictList: Dict | null) => {
  sessionStorage.setItem('dict', JSON.stringify(globalDictList));
};

// 获取博主信息缓存
export const getGlobalUserData = (): UserDate | null => {
  const str = sessionStorage.getItem('userDate');
  if (str) {
    globalUserDate = JSON.parse(str);
  } else {
    globalUserDate = null;
  }
  return globalUserDate;
};
// 获取字典信息缓存
export const getGlobalDict = (): Dict | null => {
  const str = sessionStorage.getItem('dict');
  if (str) {
    globalDictList = JSON.parse(str);
  } else {
    globalDictList = null;
  }
  return globalDictList;
};
// 根据type获取字典
export const getOnlyDictObj = (type: string): any[] | any => {
  const str = sessionStorage.getItem('dict');
  let onlyDict: any = [];
  if (str) {
    onlyDict = JSON.parse(str)[type];
  } else {
    onlyDict = null;
  }
  return onlyDict;
};
// 根据type和id获取字典对象
export const getDictObj = (type: string, id: number): any[] | any => {
  const str = sessionStorage.getItem('dict');
  let dictObj: any = {};
  if (str) {
    dictObj = JSON.parse(str)[type]?.find((v: any) => v.id === id);
  } else {
    dictObj = null;
  }
  return dictObj;
};

// 判断是否需要重新获取
export const isFlagGetGlobalData = () => {
  const list = [getGlobalUserData()];

  return list.every((item) => item);
};

// 初始化获取全局资源
export const initGlobalData = async (obj: any) => {
  const { id = null, fun } = obj;
  await all._getLogin({ params: { id } }).then((res: any) => {
    if (res.data.code === 200) {
      globalUserDate = res.data?.data;
    }
    setGlobalUserDate(globalUserDate);
  });
  await all._getDictList({ params: { id } }).then((res: any) => {
    if (res.data.code === 200) {
      globalDictList = res.data.data;
    }
    setGlobalDict(globalDictList);
  });
  await fun(true);
};
