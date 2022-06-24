/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:31:50
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-12-31 13:24:09
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
