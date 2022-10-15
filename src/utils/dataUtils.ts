/*
 * @Descripttion: 此utils存放数据操作的方法
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-13 11:42:16
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-15 18:19:32
 */
import { message } from 'antd';
import { cloneDeep } from 'lodash';
import { defaultTableWidth } from '@/utils/defaultVariable';

/**
 * 将字符串中的\n \r\n 空格 替换为html可识别的代码
 * 在需要的标签上添加如下属性
 * dangerouslySetInnerHTML={{__html: str ? stringReplace(str) : '',}}
 * @param {string} str
 */
export const stringReplace = (str: string) => {
  let newStr = cloneDeep(str);

  //替换所有的换行符
  newStr = newStr.replace(/\\r\\n/g, '<br>');
  newStr = newStr.replace(/\\n/g, '<br>');

  //替换所有的空格（中文空格、英文空格都会被替换）
  newStr = newStr.replace(/\s/g, '&nbsp;');

  return newStr;
};

export const stringReplaceP = (str: string) => {
  let newStr = cloneDeep(str);

  //替换所有的空格（中文空格、英文空格都会被替换）
  newStr = newStr.replace(/\s/g, '&nbsp;');

  return newStr.split('\\n');
};

/**
 * 去掉所有的空格、回车换行符
 * @param {string} str
 */
export const stringRemove = (str: string) => {
  let newStr = cloneDeep(str);

  //替换所有的换行符
  newStr = newStr.replace(/\\r\\n/g, '');
  newStr = newStr.replace(/\\n/g, '');

  //替换所有的空格（中文空格、英文空格都会被替换）
  newStr = newStr.replace(/\s/g, '');

  return newStr;
};

/**
 * 阻止冒泡
 * @param {any} e
 */
export const stopPropagation = (e: any) => {
  e = e || window.event;
  if (e.stopPropagation) {
    // W3C阻止冒泡方法
    e.stopPropagation();
  } else {
    e.cancelBubble = true; // IE阻止冒泡方法
  }
};

/**
 * 跳转登录邮箱
 */
export const signInEmail = (email: string) => {
  // 邮箱域
  const hash = {
    'qq.com': 'http://mail.qq.com',
    'gmail.com': 'http://mail.google.com',
    'sina.com': 'http://mail.sina.com.cn',
    '163.com': 'http://mail.163.com',
    '126.com': 'http://mail.126.com',
    'yeah.net': 'http://www.yeah.net/',
    'sohu.com': 'http://mail.sohu.com/',
    'tom.com': 'http://mail.tom.com/',
    'sogou.com': 'http://mail.sogou.com/',
    '139.com': 'http://mail.10086.cn/',
    'hotmail.com': 'http://www.hotmail.com',
    'live.com': 'http://login.live.com/',
    'live.cn': 'http://login.live.cn/',
    'live.com.cn': 'http://login.live.com.cn',
    '189.com': 'http://webmail16.189.cn/webmail/',
    'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
    'yahoo.cn': 'http://mail.cn.yahoo.com/',
    'eyou.com': 'http://www.eyou.com/',
    '21cn.com': 'http://mail.21cn.com/',
    '188.com': 'http://www.188.com/',
    'foxmail.com': 'http://www.foxmail.com',
    'outlook.com': 'http://www.outlook.com',
  } as any;

  const _mail = email.split('@')[1]; //获取邮箱域

  const key = Object.keys(hash).find((item) => item === _mail);

  if (!key) return message.error('暂无该邮箱的跳转地址');

  window.open(hash[key]);
};

/**
 * 数组对象去重
 */
export const distinctObjectMap = (arr: any[], type: string) => {
  const res = new Map();
  // 使用map记录下每个item的id，已存在的id将不会被筛选入内
  return arr.filter(
    (item: any) => !res.has(item[type]) && res.set(item[type], 1),
  );
};

// 计算方法，num为当前的数  rate为进率  digit为保留的小数位
export const calculation = (num: number, rate: number, digit: number) => {
  return parseFloat(`${(Math.trunc(num) / rate).toFixed(digit)}`);
};

