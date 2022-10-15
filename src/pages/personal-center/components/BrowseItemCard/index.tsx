/*
 * @Descripttion: 浏览历史卡片
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-14 10:38:59
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-15 00:22:50
 */
import React from 'react';
import style from './index.less';

type Props = {
  item: any;
};

const BrowseItemCard = (props: Props) => {
  const { item } = props;
  return (
    <div className={style.browse}>
      <div className={style.left} />
      <div className={style.right}>
        <div className={style.type}>{item?.type}</div>
        <div className={style.name}>{item?.name}</div>
        <div className={style.time}>{item?.date}</div>
      </div>
    </div>
  );
};

export default BrowseItemCard;
