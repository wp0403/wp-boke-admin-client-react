/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-07-31 08:21:12
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-08-11 14:20:21
 */
import Axios from '../utils/httpAxios';
/*
 *  require.context(directory,useSubdirectories,regExp)
 *    1.directory:表示检索的目录
 *    2.useSubdirectories：表示是否检索子文件夹
 *    3.regExp:匹配文件的正则表达式,一般是文件名
 */
const dirdata = require.context('./config', true, /\.ts$/);

const res = dirdata.keys().reduce((val, item: any) => {
  //获取当前文件下的所有请求接口
  const apis = dirdata(item);
  //获取当前文件的名字
  const newSpaces = item.match(/\/(\w+)\.ts$/)[1];

  val[newSpaces] = Object.keys(apis).reduce((val, key) => {
    val[key] = (data: any = {}) => {
      if (data?.params !== {} && apis[key].method === 'get') {
        return Axios({ ...apis[key], params: data?.params });
      } else {
        return Axios({ ...apis[key], data });
      }
    };
    return val;
  }, {});
  return val;
}, {});
// 最后抛出的是一个对象，键名为文件名，值又为一个对象，这个对象的键名为方法名，键值
export default res as any;
