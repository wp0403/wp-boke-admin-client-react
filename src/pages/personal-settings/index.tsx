/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-15 00:39:18
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-15 00:57:16
 */
import React from 'react';
import { Tabs } from 'antd';
import BasicSettings from './components/BasicSettings';
import SecuritySettings from './components/SecuritySettings';
import NoticeSettings from './components/NoticeSettings';
import style from './index.less';

const PersonalSettings = () => {
  return (
    <div className={style.settings}>
      <Tabs
        tabPosition="left"
        items={[
          {
            label: `基本设置`,
            key: 'article',
            children: <BasicSettings />,
          },
          {
            label: `安全设置`,
            key: 'diary',
            children: <SecuritySettings />,
          },
          {
            label: `通知管理`,
            key: 'project',
            children: <NoticeSettings />,
          },
        ]}
      />
    </div>
  );
};

export default PersonalSettings;
