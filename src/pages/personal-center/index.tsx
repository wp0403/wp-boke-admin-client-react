/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-09 11:14:42
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-14 09:59:08
 */
import React from 'react';
import { Row, Col } from 'antd';
import UserDetail from './components/UserDetail';
import UserTab from './components/UserTab';
import style from './index.less';

const PersonalCenter = () => {
  return (
    <div className={style.personal_center}>
      <Row gutter={[16, 16]} justify="space-between">
        <Col xs={24} md={10} xl={7}>
          <UserDetail />
        </Col>
        <Col xs={24} md={14} xl={17}>
          <UserTab />
        </Col>
      </Row>
    </div>
  );
};

export default PersonalCenter;
