/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-07-14 15:36:43
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-17 15:18:12
 */
import React, { useState, useEffect } from 'react';
import { Modal, Form, Select } from 'antd';
import { getOnlyDictObj } from '@/utils/globalDataUtils';
import api from '@/api';

const { secret, user } = api;

interface Props {
  dictType: string; // 字典type
  name: string; // key
  callback: Function; // 抛出给父元素的属性和事件
  changeUserState: Function; // 父元素修改用户身份事件
}

const UserStateModal = (props: Props) => {
  const { name, dictType } = props;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [obj, setObj] = useState<any>({});
  const [form] = Form.useForm();

  // 打开弹窗事件
  const showModal = (obj) => {
    setVisible(true);
    setObj(obj);
  };

  // 弹窗确认事件
  const handleOk = () => {
    form.submit();
  };

  // 弹窗取消事件
  const handleCancel = () => {
    setVisible(false);
    setConfirmLoading(false);
  };

  // 表单提交事件
  const onFinish = (values: any) => {
    setConfirmLoading(true);
    props.changeUserState(obj);
  };

  // 表单的字段值更新事件
  const onValuesChange = (value, option, keyName?) => {
    if (!value) return;
    setObj({
      ...obj,
      [name]: value[name],
    });
  };

  // 调用回调函数将方法抛出给父组件
  props.callback({
    showModal,
    handleCancel,
  });

  useEffect(() => {
    form.resetFields();
  }, [obj.id]);

  return (
    <Modal
      title="修改用户角色"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        // layout='vertical'
        initialValues={obj}
        onFinish={onFinish}
        autoComplete="off"
        scrollToFirstError
        form={form}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="用户角色" name={name} rules={[{ required: true }]}>
          <Select
            options={getOnlyDictObj(dictType)?.map((item) => ({
              label: item.value,
              value: item.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserStateModal;
