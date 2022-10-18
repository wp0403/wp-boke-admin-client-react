/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-15 00:54:21
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-17 16:46:41
 */
import React, { useState, useEffect } from 'react';
import { Form, Input, Avatar, Row, Col, Spin, message, Button } from 'antd';
import { isMatch } from 'lodash';
import UploadImg from '@/components/UploadImg';
import { localGet, localSet } from '@/utils/local';
import SysIcon from '@/components/SysIcon';
import api from '@/api';
import style from './index.less';

const { user } = api;

const BasicSettings = () => {
  const [form] = Form.useForm();
  const [userObj, setUserObj] = useState<any>({
    name: '于风里读诗',
    email: 'webwp0403@163.com',
    desc: '这是一段个人简介',
    phone: '18234978305',
    img: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  // 获取用户详情
  const getUserDetails = async () => {
    setLoading(true);
    await user
      ._getUserDetails({ params: { id: localGet('user')?.id } })
      .then(({ data }) => {
        if (data.code === 200) {
          setUserObj(data.data);
          form.setFieldsValue({
            name: data.data?.name,
            email: data.data?.email,
            desc: data.data?.desc,
            phone: data.data?.phone,
            img: data.data?.img,
          });
          if (
            localGet('user')?.id === data.data.id &&
            !isMatch(data.data, localGet('user'))
          ) {
            localSet('user', data.data);
          }
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const onValuesChange = (value, option, keyName?) => {
    if ('img' === keyName) {
      form.setFieldsValue({ img: value });
      setUserObj((data) => ({
        ...data,
        img: value,
      }));
      return;
    }
    setUserObj((data) => ({
      ...data,
      ...option,
    }));
  };

  // 表单提交事件
  const onFinish = async (values: any) => {
    const newValues = { ...userObj };
    setLoading(true);
    await user
      ._putUserDetails({
        id: newValues?.id,
        name: newValues?.name,
        email: newValues?.email,
        desc: newValues?.desc,
        phone: newValues?.phone,
        img: newValues?.img,
      })
      .then(({ data }) => {
        if (data.code === 200) {
          getUserDetails();
          message.success(data.msg);
        } else {
          message.error(data.msg);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Spin spinning={loading}>
      <Form
        layout="vertical"
        className={style.basic}
        initialValues={userObj}
        onFinish={onFinish}
        autoComplete="off"
        scrollToFirstError
        form={form}
        onValuesChange={onValuesChange}
      >
        <div className={style.title}>基本设置</div>
        <Row
          style={{ width: '100%' }}
          gutter={[16, 16]}
          justify="space-between"
        >
          <Col xs={24} lg={{ span: 0 }}>
            <Form.Item className={style.avatar_box} label="">
              <Avatar
                className={style.avatar}
                size={160}
                src={
                  userObj?.img || (
                    <SysIcon
                      className={style.avatar_icon}
                      type="icon-yonghutouxiang"
                    />
                  )
                }
              />
              <UploadImg
                text="更换头像"
                isCopy={true}
                isFileList={false}
                callback={(v) => onValuesChange(v, {}, 'img')}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12} xl={12}>
            <Form.Item label="昵称" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="邮箱" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="个人简介" name="desc">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="联系电话" name="phone">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={{ span: 0 }} lg={9} xl={9}>
            <Form.Item className={style.avatar_box} label="头像">
              <Avatar
                className={style.avatar}
                size={160}
                src={
                  userObj?.img || (
                    <SysIcon
                      className={style.avatar_icon}
                      type="icon-yonghutouxiang"
                    />
                  )
                }
              />
              <UploadImg
                text="更换头像"
                isCopy={true}
                isFileList={false}
                callback={(v) => onValuesChange(v, {}, 'img')}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default BasicSettings;
