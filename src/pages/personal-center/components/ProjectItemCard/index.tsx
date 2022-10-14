/*
 * @Descripttion: 项目卡片
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-14 10:35:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-14 15:22:45
 */
import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { Link } from 'umi';
import SysIcon from '@/components/SysIcon';
import style from './index.less';

type Props = {
  item: any;
};

const ProjectItemCard = (props: Props) => {
  const { item } = props;
  return (
    <div className={style.project}>
      <div className={style.content}>
        <div className={style.img}>
          <img src={item?.img} alt={item?.name} />
        </div>
        <div className={style.detail}>
          <Link
            className={style.name}
            rel="noopener noreferrer"
            to={`/classify/${item?.id}/details`}
          >
            {item?.name}
          </Link>
          <div className={style.desc}>{item?.desc}</div>
          <div className={style.footer}>
            <div className={style.time}>{item?.date}</div>
            <div className={style.user_list}>
              <Avatar.Group maxCount={3} maxPopoverTrigger="click" size="small">
                {item?.user_list?.map((v) => (
                  <Avatar src={v?.img} />
                ))}
              </Avatar.Group>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItemCard;
