/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2022-06-30 15:43:04
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-30 15:47:04
 */
import React from 'react';
import style from './index.less';

const Forms = (props: any) => {
    return (
        <div className={style.form}>
            {props.children}
        </div>
    );
};

export default Forms;