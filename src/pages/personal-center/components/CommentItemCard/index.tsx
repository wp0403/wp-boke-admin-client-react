/*
 * @Descripttion: 评论卡片
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-14 10:34:53
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-14 18:20:37
 */
import React from 'react';
import { Link } from 'umi';
import { Avatar } from 'antd';
import style from './index.less';

type Props = {
  item: any;
};

const CommentItemCard = (props: Props) => {
  const { item } = props;
  return (
    <div className={style.comment}>
      <div className={style.article}>
        <Link
          className={style.title}
          rel="noopener noreferrer"
          to={`/classify/${item?.id}/details`}
        >
          {item?.name}
        </Link>
        <div className={style.author}>
          <Avatar
            src={item?.author?.img}
            alt={item?.author?.name}
            size="small"
          />
          <div className={style.username}>{item?.author?.name}</div>
        </div>
      </div>
      <div className={style.comment_box}>
        <div className={style.comment_user}>
          <Avatar
            src={item?.comment_author?.img}
            alt={item?.comment_author?.name}
            size="small"
          />
          <div className={style.username}>{item?.comment_author?.name}</div>
        </div>
        <div className={style.comment_content}>{item?.content}</div>
        <div className={style.time}>{item?.date}</div>
      </div>
    </div>
  );
};

export default CommentItemCard;
