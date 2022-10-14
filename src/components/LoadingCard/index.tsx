/*
 * @Descripttion: 来源 https://www.cnblogs.com/lhb25/p/loading-spinners-animated-with-css3.html
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-27 10:53:29
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-14 13:17:40
 */
import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

const LoadingCard = () => {
  return (
    <div className={styles.loadingBox}>
      <Spin />
    </div>
  );
};

export default LoadingCard;
