/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:31:50
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-09-06 15:52:14
 */
/* eslint-disable */
import type {
  MenuDataItem,
  Settings as ProSettings,
} from '@ant-design/pro-layout';

export type Route = {
  routes?: Route[];
  authority?: string;
} & MenuDataItem;
