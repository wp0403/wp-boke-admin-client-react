import React, { useState, useEffect, FC } from 'react';
import { history } from 'umi';
import {
  Button,
  Divider,
  Form,
  Input,
  Spin,
  Select,
  Switch,
  DatePicker,
  Upload,
  Image,
  message,
  Typography,
  Tooltip,
  Popconfirm,
} from 'antd';
import moment from 'moment';
import { CopyOutlined, UploadOutlined } from '@ant-design/icons';
import SelectCom from '@/components/SelectCom';
import RanderMarkdown from '@/components/RanderMarkdown';
import {
  getOnlyDictObj,
  getDictObj,
  getSubDictObj,
} from '@/utils/globalDataUtils';
import { calculation, formatDate } from '@/utils/dataUtils';
import { putCos } from '@/utils/cosExample';
import api from '@/api';
import style from './index.less';
import { isAuth } from '@/utils/authorityUtils';
import { localGet } from '@/utils/local';
import SysIcon from '@/components/SysIcon';

const { Paragraph } = Typography;
const { itinerary, resources, user } = api;

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
  author: string;
  author_id: string;
}

const ItineraryDetails: FC = (props: any) => {
  const { id } = props.match.params;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [itineraryObj, setItineraryObj] = useState<DataType>({
    timeData: null,
    last_edit_time: null,
  } as any);
  const [copyImg, setCopyImg] = useState<string>('上传后显示图片地址');
  const [form] = Form.useForm();
  const format = 'YYYY-MM-DD HH:mm:ss';

  // 获取详情信息
  const getObj = async () => {
    setLoading(true);
    await itinerary
      ._getItineraryDetail({ params: { id } })
      .then(({ data }) => {
        if (data.code === 200) {
          const { timeData, last_edit_time } = data.data;

          setItineraryObj({
            ...data.data,
            timeData: timeData ? moment(new Date(timeData), format) : null,
            last_edit_time: last_edit_time
              ? moment(new Date(last_edit_time), format)
              : null,
          });
          form.resetFields();
        } else {
          message.error(data.msg);
          history.push('/itinerary');
        }
      })
      .finally(() => setLoading(false));
  };

  // 彻底删除删除
  const deleteBowenObj = async (id) => {
    await itinerary._deleteClassifyDetails({ id }).then(({ data }) => {
      if (data.code === 200) {
        message.success(data.msg);
        history.push('/classify');
      } else {
        message.error(data.msg);
      }
    });
  };

  useEffect(() => {
    !isEdit && getObj();
    isEdit && form.resetFields();
  }, [id, isEdit]);

  const onFinish = (values: any) => {
    itineraryObj.timeData = moment(new Date(itineraryObj?.timeData)).format(
      format,
    );
    itineraryObj.last_edit_time = moment(new Date()).format(format);
    setLoading(true);
    itinerary
      ._putClassifyDetails(itineraryObj)
      .then(({ data }) => {
        if (data.code === 200) {
          message.success(data.msg);
        } else {
          message.error(data.msg);
        }
        setIsEdit(false);
      })
      .finally(() => setLoading(false));
  };

  // 表单的字段值更新事件
  const onValuesChange = (value, option, keyName?) => {
    if (!value) return;
    if ('classify_id' === Object.keys(value)[0]) {
      const dictObj = getDictObj('bowen_class', Object.values(value)[0] as any);
      setItineraryObj((data: DataType) => ({
        ...data,
        classify: dictObj.value,
      }));
    }
    if ('img' === Object.keys(value)[0]) {
      const imgUrl = value['img']?.file?.response?.Location;
      setItineraryObj((data: DataType) => ({
        ...data,
        img: `https://${imgUrl}`,
      }));
      return;
    }
    if ('storage_type' === Object.keys(value)[0]) {
      const dictObj = getDictObj('bowen_type', Object.values(value)[0] as any);
      setItineraryObj((data: DataType) => ({
        ...data,
        ...value,
        storage_desc: dictObj.value,
      }));
      return;
    }
    if (typeof value !== 'object' && keyName === 'author_id') {
      setItineraryObj((data: DataType) => ({
        ...data,
        [keyName]: value,
        author: option?.name,
      }));
      return;
    }
    setItineraryObj((data: DataType) => ({
      ...data,
      ...value,
    }));
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
  // 上传的change函数
  const onChangeUpload = async ({ file }, isCopy = false) => {
    if (file.status === 'done' && file.response.statusCode === 200) {
      const imgUrl = file?.response?.Location;
      if (isCopy && imgUrl) {
        setCopyImg(`https://${imgUrl}`);
      }
      const obj = {
        name: file.name,
        url: `https://img-1302605407.cos.ap-beijing.myqcloud.com/${file.name}`,
        updateTime: formatDate(file.lastModified, 'yyyy-MM-dd HH:ss:mm'),
        create_time: formatDate(new Date(), 'yyyy-MM-dd HH:ss:mm'),
        size: `${calculation(file.size, 1024 * 1024, 3)}MB`,
      };
      await resources
        ._putImg(obj)
        .then(({ data }) => {
          if (data.code === 200) {
          }
        })
        .finally(() => {});
    }
  };

  return (
    <div className={style.classifyDetails}>
      <Spin tip="Loading..." spinning={loading}>
        <div className={style.header}>
          <div className={style.headerPageTitle}>
            <CopyOutlined style={{ paddingRight: '20px' }} />
            旅行日记详情页
          </div>
          <div className={style.headerBtnBox}>
            {(isAuth('edit@classify') ||
              +localGet('user')?.id === +itineraryObj?.author_id) && (
              <Button
                type="primary"
                shape="round"
                onClick={() => setIsEdit(!isEdit)}
              >
                {isEdit ? '取消' : '编辑'}
              </Button>
            )}
            <Popconfirm
              title="将彻底删除该条数据，不可恢复，要继续吗？"
              onConfirm={() => deleteBowenObj(itineraryObj.id)}
              okText="确定"
              cancelText="取消"
              placement="topRight"
            >
              <Button
                style={{ marginLeft: '10px' }}
                type="primary"
                danger
                shape="round"
              >
                删除
              </Button>
            </Popconfirm>
          </div>
        </div>
        <Divider />
        <Form
          className={style.form}
          name="basic"
          initialValues={itineraryObj}
          onFinish={onFinish}
          autoComplete="off"
          scrollToFirstError
          form={form}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            className={style.form_item}
            label="标题"
            name="title"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input />
            ) : (
              <div className={style.form_item_con}>{itineraryObj?.title}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="地点"
            name="place"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input />
            ) : (
              <div className={style.form_item_con}>{itineraryObj?.place}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="作者"
            name="author_id"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <SelectCom
                optionItem={{ label: 'name', value: 'uid' }}
                fun={user._searchUserList}
                placeholder="请输入关键字搜索"
                showSearch={true}
                defaultOptions={[
                  {
                    label: itineraryObj?.author,
                    value: itineraryObj?.author_id,
                  },
                ]}
                defaultValue={[itineraryObj?.author_id]}
                onChange={onValuesChange}
                keyName="author_id"
              />
            ) : (
              <div className={style.form_item_con}>{itineraryObj?.author}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="创建时间"
            name="timeData"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <DatePicker format={format} showTime />
            ) : (
              <div className={style.form_item_con}>
                {moment(itineraryObj?.timeData).format(format)}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="最后修改时间"
            name="last_edit_time"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <DatePicker format={format} showTime />
            ) : (
              <div className={style.form_item_con}>
                {moment(itineraryObj?.last_edit_time).format(format)}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="是否放入回收站"
            name="isDelete"
            valuePropName={'checked'}
          >
            {isEdit ? (
              <Switch />
            ) : (
              <div className={style.form_item_con}>
                {itineraryObj?.isDelete ? 'Yes' : 'No'}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="图片"
            name="img"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Upload
                name="file"
                action="https://wp-1302605407.cos.ap-beijing.myqcloud.com"
                listType="picture"
                maxCount={1}
                customRequest={customRequest}
                onChange={onChangeUpload}
                accept=".png,.jpg,.gif,.jpeg"
              >
                <Button icon={<UploadOutlined />}>点击上传图片</Button>
              </Upload>
            ) : (
              <div className={style.form_item_con}>
                <Image
                  className={style.list_img}
                  src={itineraryObj?.img}
                  alt={itineraryObj?.title}
                />
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="图片列表"
            name="imgs"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input.TextArea />
            ) : (
              <div className={style.form_item_con}>
                {itineraryObj?.imgs?.map((v) => (
                  <img src={v} alt="" />
                ))}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="内容"
            name="content"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input.TextArea />
            ) : (
              <div className={style.form_item_con}>{itineraryObj?.content}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="心情"
            name="moodId"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Select
                options={getOnlyDictObj('mood_list')?.map((item) => ({
                  label: item.value,
                  value: item.id,
                }))}
                defaultValue={itineraryObj?.moodId}
              />
            ) : (
              <div className={style.form_item_con}>
                <SysIcon
                  type={
                    getOnlyDictObj('mood_list')?.find(
                      (item) => item.id === itineraryObj?.moodId,
                    )?.icon
                  }
                />
                {
                  getOnlyDictObj('mood_list')?.find(
                    (item) => item.id === itineraryObj?.moodId,
                  )?.value
                }
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="天气"
            name="weatherId"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Select
                options={getOnlyDictObj('weather_list')?.map((item) => ({
                  label: item.value,
                  value: item.id,
                }))}
                defaultValue={itineraryObj?.weatherId}
              />
            ) : (
              <div className={style.form_item_con}>
                <SysIcon
                  type={
                    getOnlyDictObj('weather_list')?.find(
                      (item) => item.id === itineraryObj?.weatherId,
                    )?.icon
                  }
                />
                {
                  getOnlyDictObj('weather_list')?.find(
                    (item) => item.id === itineraryObj?.weatherId,
                  )?.value
                }
              </div>
            )}
          </Form.Item>
          {isEdit ? (
            <>
              <Divider />
              <div className={style.uploadImg}>
                <Tooltip title="用于在详情中插入图片" placement="topLeft">
                  <div className={style.uploadImgTitle}>
                    上传图片并获取图片地址
                  </div>
                </Tooltip>
                <Upload
                  name="file"
                  action="https://wp-1302605407.cos.ap-beijing.myqcloud.com"
                  listType="picture"
                  maxCount={1}
                  customRequest={customRequest}
                  onChange={(v) => onChangeUpload(v, true)}
                  accept=".png,.jpg,.gif,.jpeg"
                >
                  <Button icon={<UploadOutlined />}>点击上传图片</Button>
                </Upload>
                <Paragraph copyable>{copyImg}</Paragraph>
              </div>
              <Divider />
            </>
          ) : (
            ''
          )}
          {isEdit ? (
            <div className={style.form_btn}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </div>
          ) : (
            ''
          )}
        </Form>
      </Spin>
    </div>
  );
};

export default ItineraryDetails;
