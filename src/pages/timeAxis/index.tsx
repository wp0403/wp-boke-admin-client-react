/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-08 13:51:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-09-08 12:39:29
 */
import React, { useState, useEffect, useRef } from 'react';
import { Table, Tooltip, message, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { calcTableScrollWidth, formatDate } from '@/utils/dataUtils';
import api from '@/api';
import SysIcon from '@/components/SysIcon';
import { getDictObj } from '@/utils/globalDataUtils';
import ToExamineModal from '@/components/ToExamineModal';
import tableStyle from '@/table.less';
import SecretModal from './modal';
import style from './index.less';

const { timeAxis } = api;

interface DataType {
  id: string;
  type: number;
  create_time: string;
  update_time: string;
  title: string;
  content: string;
}

const Classify = (props: any) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 弹窗抛出的事件
  const modalRef = useRef();
  const toExamineModal = useRef();

  // 获取树洞列表
  const getList = async () => {
    setLoading(true);
    await timeAxis
      ._getTimeAxisList({
        params: { page, pageSize },
      })
      .then(({ data }) => {
        setList(data.data);
        setTotal(data.meta.total);
      })
      .finally(() => setLoading(false));
  };

  // 表格筛选和分页事件
  const changeTable = ({ current, pageSize }, selectedRows, info: { type }) => {
    setPage(current);
    setPageSize(pageSize);
  };

  // 删除
  const deleteTimeAxisObj = async (id) => {
    await timeAxis._deleteTimeAxisDetails({ id }).then(({ data }) => {
      if (data.code === 200) {
        setList((v) => v.filter((item) => item.id !== id));
        message.success(data.msg);
        setTotal((v) => (v -= 1));
      } else {
        message.error(data.msg);
      }
    });
  };

  // 修改审核状态
  const changeToExamine = async (obj) => {
    await timeAxis._putTimeAxisToExamine(obj).then(({ data }) => {
      if (data.code === 200) {
        setList((v) =>
          v.map((item) =>
            item.id === obj.id ? { ...item, type: +obj.type } : item,
          ),
        );
        (toExamineModal.current as any)?.handleCancel();
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
    });
  };

  useEffect(() => {
    getList();
  }, [page, pageSize]);

  // 表格列
  const columns: ColumnsType<DataType> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 100,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        </div>
      ),
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
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
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: 200,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          {formatDate(text, 'yyyy-MM-dd HH:ss:mm')}
        </div>
      ),
    },
    {
      title: '最后修改时间',
      dataIndex: 'update_time',
      key: 'update_time',
      width: 200,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          {formatDate(text, 'yyyy-MM-dd HH:ss:mm')}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'type',
      key: 'type',
      width: 160,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <SysIcon
            type={getDictObj('toExamine_type', text)?.icon}
            style={{ marginRight: '10px' }}
          />
          <span
            className={
              text === 1
                ? style.secretType1
                : text === 2
                ? style.secretType2
                : text === 3
                ? style.secretType3
                : ''
            }
          >
            {getDictObj('toExamine_type', text)?.value}
          </span>
        </div>
      ),
    },
    {
      dataIndex: 'operation',
      width: 140,
      fixed: 'right',
      render: (text, record) => (
        <div className={tableStyle.table_cell}>
          <Tooltip placement="topRight" title="修改审核状态" arrowPointAtCenter>
            <SysIcon
              type="icon-shenhe"
              className={style.btn1}
              onClick={() =>
                (toExamineModal.current as any)?.showModal({
                  ...record,
                  secretType: `${record.type}`,
                })
              }
            />
          </Tooltip>
          <Tooltip placement="topRight" title="编辑树洞信息" arrowPointAtCenter>
            <EditOutlined
              className={style.btn1}
              onClick={() => (modalRef.current as any)?.showModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="将彻底删除该条数据，不可恢复，要继续吗？"
            onConfirm={() => deleteTimeAxisObj(record.id)}
            okText="确定"
            cancelText="取消"
            placement="topRight"
            arrowPointAtCenter
          >
            <DeleteOutlined className={style.btn} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className={style.secret}>
      <div className={style.headerBox}>
        <div className={style.headerBox_left}>
          <span className={style.page_title}>网站时间轴</span>{' '}
          <span className={style.page_total}>{total}</span>
        </div>
        <div className={style.headerBox_right}>
          <Button
            type="primary"
            shape="round"
            className={style.headerBox_right_btn}
            onClick={() => (modalRef.current as any)?.showModal()}
          >
            新增网站事件
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
          y: `calc(100vh - 310px)`,
        }}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          showTitle: false,
        }}
        onChange={changeTable as any}
      />
      <SecretModal
        callback={(ref) => (modalRef.current = ref)}
        setLoading={setLoading}
        update={getList}
      />
      <ToExamineModal
        callback={(ref) => (toExamineModal.current = ref)}
        name="type"
        changeToExamine={changeToExamine}
      />
    </div>
  );
};

export default Classify;
