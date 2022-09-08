/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-08 13:51:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-09-08 12:37:57
 */
import React, { useState, useEffect, useRef } from 'react';
import { history } from 'umi';
import { Table, Tooltip, Switch, message, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { calcTableScrollWidth, formatDate } from '@/utils/dataUtils';
import api from '@/api';
import SysIcon from '@/components/SysIcon';
import { getDictObj } from '@/utils/globalDataUtils';
import ToExamineModal from '@/components/ToExamineModal';
import tableStyle from '@/table.less';
import SecretModal from './modal';
import style from './index.less';

const { secret, user } = api;

interface DataType {
  id: string;
  type: string;
  time_str: string;
  author: string;
  authorId: string;
  title: string;
  content: string;
  isDelete: boolean;
  isTop: boolean;
  secretType: number;
}

const Classify = (props: any) => {
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
  // 弹窗抛出的事件
  const modalRef = useRef();
  const toExamineModal = useRef();

  const { type } = props.location.query as any;

  // 获取树洞列表
  const getList = async () => {
    setLoading(true);
    await secret
      ._getSecretList({
        params: { isDelete: +type === 2 ? 0 : 1, author: '', page, pageSize },
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

  // 跳转页面事件
  const changePageType = () => {
    setPage(1);
    if (+type === 2) {
      history.replace('/secret/list');
    } else {
      history.replace('/secret/list?type=2');
    }
  };

  // 删除/恢复 博文事件
  const delSecretObj = async (val, id) => {
    await secret._delSecretList({ id, isDelete: !val }).then(({ data }) => {
      if (data.code === 200) {
        setList((v) =>
          v
            .map((item) =>
              item.id === id ? { ...item, isDelete: !val } : item,
            )
            .filter((item) => (+type === 2 ? item.isDelete : !item.isDelete)),
        );
        +type === 2
          ? setTotal((v) => (val ? (v -= 1) : (v += 1)))
          : setTotal((v) => (val ? (v += 1) : (v -= 1)));
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
    });
  };
  // 彻底删除树洞
  const deleteSecretObj = async (id) => {
    await secret._deleteSecretDetails({ id }).then(({ data }) => {
      if (data.code === 200) {
        setList((v) => v.filter((item) => item.id !== id));
        message.success(data.msg);
        setTotal((v) => (v -= 1));
      } else {
        message.error(data.msg);
      }
    });
  };
  // 修改树洞详情
  const editObj = (obj) => {
    obj.id
      ? setList((v) => v.map((item) => (item.id === obj.id ? obj : item)))
      : getList();
  };
  // 修改树洞审核状态
  const changeToExamine = async (obj) => {
    await secret._putSecretToExamine(obj).then(({ data }) => {
      if (data.code === 200) {
        setList((v) =>
          v.map((item) =>
            item.id === obj.id
              ? { ...item, secretType: +obj.secretType }
              : item,
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
  }, [page, pageSize, type]);

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
      width: 200,
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
      width: 500,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'secretType',
      key: 'secretType',
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
      title: '作者',
      dataIndex: 'author',
      key: 'authorId',
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
      width: 140,
      fixed: 'right',
      render: (text, record) => (
        <div className={tableStyle.table_cell}>
          {+type !== 2 && (
            <Tooltip
              placement="topRight"
              arrowPointAtCenter
              title="修改当前博文审核状态"
            >
              <SysIcon
                type="icon-shenhe"
                className={style.btn1}
                onClick={() =>
                  (toExamineModal.current as any)?.showModal({
                    ...record,
                    secretType: `${record.secretType}`,
                  })
                }
              />
            </Tooltip>
          )}
          <Tooltip placement="topRight" arrowPointAtCenter title="编辑树洞信息">
            <EditOutlined
              className={style.btn1}
              onClick={() => (modalRef.current as any)?.showModal(record)}
            />
          </Tooltip>
          {+type === 2 ? (
            <Tooltip
              placement="topRight"
              arrowPointAtCenter
              title="点击后将恢复到列表中"
            >
              <UndoOutlined
                className={style.btn1}
                onClick={() => delSecretObj(record.isDelete, record.id)}
              />
            </Tooltip>
          ) : (
            <Popconfirm
              title="真的要删除吗？删除后将不能在网站查看。"
              onConfirm={() => delSecretObj(record.isDelete, record.id)}
              okText="确定"
              cancelText="取消"
              placement="topRight"
              arrowPointAtCenter
            >
              <DeleteOutlined className={style.btn} />
            </Popconfirm>
          )}
          {+type === 2 && (
            <Popconfirm
              title="将彻底删除该条数据，不可恢复，要继续吗？"
              onConfirm={() => deleteSecretObj(record.id)}
              okText="确定"
              cancelText="取消"
              placement="topRight"
              arrowPointAtCenter
            >
              <DeleteOutlined className={style.btn} />
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={style.secret}>
      <div className={style.headerBox}>
        <div className={style.headerBox_left}>
          <span className={style.page_title}>
            树洞先生{+type === 2 ? '回收站' : '列表页'}
          </span>{' '}
          <span className={style.page_total}>{total}</span>
        </div>
        <div className={style.headerBox_right}>
          <Button
            type="primary"
            shape="round"
            className={style.headerBox_right_btn}
            onClick={() => (modalRef.current as any)?.showModal()}
          >
            新增树洞
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
        editObj={editObj}
      />
      <ToExamineModal
        callback={(ref) => (toExamineModal.current = ref)}
        name="secretType"
        changeToExamine={changeToExamine}
      />
    </div>
  );
};

export default Classify;
