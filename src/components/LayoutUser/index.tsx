/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-08 11:11:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-08-12 11:37:20
 */
import React from 'react';
import { Avatar, Image } from 'antd';
import SysIcon from '@/components/SysIcon';
import style from './index.less';

const LayoutUser = () => {
  return (
    <div className={style.layoutUser}>
      <SysIcon className={style.tuichu} type="icon-a-tixinglingdang" />
      <div>
        <Avatar src="https://joeschmoe.io/api/v1/random" />
        <div></div>
      </div>
      <SysIcon className={style.tuichu} type="icon-a-tuichuzhuxiao" />
    </div>
  );
};

export default LayoutUser;
