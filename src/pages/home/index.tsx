/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-06 10:12:01
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-08-17 17:32:21
 */
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { bindHandleScroll, removeScroll } from '@/utils/utils';
import DataCard from '@/components/DataCard';
import type { DataCardProps } from '@/components/DataCard';
import CalendarCom from '@/components/CalendarCom';
import AffairCard from './components/AffairCard';
import EchartsLine from './components/EchartsLine';
import style from './index.less';

const Home = () => {
  // 卡片信息列表
  const [cardList, setCardList] = useState<DataCardProps[]>([
    {
      number: 100,
      icon: 'icon-fuwu',
      title: '这是一个测试标题',
      isRise: true,
      proportion: '120%',
      subTitle: '同比收入',
      desc: '这是一段文字简介这是一段文字简介',
    },
    {
      number: 100,
      icon: 'icon-fuwu',
      title: '这是一个测试标题',
      isRise: false,
      proportion: '120%',
      subTitle: '同比收入',
      desc: '这是一段文字简介这是一段文字简介',
    },
    {
      number: 100,
      icon: 'icon-fuwu',
      title: '这是一个测试标题',
      isRise: true,
      proportion: '120%',
      subTitle: '同比收入',
      desc: '这是一段文字简介这是一段文字简介',
    },
    {
      number: 100,
      icon: 'icon-fuwu',
      title: '这是一个测试标题',
      isRise: false,
      proportion: '120%',
      subTitle: '同比收入',
      desc: '这是一段文字简介这是一段文字简介',
    },
  ]);

  useEffect(() => {
    bindHandleScroll();

    return () => {
      removeScroll();
    };
  }, []);

  return (
    <div className={style.home}>
      <div className={style.homeTop}>
        <div className={style.homeTopLeft}>面板数据及事务</div>
        <div className={style.homeTopRight}></div>
      </div>
      <Row gutter={[16, 16]} justify="space-between">
        {cardList.map((item: DataCardProps, index) => (
          <Col xs={24} md={12} xl={6} key={index}>
            <DataCard {...item} />
          </Col>
        ))}
        <Col xs={24} md={12} xl={16}>
          <EchartsLine />
        </Col>
        <Col xs={24} md={12} xl={8}>
          <CalendarCom />
        </Col>
        <Col xs={24} md={12} xl={12}>
          <CalendarCom />
        </Col>
        <Col xs={24} md={12} xl={12}>
          <AffairCard loading={false} affairList={[]} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
