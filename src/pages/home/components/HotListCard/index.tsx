/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-08-18 11:53:36
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-13 23:29:49
 */
import React from 'react';
import noContent from '/public/defaultGraph/noContent.svg';
import EmptyCard from '@/components/EmptyCard';
import LoadingCard from '@/components/LoadingCard';
import style from './index.less';

export interface HotListCardProps {
  hotList: any[];
  loading: boolean;
}

const HotListCard = (props: HotListCardProps) => {
  const { loading, hotList } = props;
  return (
    <div className={style.hostListCard}>
      <div className={style.title}>最新发布</div>
      <div className={style.content}>
        {loading ? (
          <LoadingCard />
        ) : hotList && hotList.length ? (
          hotList.map((item) => <div>{item}</div>)
        ) : (
          <EmptyCard src={noContent} />
        )}
      </div>
    </div>
  );
};

export default HotListCard;
