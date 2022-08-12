/*
 * @Descripttion: 此utils进行axios二次封装
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-13 11:29:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-08-11 15:42:55
 */

import axios from 'axios';
import { message } from 'antd';
import { history } from 'umi';
import { localGet, localSet } from './local';

const httpAxios = axios.create();

// 添加请求拦截器
httpAxios.interceptors.request.use(
  function (config: any) {
    // 在发送请求之前做些什么
    if (localGet('token')) {
      config.headers['authorization'] = localGet('token'); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
httpAxios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // 判断是否存在响应头authorization，存在则跟新token
    response.headers['authorization'] &&
      localSet('token', response.headers['authorization']);
    return response;
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          message.error('请求错误');
          break;

        case 401:
          message.error('未授权，请登录');
          history.push('/login');
          break;

        case 402:
          message.error('登陆状态已过期');
          history.push('/login');
          break;

        case 403:
          message.error('拒绝访问');
          break;

        case 404:
          message.error(`请求地址出错: ${err.response.config.url}`);
          break;

        case 408:
          message.error('请求超时');
          break;

        case 500:
          message.error('服务器内部错误，请联系管理员');
          break;

        case 501:
          message.error('服务未实现');
          break;

        case 502:
          message.error('网关错误');
          break;

        case 503:
          message.error('服务不可用');
          break;

        case 504:
          message.error('网关超时');
          break;

        case 505:
          message.error('HTTP版本不受支持');
          break;

        default:
      }
    }
    return Promise.reject(err);
  },
);

export default httpAxios;
