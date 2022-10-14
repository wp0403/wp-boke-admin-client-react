/*
 * @Descripttion: 旅行日记卡片
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-14 11:13:08
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-14 15:55:37
 */
import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'umi';
import SysIcon from '@/components/SysIcon';
import DictSysIcon from '@/components/DictSysIcon';
import style from './index.less';

type Props = {
  item: any;
};

const DiaryItemCard = (props: Props) => {
  const { item } = props;
  return (
    <div className={style.diary}>
      <Row gutter={[16, 16]} justify="space-between">
        <Col xs={24} md={24} xl={8}>
          <div className={style.left}>
            <img src={item?.img} alt={item?.title} />
          </div>
        </Col>
        <Col xs={24} md={24} xl={16}>
          <div className={style.right}>
            <Link
              className={style.title}
              rel="noopener noreferrer"
              to={`/classify/${item?.id}/details`}
            >
              {item?.title}
            </Link>
            <div className={style.info}>
              <div className={style.info_item}>
                <SysIcon
                  className={style.icon1}
                  type="icon-a-dingweiweizhiditu"
                />
                <div className={style.text}>{item?.place}</div>
              </div>
              <div className={style.border} />
              <DictSysIcon code="weather_list" id={item?.weather} />
              <div className={style.border} />
              <DictSysIcon code="mood_list" id={item?.mood} />
            </div>
            <div className={style.desc}>{item?.desc}</div>
            <div className={style.time}>{item?.date}</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DiaryItemCard;
