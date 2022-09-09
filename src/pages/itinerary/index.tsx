/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-08 13:51:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-09-09 15:03:20
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Table, Image } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { calcTableScrollWidth, formatDate } from '@/utils/dataUtils';
import api from '@/api';
import tableStyle from '@/table.less';
import style from './index.less';

const { itinerary } = api;

interface DataType {
  id: string;
  time_str: string;
  last_edit_time: string;
  img: string;
  author: string;
  author_id: string;
  classify: string;
  classify_id: string;
  classify_sub: string;
  classify_sub_id: string;
  title: string;
  desc: string;
  content: string;
  storage_type: string;
  selected: string;
}

const Classify = () => {
  const [visible, setVisible] = useState(false);
  const [imgsId, setImgsId] = useState('');
  const columns: ColumnsType<DataType> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      width: 160,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <Link to="">{text}</Link>
        </div>
      ),
    },
    {
      title: '列表图片',
      dataIndex: 'img',
      key: 'img',
      width: 100,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <Image className={style.img_list} src={text} />
        </div>
      ),
    },
    {
      title: '时间',
      dataIndex: 'timeData',
      key: 'timeData',
      width: 160,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          {formatDate(text, 'yyyy-MM-dd')}
        </div>
      ),
    },
    {
      title: '地点',
      dataIndex: 'place',
      key: 'place',
      width: 160,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '天气',
      dataIndex: 'weatherId',
      key: 'weatherId',
      width: 100,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '心情',
      dataIndex: 'moodId',
      key: 'moodId',
      width: 100,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },

    {
      title: '图片列表',
      dataIndex: 'imgs',
      key: 'imgs',
      width: 100,
      render: (text, record) => (
        <div className={tableStyle.table_cell}>
          <Image
            className={style.img_list}
            preview={false}
            src={text[0] || record.img}
            onClick={() => {
              setVisible(true);
              setImgsId(record.id);
            }}
          />
          <div style={{ display: 'none' }}>
            <Image.PreviewGroup
              preview={{
                visible: record.id === imgsId && visible,
                onVisibleChange: (vis) => setVisible(vis),
              }}
            >
              {Array.isArray(text) &&
                text.map((item, ind) => <Image src={item} key={ind} />)}
            </Image.PreviewGroup>
          </div>
        </div>
      ),
    },
    {
      dataIndex: 'operation',
      width: 120,
      fixed: 'right',
      render: (text) => <div className={tableStyle.table_cell}>操作</div>,
    },
  ];

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getList = async () => {
    setLoading(true);
    await itinerary
      ._getItineraryList({ params: { title: '' } })
      .then(({ data }) => {
        setList(data.data);
        setTotal(data.meta.total);
      })
      .finally(() => setLoading(false));
  };

  const changeTable = ({ current, pageSize }, selectedRows, info: { type }) => {
    setPage(current);
    setPageSize(pageSize);
  };

  useEffect(() => {
    getList();
  }, [page, pageSize]);

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={list}
      rowKey={'id'}
      scroll={{
        scrollToFirstRowOnChange: true,
        x: calcTableScrollWidth(columns),
        y: `calc(100vh - 220px)`,
      }}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: total,
        showTitle: false,
      }}
      onChange={changeTable as any}
    />
  );
};

export default Classify;