// 对数据进行分类处理，arr为要分类的数据  type为以什么属性分类
export const modifyData = (
  data: any[],
  type: string,
  isFlat: boolean = true,
) => {
  const newData = [] as any[];
  data.forEach((item, index) => {
    const ind = newData.findIndex((item1: any) => item1.type === item[type]);

    if (ind !== -1) {
      newData[ind].list.push(item);
    } else {
      newData.push({ id: index, type: item[type], list: [item] });
    }
  });

  if (isFlat) {
    return newData.map((item) => item.list).flat(Infinity);
  }

  return newData;
};

// 对旅行日记列表进行处理
export const itineraryData = (data: any[]) => {
  let newData = [] as any[];

  data
    .sort(
      (a, b) => +b.timeData.replace(/\//g, '') - +a.timeData.replace(/\//g, ''),
    )
    .forEach((item, index) => {
      const type = item['timeData'].split('/')[0];
      const ind = newData.findIndex((item1: any) => item1.type === type);

      const newItem = {
        ...item,
        imgs: item.imgs.map((v: any, i: number) => ({
          id: `${item.id}-${i}`,
          src: v,
        })),
      };

      if (ind !== -1) {
        newData[ind].list.push(newItem);
      } else {
        newData.push({ id: index, type, list: [newItem] });
      }
    });

  newData = newData.sort((a, b) => +b.type - +a.type);

  return newData;
};

// 对数据分组处理(处理图片地址字符串数组)
export const groupingData = (data: any[], num: number) => {
  const maxPage = Math.ceil(data.length / num);
  const newData = [] as any;

  if (!maxPage) return data;
  for (let i = 0; i < maxPage; i++) {
    newData.push({ id: i, list: data.slice(i * num, (i + 1) * num) });
  }

  return newData;
};

// 格式化时间
export const formatDate = (date: any, format: string) => {
  if (!date) return;
  if (!format) format = 'yyyy-MM-dd';
  switch (typeof date) {
    case 'string':
      date = new Date(date);
      break;
    case 'number':
      date = new Date(date);
      break;
  }
  if (!(date instanceof Date)) return;
  var dict = {
    yyyy: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    MM: ('' + (date.getMonth() + 101)).substr(1),
    dd: ('' + (date.getDate() + 100)).substr(1),
    HH: ('' + (date.getHours() + 100)).substr(1),
    mm: ('' + (date.getMinutes() + 100)).substr(1),
    ss: ('' + (date.getSeconds() + 100)).substr(1),
  };
  return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
    return dict[arguments[0]];
  });
};

// 计算table表格宽度
export const calcTableScrollWidth = (columns: any[]) => {
  return columns.reduce((i, t) => {
    return (i += t.width || defaultTableWidth);
  }, 0);
};

// 下载图片到本地
export const downloadImg = (blob, filename) => {
  const a = document.createElement('a'); // 创建一个a节点插入的document
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(a.href);
};

// 判断路径是否包含https或http  true包含 false不包含
export const IncludeHttp = (url: string) => {
  const reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  return reg.test(url);
};

/**
 * 导出 json 数据为 Excle 表格
 * @param {json} data 要导出的 json 数据
 * @param {String} head 表头, 可选 参数示例：'名字,邮箱,电话'
 * @param {*} name 导出的文件名, 可选
 */
export const jsonToExcel = (data, head, name = '导出的文件名') => {
  let str = head ? head + '\n' : '';
  data.forEach((item) => {
    // 拼接json数据, 增加 \t 为了不让表格显示科学计数法或者其他格式
    for (let key in item) {
      str = `${str + item[key] + '\t'},`;
    }
    str += '\n';
  });
  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
  // 通过创建a标签实现
  const link = document.createElement('a');
  link.href = uri;
  // 对下载的文件命名
  link.download = `${name + '.csv'}`;
  link.click();
};

// 读取上传文件的内容
export const handleUpload: any = (file, callback?) => {
  // 新建一个FileReader
  const reader = new FileReader();
  // 读取文件
  reader.readAsText(file, 'UTF-8');
  // 读取完文件之后会回来这里
  reader.onload = function (e) {
    // 读取文件内容
    const fileString = e?.target?.result;
    // 接下来可对文件内容进行处理
    callback && callback(fileString);
  };
};
