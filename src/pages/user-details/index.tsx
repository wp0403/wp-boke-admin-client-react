/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-08-29 10:06:54
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-17 16:01:05
 */
import React, { useState, useEffect } from 'react';
import { message, Spin, Form, Button, Divider, Input, Avatar } from 'antd';
import { isMatch } from 'lodash';
import moment from 'moment';
import api from '@/api';
import SysIcon from '@/components/SysIcon';
import UploadImg from '@/components/UploadImg';
import { isAuth } from '@/utils/authorityUtils';
import { localSet, localGet } from '@/utils/local';
import { IncludeHttp } from '@/utils/dataUtils';
import style from './index.less';

const { user, resources } = api;

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  create_time: any;
  last_edit_time: any;
  state: number;
  role_id: number;
  qq: string;
  weixin: string;
  github: string;
  title: string;
  desc: string;
  about: string;
  aboutTags: string;
  secret_guide: string;
  about_page: string;
  img: string;
  uid: string;
}

const UserDetails = (props: any) => {
  const { id } = props.match.params;

  // 用户信息
  const [userObj, setUserObj] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [form] = Form.useForm();
  const format = 'YYYY-MM-DD HH:mm:ss';
  // 获取用户详情
  const getUserDetails = async () => {
    setLoading(true);
    await user
      ._getUserDetails({ params: { id } })
      .then(({ data }) => {
        if (data.code === 200) {
          setUserObj(data.data);
          if (
            localGet('user')?.id === data.data.id &&
            !isMatch(data.data, localGet('user'))
          ) {
            localSet('user', data.data);
            location.reload();
          }
        }
      })
      .finally(() => setLoading(false));
  };

  // 表单的字段值更新事件
  const onValuesChange = (value, option, keyName?) => {
    if ('img' === keyName) {
      form.setFieldsValue({ img: value });
      setUserObj((data: User) => ({
        ...data,
        img: value,
      }));
      return;
    }
    setUserObj((data: User) => ({
      ...data,
      ...option,
    }));
  };
  // 表单提交事件
  const onFinish = async (values: any) => {
    const newValues = { ...userObj };
    setLoading(true);
    newValues.create_time = moment(newValues.create_time).format(format);
    newValues.last_edit_time = moment(new Date()).format(format);
    await user
      ._putUserDetails(newValues)
      .then(({ data }) => {
        if (data.code === 200) {
          getUserDetails();
          setIsEdit(false);
          message.success(data.msg);
        } else {
          message.error(data.msg);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    !isEdit && getUserDetails();
    isEdit && form.resetFields();
  }, [id, isEdit]);

  return (
    <div className={style.user_details}>
      <Spin tip="Loading..." spinning={loading}>
        <div className={style.header}>
          <div className={style.headerPageTitle}>
            <SysIcon type="icon-guanliyuan" style={{ paddingRight: '20px' }} />
            用户详情页
          </div>
          <div className={style.headerBtnBox}>
            {(isAuth('edit@user') || +localGet('user')?.id === +id) && (
              <Button
                type="primary"
                shape="round"
                onClick={() => setIsEdit(!isEdit)}
              >
                {isEdit ? '取消' : '编辑'}
              </Button>
            )}
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
          initialValues={userObj}
          onFinish={onFinish}
          autoComplete="off"
          scrollToFirstError
          form={form}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            className={style.form_item}
            label="用户名"
            name="username"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input placeholder="请输入用户名" />
            ) : (
              <div className={style.form_item_con}>
                {userObj?.username || '-'}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="用户昵称"
            name="name"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input placeholder="请输入用户昵称" />
            ) : (
              <div className={style.form_item_con}>{userObj?.name || '-'}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="个人博客站点"
            name="website"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input placeholder="请输入个人博客站点链接" />
            ) : userObj?.website ? (
              <a
                className={style.form_item_con}
                href={
                  IncludeHttp(userObj?.website)
                    ? userObj?.website
                    : `http://${userObj?.website}`
                }
                target="_block"
              >
                {userObj?.website}
              </a>
            ) : (
              '-'
            )}
          </Form.Item>
          <Form.Item
            className={`${style.form_item} ${style.form_item_noBottom}`}
            label="GitHub主页"
            name="github"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input placeholder="请输入GitHub主页链接" />
            ) : userObj?.github ? (
              <a
                className={style.form_item_con}
                href={
                  IncludeHttp(userObj?.github)
                    ? userObj?.github
                    : `http://${userObj?.github}`
                }
                target="_block"
              >
                {userObj?.github}
              </a>
            ) : (
              '-'
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="邮箱"
            name="email"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input placeholder="请输入邮箱" />
            ) : (
              <div className={style.form_item_con}>{userObj?.email || '-'}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="微信"
            name="weixin"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input placeholder="请输入微信号" />
            ) : (
              <div className={style.form_item_con}>
                {userObj?.weixin || '-'}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="QQ"
            name="qq"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input placeholder="请输入QQ号" />
            ) : (
              <div className={style.form_item_con}>{userObj?.qq || '-'}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="手机号"
            name="phone"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input placeholder="请输入手机号" />
            ) : (
              <div className={style.form_item_con}>{userObj?.phone || '-'}</div>
            )}
          </Form.Item>
          <Form.Item
            className={`${style.form_item} ${style.form_item_noBottom}`}
            label="用户头像"
            name="img"
          >
            {isEdit ? (
              <UploadImg
                isCopy={true}
                callback={(v) => onValuesChange(v, {}, 'img')}
              />
            ) : (
              <Avatar
                className={style.avatar}
                size={180}
                src={
                  userObj?.img || (
                    <SysIcon
                      className={style.avatar_icon}
                      type="icon-yonghutouxiang"
                    />
                  )
                }
              />
            )}
          </Form.Item>
          <Divider />
          <div className={style.sub_title}>博客站主页信息</div>
          <Form.Item
            className={style.form_item}
            label="主页title"
            name="title"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input placeholder="请输入主页标题" />
            ) : (
              <div className={style.form_item_con}>{userObj?.title || '-'}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item}
            label="个人标签"
            name="aboutTags"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input.TextArea />
            ) : (
              <div className={style.form_item_con}>
                {userObj?.aboutTags || '-'}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item_1}
            label="主页描述"
            name="desc"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input placeholder="请输入主页描述" />
            ) : (
              <div className={style.form_item_con}>{userObj?.desc || '-'}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item_1}
            label="关于我"
            name="about"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input.TextArea placeholder="请输入关于我的内容" />
            ) : (
              <div className={style.form_item_con}>{userObj?.about || '-'}</div>
            )}
          </Form.Item>
          <Form.Item
            className={style.form_item_1}
            label="树洞导语"
            name="secret_guide"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input.TextArea placeholder="请输入树洞导语内容" />
            ) : (
              <div className={style.form_item_con}>
                {userObj?.secret_guide || '-'}
              </div>
            )}
          </Form.Item>
          <Form.Item
            className={`${style.form_item_1} ${style.form_item_noBottom}`}
            label="关于页面"
            name="about_page"
            rules={[{ required: true }]}
          >
            {isEdit ? (
              <Input.TextArea placeholder="请输入关于页面的内容，支持markdown" />
            ) : (
              <div className={style.form_item_con}>
                {userObj?.about_page || '-'}
              </div>
            )}
          </Form.Item>
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

export default UserDetails;
