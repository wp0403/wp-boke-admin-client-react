import React, { useState, useEffect, FC } from 'react';
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
} from 'antd';
import moment from 'moment';
import { CopyOutlined, UploadOutlined } from '@ant-design/icons';
import {
  getOnlyDictObj,
  getDictObj,
  getSubDictObj,
} from '@/utils/globalDataUtils';
import { formatDate } from '@/utils/dataUtils';
import api from '@/api';
import style from './index.less';

const { classify } = api;

interface ClassifyObj {
  title: string;
  author: string;
  classify: string;
  classify_id: string;
  classify_sub: string;
  classify_sub_id: string;
  time_str: any;
  last_edit_time: any;
  desc: string;
  selected: number;
  isDelete: number;
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
                label: item.classDesc,
                value: item.id,
              }),
            ),
          );
          form.resetFields();
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    !isEdit && getObj();
  }, [id, isEdit]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  // 一级类切换事件
  const onClassifyChange = (value: string, option) => {
    form.setFieldsValue({ classify_sub: '', classify_sub_id: '' });
    setClassifySubList(
      getDictObj('bowen_class_sub', value).children?.map((item) => ({
        label: item.classDesc,
        value: item.id,
      })),
    );
  };
  // 表单的字段值更新事件
  const onValuesChange = (value) => {
    console.log(value);

    if ('classify_id' === Object.keys(value)[0]) {
      const dictObj = getDictObj('bowen_class', Object.values(value)[0] as any);
      setClassifyObj((data: ClassifyObj) => ({
        ...data,
        classify: dictObj.classDesc,
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
        classify: dictObj.classDesc,
      }));
    }

    setClassifyObj((data: ClassifyObj) => ({
      ...data,
      ...value,
    }));
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
          onFinishFailed={onFinishFailed}
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
            {isEdit ? <Input /> : classifyObj?.title}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="博文作者"
            name="author"
            rules={[{ required: true }]}
          >
            {isEdit ? <Input /> : classifyObj?.author}
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
              moment(classifyObj?.time_str).format(format)
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
              moment(classifyObj?.last_edit_time).format(format)
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
                  label: item.classDesc,
                  value: item.id,
                }))}
                onChange={onClassifyChange}
                defaultValue={classifyObj?.classify_id}
              />
            ) : (
              classifyObj?.classify
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
              classifyObj?.classify_sub
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="是否精选博文"
            name="selected"
            rules={[{ required: true }]}
            valuePropName={'checked'}
          >
            {isEdit ? <Switch /> : classifyObj?.selected ? 'Yes' : 'No'}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="是否放入回收站"
            name="isDelete"
            rules={[{ required: true }]}
            valuePropName={'checked'}
          >
            {isEdit ? <Switch /> : classifyObj?.isDelete ? 'Yes' : 'No'}
          </Form.Item>
          <Form.Item
            className={style.form_item_1}
            label="博文简介"
            name="desc"
            rules={[{ required: true }]}
          >
            {isEdit ? <Input.TextArea /> : classifyObj?.desc}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="博文简介"
            name="desc"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            ) : (
              classifyObj?.desc
            )}
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default ClassifyDetails;
