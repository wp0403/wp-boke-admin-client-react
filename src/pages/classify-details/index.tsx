import React, { useState, useEffect } from 'react';
import { Button, Divider, Form, Input, Spin, Select } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { getOnlyDictObj, getDictObj } from '@/utils/globalDataUtils';
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
  time_str: string;
  last_edit_time: string;
  desc: string;
}

const ClassifyDetails = (props: any) => {
  const id = props.location.pathname.split('/')[2];

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [classifyObj, setClassifyObj] = useState<ClassifyObj>({} as any);
  const [form] = Form.useForm();

  const getObj = async () => {
    setLoading(true);
    await classify
      ._getClassifyDetails({ params: { id } })
      .then(({ data }) => {
        if (data.code === 200) {
          setClassifyObj(data.data);
          form.resetFields();
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getObj();
  }, [id]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
              onClick={() => {
                setIsEdit(!isEdit);
                form.resetFields();
              }}
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
            {isEdit ? <Input /> : classifyObj?.time_str}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="最后修改时间"
            name="last_edit_time"
            rules={[{ required: true }]}
          >
            {isEdit ? <Input /> : classifyObj?.last_edit_time}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="一级类"
            name="classify"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Select
                options={getOnlyDictObj('bowen_class')?.map((item) => ({
                  label: item.classDesc,
                  value: item.id,
                }))}
              />
            ) : (
              classifyObj?.classify
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="二级类"
            name="classify_sub"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Select
                options={getDictObj(
                  'bowen_class_sub',
                  classifyObj?.classify_id,
                ).children?.map((item) => ({
                  label: item.classDesc,
                  value: item.id,
                }))}
              />
            ) : (
              classifyObj?.classify_sub
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item_1}
            label="博文简介"
            name="desc"
            rules={[{ required: true }]}
          >
            {isEdit ? <Input.TextArea /> : classifyObj?.desc}
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default ClassifyDetails;
