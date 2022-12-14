/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-08 11:11:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-17 16:47:04
 */
import React, { useState, useEffect } from 'react';
import { history, Link } from 'umi';
import { Avatar, Dropdown, Menu } from 'antd';
import { localGet, localRemove } from '@/utils/local';
import SysIcon from '@/components/SysIcon';
import style from './index.less';

const LayoutUser = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    setUser(localGet('user'));
  }, []);

  const signOut = () => {
    localRemove('token');
    history.replace('/login');
  };

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          disabled: true,
          label: (
            <div
              className={style.userBox1}
              onClick={() =>
                history.replace(`/settings/user-details/${user?.id}`)
              }
            >
              <Avatar
                size={'large'}
                src={
                  user?.img || (
                    <SysIcon
                      className={style.avatar_icon}
                      style={{ fontSize: 40 }}
                      type="icon-yonghutouxiang"
                    />
                  )
                }
                alt="用户头像"
              />
              <div className={style.userObj}>
                <div className={style.name}>{user.name}</div>
                <div className={style.email}>{user.email}</div>
              </div>
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <Link rel="noopener noreferrer" to={`/personal-center/${user?.id}`}>
              <SysIcon className={style.menuIcon} type="icon-a-gerenyonghu" />
              个人中心
            </Link>
          ),
        },
        {
          key: '3',
          label: (
            <Link rel="noopener noreferrer" to={`/personal-settings`}>
              <SysIcon className={style.menuIcon} type="icon-a-shezhichilun" />
              设置
            </Link>
          ),
        },
        {
          key: '4',
          label: (
            <div onClick={signOut}>
              <SysIcon className={style.menuIcon} type="icon-a-tuichuzhuxiao" />
              退出登陆
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <div className={style.layoutUser}>
      <SysIcon className={style.notice} type="icon-a-tixinglingdang" />
      <Dropdown
        overlay={menu}
        overlayClassName={style.userPopover}
        placement="bottomRight"
      >
        <div className={style.userBox}>
          <Avatar
            size={'small'}
            src={
              user?.img || (
                <SysIcon
                  className={style.avatar_icon}
                  type="icon-yonghutouxiang"
                />
              )
            }
            alt="用户头像"
          />
          <div className={style.username}>{user.name}</div>
        </div>
      </Dropdown>
    </div>
  );
};

export default LayoutUser;
