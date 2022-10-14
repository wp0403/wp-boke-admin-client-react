/*
 * @Descripttion: 文章卡片
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-14 10:34:10
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-14 13:10:57
 */
import React from 'react';
import { Link } from 'umi';
import SysIcon from '@/components/SysIcon';
import style from './index.less';

type Props = {
  item: any;
};

const ArticleItemCard = (props: Props) => {
  const { item } = props;
  return (
    <div className={style.article}>
      <Link
        className={style.title}
        rel="noopener noreferrer"
        to={`/classify/${item?.id}/details`}
      >
        {item?.title}
      </Link>
      <div className={style.classify}>
        <div className={style.classify_card}>
          {item?.classify}|{item?.classify_sub}
        </div>
      </div>
      <div className={style.desc}>{item?.desc}</div>
      <div className={style.time}>{item?.date}</div>
      <div className={style.footer}>
        <div className={style.footer_item}>
          <SysIcon className={style.icon} type="icon-a-yanjingxianshi" />
          <div className={style.number}>{item?.views || 0}</div>
        </div>
        <div className={style.border} />
        <div className={style.footer_item}>
          <SysIcon
            className={style.icon}
            type="icon-a-duihuaduanxinxinxiliaotian"
          />
          <div className={style.number}>{item?.comment || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleItemCard;
