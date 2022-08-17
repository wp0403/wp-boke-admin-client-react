/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-08-17 16:06:12
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-08-17 17:03:11
 */
import React from 'react';
import { Calendar } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import style from './index.less';

export interface CalendarComProps {}

const CalendarCom = (Props: CalendarComProps) => {
  return (
    <div className={style.calendarCom}>
      <Calendar />
    </div>
  );
};

export default CalendarCom;
