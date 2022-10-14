/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-27 12:05:05
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-13 23:27:59
 */
import React from 'react';
import empty from '/public/defaultGraph/empty.svg';
import styles from './index.less';

const EmptyCard = (props: any) => {
  const { src } = props;
  return (
    <div className={styles.emptyCard}>
      <img src={src || empty} alt="" />
    </div>
  );
};

export default EmptyCard;
