/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-08 13:51:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-24 13:49:28
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Table, Image } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { calcTableScrollWidth, formatDate } from '@/utils/dataUtils';
import api from '@/api';
import style from './index.less';
import tableStyle from '@/table.less';

const { classify } = api;

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
  const columns: ColumnsType<DataType> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <Link to="">{text}</Link>
        </div>
      ),
    },
    {
      title: '一级类',
      dataIndex: 'classify',
      key: 'classify_id',
      width: 160,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '二级类',
      dataIndex: 'classify_sub',
      key: 'classify_sub_id',
      width: 160,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '内容简介',
      dataIndex: 'desc',
      key: 'desc',
      width: 300,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '文档类型',
      dataIndex: 'storage_type',
      key: 'storage_type',
      width: 100,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '发布时间',
      dataIndex: 'time_str',
      key: 'time_str',
      width: 220,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          {formatDate(text, 'yyyy-MM-dd HH:ss:mm')}
        </div>
      ),
    },
    {
      title: '最后修改时间',
      dataIndex: 'last_edit_time',
      key: 'last_edit_time',
      width: 220,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          {formatDate(text, 'yyyy-MM-dd HH:ss:mm')}
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
      title: '是否精选',
      dataIndex: 'selected',
      key: 'selected',
      width: 100,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author_id',
      width: 120,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      dataIndex: 'operation',
      width: 120,
      fixed: 'right',
      render: (text) => <div className={tableStyle.table_cell}>操作</div>,
    },
  ];

  const [list, setList] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getList = async () => {
    setLoading(true);
    await classify
      ._getClassifyList({ params: { author: '' } })
      .then(({ data }) => {
        setList(data.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={list}
      scroll={{
        scrollToFirstRowOnChange: true,
        x: calcTableScrollWidth(columns),
        y: `calc(100vh - 220px)`,
      }}
    />
  );
};

export default Classify;
