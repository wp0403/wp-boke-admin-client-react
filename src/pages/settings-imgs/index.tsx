import React, { useState, useEffect, useRef } from 'react';
import { useGetState } from 'ahooks';
import {
  Table,
  Button,
  Tooltip,
  Typography,
  Image,
  message,
  Upload,
} from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import {
  calcTableScrollWidth,
  formatDate,
  calculation,
  downloadImg,
} from '@/utils/dataUtils';
import { getCosList, getCosObj, putCos } from '@/utils/cosExample';
import SysIcon from '@/components/SysIcon';
import ToExamineModal from '@/components/ToExamineModal';
import tableStyle from '@/table.less';
import style from './index.less';

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
      dataIndex: 'Key',
      key: 'Key',
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
      dataIndex: 'Key',
      key: 'Key',
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <Tooltip
            placement="topLeft"
            title={`https://img-1302605407.cos.ap-beijing.myqcloud.com/${text}`}
          >
            <Paragraph
              copyable
              ellipsis
            >{`https://img-1302605407.cos.ap-beijing.myqcloud.com/${text}`}</Paragraph>
          </Tooltip>
        </div>
      ),
    },
    {
      title: '图片预览',
      dataIndex: 'Key',
      key: 'Key',
      width: 100,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          <Image
            className={style.img_list}
            src={`https://img-1302605407.cos.ap-beijing.myqcloud.com/${text}`}
          />
        </div>
      ),
    },
    {
      title: '最后修改时间',
      dataIndex: 'LastModified',
      key: 'LastModified',
      width: 200,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          {formatDate(text, 'yyyy-MM-dd HH:ss:mm')}
        </div>
      ),
    },
    {
      title: '大小',
      dataIndex: 'Size',
      key: 'Size',
      width: 120,
      render: (text) => (
        <div className={tableStyle.table_cell}>
          {calculation(text, 1024 * 1024, 3)}MB
        </div>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 120,
      render: (text, record: any) => (
        <div className={tableStyle.table_cell_flex}>
          <Tooltip placement="left" title="下载图片">
            <SysIcon
              type="icon-xiazai"
              className={style.btn_huifu}
              onClick={() =>
                getCosObj(record.Key, (val) => {
                  downloadImg(val, record.Key);
                })
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const [params, setParams] = useState<any>({});
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  const [next, setNext, getNext] = useGetState<string>('');
  const [list, setList, getList] = useGetState<any[]>([]);

  // 请求列表数据事件
  const getLists = async () => {
    setLoading(true);
    getCosList(
      (data) => {
        setLoading(false);
        getNext()
          ? setList([...getList(), ...data.Contents])
          : setList(data.Contents);
        setIsTruncated(data.IsTruncated === 'true' ? true : false);
        data.NextMarker && setNext(data.NextMarker || '');
      },
      { MaxKeys: 20, ...params } as any,
    );
  };

  // 继续加载
  const loadImgs = () => {
    setParams({
      Marker: next,
    });
  };

  // 自定义上传
  const customRequest = (options: any) => {
    const {
      action,
      data,
      file,
      filename,
      headers,
      onProgress,
      onSuccess,
      onError,
    } = options;
    // 调用腾讯云cos上传方法
    putCos({
      file,
      onProgress,
      onSuccess,
      onError,
    });
  };

  const onChangeUpload = () => {
    setParams({});
    setNext('');
    setIsTruncated(true);
    setList([]);
  };

  // 初始化列表
  useEffect(() => {
    getLists();
  }, [params]);

  return (
    <div className={style.settingUser}>
      <div className={style.headerBox}>
        <div className={style.headerBox_left}>
          <span className={style.page_title}>图片列表</span>{' '}
          <span className={style.page_total}>{list.length}</span>
        </div>
        <div className={style.headerBox_right}>
          <Upload
            name="file"
            action="https://wp-1302605407.cos.ap-beijing.myqcloud.com"
            listType="picture"
            customRequest={customRequest}
            accept=".png,.jpg,.gif,.jpeg"
            multiple
            fileList={[]}
            onChange={onChangeUpload}
          >
            <Button
              type="primary"
              shape="round"
              className={style.headerBox_right_btn}
            >
              上传图片
            </Button>
          </Upload>
        </div>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={list}
        rowKey={'Key'}
        scroll={{
          scrollToFirstRowOnChange: true,
          x: calcTableScrollWidth(columns),
          y: `calc(100vh - 310px)`,
        }}
        pagination={false}
      />
      <div className={style.footerBox}>
        <div
          className={isTruncated ? style.loadBox : style.loadBox1}
          onClick={
            isTruncated
              ? loadImgs
              : () => {
                  setNext('');
                  next && message.warning('数据已全部加载');
                }
          }
        >
          <SyncOutlined spin={loading} />
          <div className={style.loadText}>加载更多</div>
        </div>
      </div>
    </div>
  );
};

export default SettingUser;
