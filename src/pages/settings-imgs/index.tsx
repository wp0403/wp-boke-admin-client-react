import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Tooltip, Typography, Image } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import {
  calcTableScrollWidth,
  formatDate,
  downloadImg,
} from '@/utils/dataUtils';
import { getCosObj } from '@/utils/cosExample';
import SysIcon from '@/components/SysIcon';
import api from '@/api';
import UploadImg from '@/components/UploadImg';
import tableStyle from '@/table.less';
import style from './index.less';

const { resources } = api;
const { Paragraph } = Typography;

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
      title: '图片名',
      dataIndex: 'name',
      key: 'name',
      width: 160,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        </div>
      ),
    },
    {
      title: '图片地址',
      dataIndex: 'url',
      key: 'url',
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <Paragraph copyable ellipsis>
            {text}
          </Paragraph>
        </div>
      ),
    },
    {
      title: '图片预览',
      dataIndex: 'url',
      key: 'url',
      width: 100,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <Image className={style.img_list} src={text} />
        </div>
      ),
    },
    {
      title: '上传时间',
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
      title: '上传人',
      dataIndex: 'author',
      key: 'author',
      width: 130,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '最后修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 200,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          {formatDate(text, 'yyyy-MM-dd HH:ss:mm')}
        </div>
      ),
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      width: 120,
      render: (text) => <div className={tableStyle.table_cell}>{text}</div>,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 120,
      fixed: 'right',
      render: (text, record: any) => (
        <div className={tableStyle.table_cell_flex}>
          <Tooltip placement="topRight" title="下载图片" arrowPointAtCenter>
            <SysIcon
              type="icon-xiazai"
              className={style.btn_huifu}
              onClick={() =>
                getCosObj(record.name, (val) => {
                  downloadImg(val, record.name);
                })
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  // 请求列表数据事件
  const getLists = async () => {
    setLoading(true);
    await resources
      ._getImgList({
        params: { page, page_size: pageSize },
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

  // 初始化列表
  useEffect(() => {
    getLists();
  }, [page, pageSize, uploading]);

  return (
    <div className={style.settingUser}>
      <div className={style.headerBox}>
        <div className={style.headerBox_left}>
          <span className={style.page_title}>图片列表</span>{' '}
          <span className={style.page_total}>{total}</span>
        </div>
        <div className={style.headerBox_right}>
          <UploadImg
            isCopy={true}
            callback={() => {
              setPage(1);
              setLoading(true);
            }}
            isFileList={false}
            onUpdate={() => setUploading((v) => !v)}
            multiple={true}
          >
            <Button
              type="primary"
              shape="round"
              className={style.headerBox_right_btn}
              loading={loading}
            >
              上传图片
            </Button>
          </UploadImg>
        </div>
      </div>
      <Image.PreviewGroup>
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
      </Image.PreviewGroup>
    </div>
  );
};

export default SettingUser;
