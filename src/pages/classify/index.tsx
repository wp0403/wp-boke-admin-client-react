/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-08 13:51:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-07-12 17:40:13
 */
import React, { useState, useEffect } from 'react';
import { Link, history } from 'umi';
import {
  Table,
  Image,
  Tooltip,
  message,
  Switch,
  Button,
  Popconfirm,
} from 'antd';
import { DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import type { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { calcTableScrollWidth, formatDate } from '@/utils/dataUtils';
import { getDictObj } from '@/utils/globalDataUtils';
import api from '@/api';
import style from './index.less';
import tableStyle from '@/table.less';
import SysIcon from '@/components/SysIcon';

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
  isDelete: boolean;
}

const Classify = (props: any) => {
  // 是否精选事件
  const changeSwitch = async (val, id) => {
    await classify
      ._changeClassifySelected({ id, selected: val })
      .then(({ data }) => {
        if (data.code === 200) {
          setList((v) =>
            v.map((item) =>
              item.id === id ? { ...item, selected: val } : item,
            ),
          );
          message.success(data.msg);
        } else {
          message.error(data.msg);
        }
      });
  };
  // 删除/恢复 博文事件
  const delBowenObj = async (val, id) => {
    await classify._delBowenList({ id, isDelete: !val }).then(({ data }) => {
      if (data.code === 200) {
        setList((v) =>
          v
            .map((item) =>
              item.id === id ? { ...item, isDelete: !val } : item,
            )
            .filter((item) => (+type === 2 ? item.isDelete : !item.isDelete)),
        );
        message.success(data.msg);
        +type === 2
          ? setTotal((v) => (val ? (v -= 1) : (v += 1)))
          : setTotal((v) => (val ? (v += 1) : (v -= 1)));
      } else {
        message.error(data.msg);
      }
    });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      render: (text, record) => (
        <div className={tableStyle.table_cell}>
          <Tooltip placement="topLeft" title={text}>
            <Link
              target="_blank"
              style={{ cursor: 'pointer' }}
              to={`/classify/${record.id}/details`}
            >
              {text}
            </Link>
          </Tooltip>
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
      title: '博文状态',
      dataIndex: 'type',
      key: 'type',
      width: 160,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <SysIcon
            type={getDictObj('bowen_type', text)?.icon}
            style={{ marginRight: '10px' }}
          />
          <span
            className={
              text === 1
                ? style.bowenType1
                : text === 2
                ? style.bowenType2
                : text === 3
                ? style.bowenType3
                : ''
            }
          >
            {getDictObj('bowen_type', text)?.value}
          </span>
        </div>
      ),
    },
    {
      title: '内容简介',
      dataIndex: 'desc',
      key: 'desc',
      width: 300,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        </div>
      ),
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
      render: (text, record) => (
        <div className={tableStyle.table_cell}>
          <Switch checked={text} onChange={(v) => changeSwitch(v, record.id)} />
        </div>
      ),
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author_id',
      width: 120,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 120,
      fixed: 'right',
      render: (text, record) => (
        <div className={tableStyle.table_cell_flex}>
          {+type === 2 ? (
            <Tooltip placement="topRight" title="点击后将恢复到列表中">
              <UndoOutlined
                className={style.btn_huifu}
                onClick={() => delBowenObj(record.isDelete, record.id)}
              />
            </Tooltip>
          ) : (
            <Popconfirm
              title="真的要删除吗？删除后将不能在网站查看。"
              onConfirm={() => delBowenObj(record.isDelete, record.id)}
              okText="确定"
              cancelText="取消"
              placement="topRight"
            >
              <DeleteOutlined className={style.btn_remove} />
            </Popconfirm>
          )}
          {+type === 2 && (
            <Popconfirm
              title="将彻底删除该条数据，不可恢复，要继续吗？"
              onConfirm={() => delBowenObj(record.isDelete, record.id)}
              okText="确定"
              cancelText="取消"
              placement="topRight"
            >
              <DeleteOutlined className={style.btn_remove} />
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  const { type } = props.location.query as any;
  const [list, setList] = useState<DataType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  // 请求列表数据事件
  const getList = async (obj?) => {
    setLoading(true);
    await classify
      ._getClassifyList({
        params: { isDelete: +type === 2 ? 0 : 1, page, pageSize },
      })
      .then(({ data }) => {
        if (data.code === 200) {
          setList(data.data);
          setTotal(data.meta.total);
        }
      })
      .finally(() => setLoading(false));
  };
  // 表格的change事件
  const handleTableChange = (
    { current, pageSize },
    selectedRows,
    info: { type },
  ) => {
    setPage(current);
    setPageSize(pageSize);
  };
  // 跳转页面事件
  const changePageType = () => {
    setPage(1);
    if (+type === 2) {
      history.replace('/classify/list');
    } else {
      history.replace('/classify/list?type=2');
    }
  };

  // 初始化列表
  useEffect(() => {
    getList();
  }, [type, page, pageSize]);

  return (
    <div className={style.classify}>
      <div className={style.headerBox}>
        <div className={style.headerBox_left}>
          <span className={style.page_title}>
            博文{+type === 2 ? '回收站' : '列表页'}
          </span>{' '}
          <span className={style.page_total}>{total}</span>
        </div>
        <div className={style.headerBox_right}>
          <Button
            type="primary"
            shape="round"
            className={style.headerBox_right_btn}
            href="/classify/add-bowen"
          >
            新增博文
          </Button>
          <Button
            type="primary"
            shape="round"
            onClick={changePageType}
            className={
              +type === 2
                ? style.headerBox_right_btn
                : style.headerBox_right_btn1
            }
          >
            {+type === 2 ? '列表页' : '回收站'}
          </Button>
        </div>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={list}
        rowKey={'id'}
        scroll={{
          scrollToFirstRowOnChange: true,
          x: calcTableScrollWidth(columns),
          y: `calc(100vh - 280px)`,
        }}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
        }}
        onChange={handleTableChange as any}
      />
    </div>
  );
};

export default Classify;
