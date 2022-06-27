/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-08 13:51:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-27 09:58:38
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Table, Image, Switch, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { calcTableScrollWidth, formatDate } from '@/utils/dataUtils';
import api from '@/api';
import style from './index.less';
import tableStyle from '@/table.less';

const { secret } = api;

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
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // 是否置顶事件
  const changeSwitch = async (val, id) => {
    await secret._changeSecretIsTop({ id, isTop: val }).then(({ data }) => {
      if (data.code === 200) {
        setList((v) =>
          v.map((item) => (item.id === id ? { ...item, isTop: val } : item)),
        );
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
    });
  };
  // 表格列
  const columns: ColumnsType<DataType> = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      fixed: 'left',
      width: 100,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '时间',
      dataIndex: 'time_str',
      key: 'time_str',
      width: 180,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          {formatDate(text, 'yyyy-MM-dd HH:ss:mm')}
        </div>
      ),
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: 280,
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
      title: '置顶',
      dataIndex: 'isTop',
      key: 'isTop',
      width: 100,
      render: (text, record) => (
        <div className={tableStyle.table_cell}>
          <Switch checked={text} onChange={(v) => changeSwitch(v, record.id)} />
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

  const getList = async () => {
    setLoading(true);
    await secret
      ._getSecretList({ params: { author: '', page, pageSize } })
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
      }}
      onChange={changeTable as any}
    />
  );
};

export default Classify;
