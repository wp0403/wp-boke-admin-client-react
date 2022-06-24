/*
 * @Descripttion: 来源 https://www.cnblogs.com/lhb25/p/loading-spinners-animated-with-css3.html
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-27 10:53:29
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-27 11:06:28
 */
import React from 'react';
import styles from './index.less';

const LoadingCard = () => {
  return (
    <div className={styles.loadingBox}>
      <div className={styles.spinner}>
        <div className={styles.double_bounce1}></div>
        <div className={styles.double_bounce2}></div>
      </div>
    </div>
  );
};

export default LoadingCard;
