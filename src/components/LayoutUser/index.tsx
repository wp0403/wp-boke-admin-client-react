/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2022-06-08 11:11:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-08 11:20:35
 */
import React from 'react';
import { Avatar, Image } from 'antd';
import style from './index.less';

const LayoutUser = () => {
    return (
        <div className={style.layoutUser}>
            <div>消息</div>
            <div>
                <Avatar src="https://joeschmoe.io/api/v1/random" />
                <div>

                </div>
            </div>
            <div>退出</div>
        </div>
    );
};

export default LayoutUser;