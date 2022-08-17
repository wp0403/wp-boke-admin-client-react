/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-08-17 16:37:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-08-17 16:56:16
 */
import React from 'react';
import noContent from '/public/defaultGraph/noContent.svg';
import EmptyCard from '@/components/EmptyCard';
import LoadingCard from '@/components/LoadingCard';
import style from './index.less';

export interface AffairProps {
  affairList: any[];
  loading: boolean;
}

const AffairCard = (props: AffairProps) => {
  const { loading, affairList } = props;

  return (
    <div className={style.affair}>
      <div className={style.title}>事务列表</div>
      <div className={style.content}>
        {loading ? (
          <LoadingCard />
        ) : affairList && affairList.length ? (
          affairList.map((item) => <div>{item}</div>)
        ) : (
          <EmptyCard src={noContent} />
        )}
      </div>
    </div>
  );
};

export default AffairCard;
