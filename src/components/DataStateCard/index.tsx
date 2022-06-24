/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2022-06-07 17:34:14
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-08 15:38:00
 */
import React from 'react';
import noResult from '../../../public/defaultGraph/noResult.png'
import empty from '../../../public/defaultGraph/empty.png'
import style from './index.less';

/**
 * @param type 
 * @returns 1 没有搜索结果
 */

const DataStateCard = (props: any) => {
    const selectImg = () => {
        switch(props.type){
            case 1:
                return noResult;

            default:
                return empty;
        }
    }
    return (
        <div className={style.dataStateCard}>
            <img src={selectImg()} style={props.style || null} alt="" />
        </div>
    );
};

export default DataStateCard;