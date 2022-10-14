/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-08-16 15:18:18
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-09 17:32:13
 */
import React from 'react';
import { isBoolean } from 'lodash';
import SysIcon from '@/components/SysIcon';
import style from './index.less';

export interface DataCardProps {
  icon: string; // 图标
  title: string; // 卡片标题
  number: string | number; // 数值
  isRise?: boolean | null; //  是否增长
  proportion?: string; // 比例
  subTitle?: string; // 比例描述
  desc?: string; // 描述
}

const DataCard = (props: DataCardProps) => {
  const {
    icon,
    number,
    title,
    isRise = null,
    desc,
    proportion,
    subTitle,
  } = props;
  return (
    <div className={style.card}>
      <div className={style.top}>
        <div className={style.top_left}>
          <div className={style.number}>{number}</div>
          <div className={style.title}>{title}</div>
        </div>
        <div className={style.top_icon}>
          <SysIcon type={icon} className={style.icon} />
        </div>
      </div>
      {isBoolean(isRise) && (
        <div className={style.proportion}>
          <div
            className={`${style.proportionNumber} ${
              isRise ? style.rise : style.fall
            }`}
          >
            {isRise ? '+' : '-'}
            {proportion}
          </div>
          <div className={style.proportionDesc}>{subTitle}</div>
        </div>
      )}
      {desc && <div className={style.desc}>{desc}</div>}
    </div>
  );
};

export default DataCard;
