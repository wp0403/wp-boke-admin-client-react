/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-08 13:51:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-09-13 11:06:30
 */
import React, { useState, useEffect, useRef } from 'react';
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
import type { ColumnsType } from 'antd/lib/table';
import { DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { calcTableScrollWidth, formatDate } from '@/utils/dataUtils';
import { getDictObj } from '@/utils/globalDataUtils';
import api from '@/api';
import ToExamineModal from '@/components/ToExamineModal';
import SysIcon from '@/components/SysIcon';
import tableStyle from '@/table.less';
import style from './index.less';

const { itinerary } = api;

interface DataType {
  id: string;
  timeData: string;
  last_edit_time: string;
  weatherId: string;
  place: string;
  moodId: string;
  title: string;
  content: string;
  img: string;
  imgs: string[];
  isDelete: boolean;
  type: number;
}

const Classify = (props: any) => {
  // 弹窗抛出的事件
  const modalRef = useRef();

  const [visible, setVisible] = useState(false);
  const [imgsId, setImgsId] = useState('');

  // 删除/恢复 博文事件
  const delBowenObj = async (val, id) => {
    await itinerary._delBowenList({ id, isDelete: !val }).then(({ data }) => {
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
  // 彻底删除博文
  const deleteBowenObj = async (id) => {
    await itinerary._deleteClassifyDetails({ id }).then(({ data }) => {
      if (data.code === 200) {
        setList((v) => v.filter((item) => item.id !== id));
        message.success(data.msg);
        setTotal((v) => (v -= 1));
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
      width: 160,
      render: (text, record) => (
        <div className={tableStyle.table_cell}>
          <Link to={`/itinerary/${record.id}/details`}>{text}</Link>
        </div>
      ),
    },
    {
      title: '发布时间',
      dataIndex: 'timeData',
      key: 'timeData',
      width: 190,
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
      width: 190,
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
                ? style.bowenType1
                : text === 2
                ? style.bowenType2
                : text === 3
                ? style.bowenType3
                : ''
            }
          >
            {getDictObj('toExamine_type', text)?.value}
          </span>
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
      render: (text) => (
        <div className={tableStyle.table_cell_flex}>
          <SysIcon
            type={getDictObj('weather_list', text)?.icon}
            className={style.icon}
          />
          {getDictObj('weather_list', text)?.value}
        </div>
      ),
    },
    {
      title: '心情',
      dataIndex: 'moodId',
      key: 'moodId',
      width: 100,
      render: (text) => (
        <div className={tableStyle.table_cell_flex}>
          <SysIcon
            type={getDictObj('mood_list', text)?.icon}
            className={style.icon}
          />
          {getDictObj('mood_list', text)?.value}
        </div>
      ),
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
      render: (text, record) => (
        <div className={tableStyle.table_cell_flex}>
          {+type !== 2 && (
            <Tooltip
              placement="topRight"
              arrowPointAtCenter
              title="修改当前博文审核状态"
            >
              <SysIcon
                type="icon-shenhe"
                className={style.btn_huifu}
                onClick={() =>
                  (modalRef.current as any)?.showModal({
                    ...record,
                    type: `${record.type}`,
                  })
                }
              />
            </Tooltip>
          )}
          {+type === 2 ? (
            <Tooltip
              placement="topRight"
              arrowPointAtCenter
              title="点击后将恢复到列表中"
            >
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
              arrowPointAtCenter
            >
              <DeleteOutlined className={style.btn_remove} />
            </Popconfirm>
          )}
          {+type === 2 && (
            <Popconfirm
              title="将彻底删除该条数据，不可恢复，要继续吗？"
              onConfirm={() => deleteBowenObj(record.id)}
              okText="确定"
              cancelText="取消"
              placement="topRight"
              arrowPointAtCenter
            >
              <DeleteOutlined className={style.btn_remove} />
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  const { type } = props.location.query as any;
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

  // 跳转页面事件
  const changePageType = () => {
    setPage(1);
    if (+type === 2) {
      history.replace('/itinerary/list');
    } else {
      history.replace('/itinerary/list?type=2');
    }
  };

  // 修改博文审核状态
  const changeToExamine = async (obj) => {
    await itinerary._putClassifyToExamine(obj).then(({ data }) => {
      if (data.code === 200) {
        setList((v) =>
          v.map((item) =>
            item.id === obj.id ? { ...item, type: +obj.type } : item,
          ),
        );
        (modalRef.current as any)?.handleCancel();
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
    });
  };

  useEffect(() => {
    getList();
  }, [page, pageSize]);

  return (
    <div className={style.classify}>
      <div className={style.headerBox}>
        <div className={style.headerBox_left}>
          <span className={style.page_title}>
            旅行日记{+type === 2 ? '回收站' : '列表页'}
          </span>{' '}
          <span className={style.page_total}>{total}</span>
        </div>
        <div className={style.headerBox_right}>
          <Button
            type="primary"
            shape="round"
            className={style.headerBox_right_btn}
            href="/itinerary/add-itinerary"
          >
            新增旅行日记
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
      <ToExamineModal
        callback={(ref) => (modalRef.current = ref)}
        name="type"
        changeToExamine={changeToExamine}
      />
    </div>
  );
};

export default Classify;
