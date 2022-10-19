/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-07-12 16:02:34
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-19 22:54:13
 */
import React, { useState, useEffect } from 'react';
import { Switch, message, Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';
import SelectCom from '@/components/SelectCom';
import { isAuth } from '@/utils/authorityUtils';
import api from '@/api';

const { secret, user } = api;

interface DataType {
  id: string;
  type: string;
  time_str: any;
  author: string;
  author_id: string;
  title: string;
  content: string;
  isDelete: boolean;
  isTop: boolean;
}

const ModalCom = (props: any) => {
  const format = 'YYYY-MM-DD HH:mm:ss';
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState<string>('添加树洞');
  const [secretObj, setSecretObj] = useState<DataType>({
    time_str: moment(new Date(), format),
    isTop: false,
  } as DataType);
  const [form] = Form.useForm();

  // 打开弹窗事件
  const showModal = (obj?) => {
    setVisible(true);
    obj
      ? (setSecretObj({
          ...obj,
          time_str: moment(new Date(obj.time_str), format),
        }),
        setTitle('编辑树洞'))
      : (setSecretObj({
          time_str: moment(new Date(), format),
          isTop: false,
        } as any),
        setTitle('添加树洞'));
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
    const newValues = { ...secretObj };
    newValues.time_str = moment(new Date(newValues?.time_str)).format(format);
    setConfirmLoading(true);
    props.setLoading(true);
    const apiName = newValues.id
      ? secret._putSecretDetails
      : secret._createSecretDetails;
    apiName(newValues)
      .then(({ data }) => {
        if (data.code === 200) {
          message.success(data.msg);
          props.editObj(newValues);
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
    if (typeof value !== 'object' && keyName === 'author_id') {
      setSecretObj((data: DataType) => ({
        ...data,
        [keyName]: value,
        author: option?.name,
      }));
      return;
    }
    setSecretObj((data: DataType) => ({
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
  }, [secretObj.id]);

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
        initialValues={secretObj}
        onFinish={onFinish}
        autoComplete="off"
        scrollToFirstError
        form={form}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="博文作者"
          name="author_id"
          rules={[{ required: true }]}
        >
          <SelectCom
            optionItem={{ label: 'name', value: 'uid' }}
            fun={user._searchUserList}
            placeholder="请输入关键字搜索"
            showSearch={true}
            defaultOptions={[
              { label: secretObj?.author, value: secretObj?.author_id },
            ]}
            defaultValue={secretObj?.author_id ? [secretObj?.author_id] : null}
            onChange={onValuesChange}
            keyName="author_id"
          />
        </Form.Item>
        <Form.Item label="创建时间" name="time_str">
          <DatePicker
            disabled={!isAuth('update@time')}
            format={format}
            showTime
          />
        </Form.Item>
        <Form.Item label="类型" name="type" rules={[{ required: true }]}>
          <Input placeholder="请输入类型" />
        </Form.Item>
        <Form.Item label="是否置顶" name="isTop" valuePropName={'checked'}>
          <Switch disabled={!isAuth('edit@secret')} />
        </Form.Item>
        <Form.Item label="内容" name="content" rules={[{ required: true }]}>
          <Input.TextArea placeholder="请输入内容" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCom;
