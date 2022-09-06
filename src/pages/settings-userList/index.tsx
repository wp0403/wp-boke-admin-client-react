import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, message, Tooltip } from 'antd';
import { Link } from 'umi';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import {
  calcTableScrollWidth,
  formatDate,
  IncludeHttp,
} from '@/utils/dataUtils';
import SysIcon from '@/components/SysIcon';
import ToExamineModal from '@/components/ToExamineModal';
import { getDictObj } from '@/utils/globalDataUtils';
import api from '@/api';
import tableStyle from '@/table.less';
import style from './index.less';

const { user } = api;

interface DataType {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  state: number;
}

const SettingUser = () => {
  // 弹窗抛出的事件
  const modalRef = useRef();
  const columns: ColumnsType<DataType> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      fixed: 'left',
      width: 160,
      render: (text, record) => (
        <div className={tableStyle.table_cell}>
          <Link
            target="_blank"
            style={{ cursor: 'pointer' }}
            to={`/settings/user-details/${record.id}`}
          >
            {text}
          </Link>
        </div>
      ),
    },
    {
      title: '昵称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 160,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '网站',
      dataIndex: 'website',
      key: 'website',
      width: 260,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <a
            target="_blank"
            style={{ cursor: 'pointer' }}
            href={IncludeHttp(text) ? text : `http://${text}`}
          >
            {text}
          </a>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      width: 160,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <SysIcon
            type={getDictObj('user_state', text)?.icon}
            style={{ marginRight: '10px' }}
          />
          <span className={style.bowenType3}>
            {getDictObj('user_state', text)?.value}
          </span>
        </div>
      ),
    },
    {
      title: '角色',
      dataIndex: 'role_id',
      key: 'role_id',
      width: 160,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <SysIcon
            className={style.bowenType3}
            type={getDictObj('user_identity', text)?.icon}
            style={{ marginRight: '10px' }}
          />
          <span className={style.bowenType3}>
            {getDictObj('user_identity', text)?.value}
          </span>
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
      dataIndex: 'last_edit_time',
      key: 'last_edit_time',
      width: 200,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          {formatDate(text, 'yyyy-MM-dd HH:ss:mm')}
        </div>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 120,
      fixed: 'right',
      render: (text, record) => (
        <div className={tableStyle.table_cell_flex}>
          <Tooltip placement="topRight" title="修改当前用户状态">
            <SysIcon
              type="icon-jurassic_edit-user"
              className={style.btn_huifu}
              onClick={() =>
                (modalRef.current as any)?.showModal({
                  ...record,
                  state: `${record.state}`,
                })
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<any[]>([]);

  // 修改用户状态
  const changeToExamine = async (obj) => {
    await user._putUserToExamine(obj).then(({ data }) => {
      if (data.code === 200) {
        setList((v) =>
          v.map((item) =>
            item.id === obj.id ? { ...item, state: +obj.state } : item,
          ),
        );
        (modalRef.current as any)?.handleCancel();
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
    });
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

  // 请求列表数据事件
  const getList = async (obj?) => {
    setLoading(true);
    await user
      ._getUserList({
        params: { page, pageSize },
      })
      .then(({ data }) => {
        if (data.code === 200) {
          setList(data.data);
          setTotal(data.meta.total);
        }
      })
      .finally(() => setLoading(false));
  };

  // 初始化列表
  useEffect(() => {
    getList();
  }, [page, pageSize]);
  console.log(list);

  return (
    <div className={style.settingUser}>
      <div className={style.headerBox}>
        <div className={style.headerBox_left}>
          <span className={style.page_title}>用户列表</span>{' '}
          <span className={style.page_total}>{total}</span>
        </div>
        <div className={style.headerBox_right}>
          <Button
            type="primary"
            shape="round"
            className={style.headerBox_right_btn}
          >
            新增用户
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
        onChange={handleTableChange as any}
      />
      <ToExamineModal
        callback={(ref) => (modalRef.current = ref)}
        name="state"
        dictType="user_state"
        title="修改用户状态"
        label="用户状态"
        changeToExamine={changeToExamine}
      />
    </div>
  );
};

export default SettingUser;
