/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-06 18:16:59
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-08 16:08:11
 */
import React from 'react';
import { Select, Collapse } from 'antd';
import DataEmptyCard from '@/components/DataEmptyCard';
import { modifyData } from '@/utils/dataUtils';
import style from './index.less';

const { Panel } = Collapse;

const list = [
  {
    id: 1,
    type: '博文',
    title: '这是一个博文标题',
  },
  {
    id: 2,
    type: '博文',
    title: '这是一个博文标题1',
  },
  {
    id: 3,
    type: '博文',
    title: '这是一个博文标题2',
  },
  {
    id: 4,
    type: '博文',
    title: '这是一个博文标题3',
  },
  {
    id: 1,
    type: '旅行日记',
    title: '这是一个旅行日记标题',
  },
  {
    id: 2,
    type: '旅行日记',
    title: '这是一个旅行日记标题1',
  },
  {
    id: 3,
    type: '旅行日记',
    title: '这是一个旅行日记标题2',
  },
  {
    id: 4,
    type: '旅行日记',
    title: '这是一个旅行日记标题3',
  },
  {
    id: 2,
    type: '树洞',
    title: '这是一个树洞标题1',
  },
  {
    id: 3,
    type: '树洞',
    title: '这是一个树洞标题2',
  },
  {
    id: 4,
    type: '树洞',
    title: '这是一个树洞标题3',
  },
];

const ProLayoutSearch = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const renderSelectList = () => {
    if (!list || !list.length) {
      return (
        <div className={style.layoutSearch_options}>
          <DataEmptyCard style={{ width: '100px' }} type={1} />
        </div>
      );
    }
    const options = modifyData(list, 'type', false);

    return (
      <div className={style.layoutSearch_options}>
        <Collapse accordion>
          {options.map((item) => (
            <Panel header={item.type} key={item.id}>
              {item.list.map((ite: any) => (
                <div key={ite.id}>{ite.title}</div>
              ))}
            </Panel>
          ))}
        </Collapse>
      </div>
    );
  };

  return (
    <div className={style.pro_layout_search}>
      <div className={style.search_box}>
        <Select
          showSearch
          placeholder="输入关键字进行搜索"
          style={{ width: '100%' }}
          onChange={handleChange}
          dropdownRender={renderSelectList}
        />
      </div>
    </div>
  );
};

export default ProLayoutSearch;
