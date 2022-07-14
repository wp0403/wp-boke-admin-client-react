/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-07-14 15:36:43
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-07-14 18:01:12
 */
import React, { useState, useEffect } from 'react';
import { Modal, Form, Select } from 'antd';
import { getOnlyDictObj } from '@/utils/globalDataUtils';
import api from '@/api';

const { secret, user } = api;

interface Props {
  name: string; // 审核状态的key
  callback: Function; // 抛出给父元素的属性和事件
  changeToExamine: Function; // 父元素修改审核状态事件
}

const ToExamineModal = (props: Props) => {
  const { name } = props;
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
    setConfirmLoading(true);
    form.submit();
  };

  // 弹窗取消事件
  const handleCancel = () => {
    setVisible(false);
    setConfirmLoading(false);
  };

  // 表单提交事件
  const onFinish = (values: any) => {
    props.changeToExamine(obj);
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
      title="审核"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        initialValues={obj}
        onFinish={onFinish}
        autoComplete="off"
        scrollToFirstError
        form={form}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="审核状态" name={name} rules={[{ required: true }]}>
          <Select
            options={getOnlyDictObj('toExamine_type')?.map((item) => ({
              label: item.value,
              value: item.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ToExamineModal;
