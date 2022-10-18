/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-09-05 13:58:49
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-17 13:17:12
 */
import React, { useState, useEffect } from 'react';
import { message, Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';
import api from '@/api';

const { timeAxis } = api;

interface DataType {
  id: string;
  type: number;
  create_time: string | any;
  update_time: string | any;
  title: string;
  content: string;
}

const ModalCom = (props: any) => {
  const format = 'YYYY-MM-DD HH:mm:ss';
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState<string>('添加事件');
  const [timeAxisObj, settimeAxisObj] = useState<DataType>({
    create_time: moment(new Date(), format),
    update_time: moment(new Date(), format),
  } as DataType);
  const [form] = Form.useForm();

  // 打开弹窗事件
  const showModal = (obj?) => {
    setVisible(true);
    obj
      ? (settimeAxisObj({
          ...obj,
          create_time: moment(new Date(obj.create_time), format),
          update_time: moment(new Date(obj.update_time), format),
        }),
        setTitle('编辑事件'))
      : (settimeAxisObj({
          create_time: moment(new Date(), format),
          update_time: moment(new Date(), format),
        } as any),
        setTitle('添加事件'));
  };

  // 弹窗确认事件
  const handleOk = () => {
    form.submit();
  };

  // 弹窗取消事件
  const handleCancel = () => {
    setVisible(false);
  };

  // 表单提交时间
  const onFinish = (values: any) => {
    const newValues = { ...timeAxisObj };
    newValues.create_time = moment(new Date(newValues?.create_time)).format(
      format,
    );
    newValues.update_time = moment(new Date()).format(format);
    setConfirmLoading(true);
    props.setLoading(true);
    const apiName = newValues.id
      ? timeAxis._putTimeAxisDetails
      : timeAxis._createTimeAxisDetails;
    apiName(newValues)
      .then(({ data }) => {
        if (data.code === 200) {
          message.success(data.msg);
          props.update();
          setVisible(false);
          setConfirmLoading(false);
        } else {
          message.error(data.msg);
        }
      })
      .finally(() => props.setLoading(false));
  };

  // 表单的字段值更新事件
  const onValuesChange = (value, option, keyName?) => {
    if (!value) return;
    if (typeof value !== 'object' && keyName === 'authorId') {
      settimeAxisObj((data: DataType) => ({
        ...data,
        [keyName]: value,
        author: option?.name,
      }));
      return;
    }
    settimeAxisObj((data: DataType) => ({
      ...data,
      ...value,
    }));
  };

  // 调用回调函数将方法抛出给父组件
  props.callback({
    showModal,
  });

  useEffect(() => {
    form.resetFields();
  }, [timeAxisObj.id]);

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        name="basic"
        initialValues={timeAxisObj}
        onFinish={onFinish}
        autoComplete="off"
        scrollToFirstError
        form={form}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="标题" name="title" rules={[{ required: true }]}>
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item label="内容" name="content" rules={[{ required: true }]}>
          <Input.TextArea placeholder="请输入内容" />
        </Form.Item>
        <Form.Item
          label="创建时间"
          name="create_time"
          rules={[{ required: true }]}
        >
          <DatePicker format={format} showTime />
        </Form.Item>
        <Form.Item
          label="修改时间"
          name="update_time"
          rules={[{ required: true }]}
        >
          <DatePicker format={format} showTime />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCom;
