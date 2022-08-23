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
import { putCos } from '@/utils/cosExample';
import api from '@/api';
import style from './index.less';

const { Paragraph } = Typography;
const { classify, user } = api;

interface ClassifyObj {
  title: string;
  author: string;
  author_id: number;
  classify: string;
  classify_id: string;
  classify_sub: string;
  classify_sub_id: string;
  time_str: any;
  last_edit_time: any;
  desc: string;
  selected: number;
  isDelete: number;
  img: string;
  storage_type: string;
  content: string;
}

const ClassifyDetails: FC = (props: any) => {
  const id = props.location.pathname.split('/')[2];

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [classifyObj, setClassifyObj] = useState<ClassifyObj>({
    time_str: null,
    last_edit_time: null,
  } as any);
  const [classifySubList, setClassifySubList] = useState<any[]>([]);
  const [copyImg, setCopyImg] = useState<string>('上传后显示图片地址');
  const [form] = Form.useForm();
  const format = 'YYYY-MM-DD HH:mm:ss';

  const getObj = async () => {
    setLoading(true);
    await classify
      ._getClassifyDetails({ params: { id } })
      .then(({ data }) => {
        if (data.code === 200) {
          const { time_str, last_edit_time } = data.data;

          setClassifyObj({
            ...data.data,
            time_str: time_str ? moment(new Date(time_str), format) : null,
            last_edit_time: last_edit_time
              ? moment(new Date(last_edit_time), format)
              : null,
          });
          setClassifySubList(
            getDictObj('bowen_class_sub', data.data?.classify_id).children?.map(
              (item) => ({
                label: item.value,
                value: item.id,
              }),
            ),
          );
          form.resetFields();
        } else {
          message.error(data.msg);
          history.push('/classify');
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    !isEdit && getObj();
    isEdit && form.resetFields();
  }, [id, isEdit]);

  const onFinish = (values: any) => {
    classifyObj.time_str = moment(new Date(classifyObj?.time_str)).format(
      format,
    );
    classifyObj.last_edit_time = moment(
      new Date(classifyObj?.last_edit_time),
    ).format(format);
    setLoading(true);
    classify
      ._putClassifyDetails(classifyObj)
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

  // 一级类切换事件
  const onClassifyChange = (value: string, option) => {
    form.setFieldsValue({ classify_sub: '', classify_sub_id: '' });
    setClassifySubList(
      getDictObj('bowen_class_sub', value).children?.map((item) => ({
        label: item.value,
        value: item.id,
      })),
    );
  };
  // 表单的字段值更新事件
  const onValuesChange = (value, option, keyName?) => {
    if (!value) return;
    if ('classify_id' === Object.keys(value)[0]) {
      const dictObj = getDictObj('bowen_class', Object.values(value)[0] as any);
      setClassifyObj((data: ClassifyObj) => ({
        ...data,
        classify: dictObj.value,
      }));
    }
    if ('classify_sub_id' === Object.keys(value)[0]) {
      const dictObj = getSubDictObj(
        'bowen_class_sub',
        classifyObj.classify_id,
        Object.values(value)[0] as any,
      );
      setClassifyObj((data: ClassifyObj) => ({
        ...data,
        classify_sub: dictObj.value,
      }));
    }
    if ('img' === Object.keys(value)[0]) {
      const imgUrl = value['img']?.file?.response?.Location;
      setClassifyObj((data: ClassifyObj) => ({
        ...data,
        img: `https://${imgUrl}`,
      }));
      return;
    }
    if (typeof value !== 'object' && keyName === 'author_id') {
      setClassifyObj((data: ClassifyObj) => ({
        ...data,
        [keyName]: value,
        author: option?.name,
      }));
      return;
    }
    setClassifyObj((data: ClassifyObj) => ({
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
  const onChangeUpload = (val) => {
    const imgUrl = val?.file?.response?.Location;
    if (imgUrl) {
      setCopyImg(`https://${imgUrl}`);
    }
  };

  return (
    <div className={style.classifyDetails}>
      <Spin tip="Loading..." spinning={loading}>
        <div className={style.header}>
          <div className={style.headerPageTitle}>
            <CopyOutlined style={{ paddingRight: '20px' }} />
            博文详情页
          </div>
          <div className={style.headerBtnBox}>
            <Button
              type="primary"
              shape="round"
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? '取消' : '编辑'}
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              type="primary"
              danger
              shape="round"
            >
              删除
            </Button>
          </div>
        </div>
        <Divider />
        <Form
          className={style.form}
          name="basic"
          initialValues={classifyObj}
          onFinish={onFinish}
          autoComplete="off"
          scrollToFirstError
          form={form}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            className={style.form_item}
            label="博文标题"
            name="title"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input />
            ) : (
              <div className={style.form_item_con}>{classifyObj?.title}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="博文作者"
            name="author_id"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <SelectCom
                optionItem={{ label: 'name', value: 'id' }}
                fun={user._searchUserList}
                placeholder="请输入关键字搜索"
                showSearch={true}
                defaultOptions={[
                  { label: classifyObj?.author, value: classifyObj?.author_id },
                ]}
                defaultValue={[classifyObj?.author_id]}
                onChange={onValuesChange}
                keyName="author_id"
              />
            ) : (
              <div className={style.form_item_con}>{classifyObj?.author}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="创建时间"
            name="time_str"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <DatePicker format={format} showTime />
            ) : (
              <div className={style.form_item_con}>
                {moment(classifyObj?.time_str).format(format)}
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
                {moment(classifyObj?.last_edit_time).format(format)}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="一级类"
            name="classify_id"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Select
                options={getOnlyDictObj('bowen_class')?.map((item) => ({
                  label: item.value,
                  value: item.id,
                }))}
                onChange={onClassifyChange}
                defaultValue={classifyObj?.classify_id}
              />
            ) : (
              <div className={style.form_item_con}>{classifyObj?.classify}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="二级类"
            name="classify_sub_id"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Select options={classifySubList} />
            ) : (
              <div className={style.form_item_con}>
                {classifyObj?.classify_sub}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="是否精选博文"
            name="selected"
            rules={[{ required: true }]}
            valuePropName={'checked'}
          >
            {isEdit ? (
              <Switch />
            ) : (
              <div className={style.form_item_con}>
                {classifyObj?.selected ? 'Yes' : 'No'}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="是否放入回收站"
            name="isDelete"
            rules={[{ required: true }]}
            valuePropName={'checked'}
          >
            {isEdit ? (
              <Switch />
            ) : (
              <div className={style.form_item_con}>
                {classifyObj?.isDelete ? 'Yes' : 'No'}
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
                  src={classifyObj?.img}
                  alt={classifyObj?.title}
                />
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="博文简介"
            name="desc"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input.TextArea />
            ) : (
              <div className={style.form_item_con}>{classifyObj?.desc}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="文档类型"
            name="storage_type"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input />
            ) : (
              <div className={style.form_item_con}>
                {classifyObj?.storage_type}
              </div>
            )}
          </Form.Item>
          <div className={style.form_item_2}>
            <Form.Item
              className={isEdit ? style.form_item : style.form_item_1}
              label="博文内容"
              name="content"
              rules={[{ required: true }]}
            >
              {isEdit ? (
                <Input.TextArea className={style.textarea} />
              ) : classifyObj?.storage_type === 'md' ? (
                <div className={style.form_item_markdown}>
                  <RanderMarkdown markdown={classifyObj?.content} />
                </div>
              ) : (
                <div className={style.form_item_con}>
                  {classifyObj?.content}
                </div>
              )}
            </Form.Item>
            {isEdit && classifyObj?.storage_type === 'md' ? (
              <div className={style.form_item_markdown_1}>
                <RanderMarkdown markdown={classifyObj?.content} />
              </div>
            ) : (
              ''
            )}
          </div>
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
                  onChange={onChangeUpload}
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

export default ClassifyDetails;
