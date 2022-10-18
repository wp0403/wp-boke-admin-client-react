/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-14 09:55:41
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-17 15:00:35
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, Divider } from 'antd';
import { localGet } from '@/utils/local';
import SysIcon from '@/components/SysIcon';
import style from './index.less';

const UserDetail = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    setUser(localGet('user'));
  }, []);

  return (
    <div className={style.user_detail}>
      <div className={style.user_box}>
        <Avatar
          size={88}
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
        <div className={style.username}>{user?.name}</div>
        <div className={style.user_title}>{user?.title}</div>
        <div className={style.user_identity}>
          <SysIcon
            className={style.icon}
            type="icon-a-shenfenzhengIDtongxunlu"
          />
          <div className={style.text}>超级管理员</div>
        </div>
        <div className={style.user_occupation}>
          <SysIcon className={style.icon} type="icon-zhiye" />
          <div className={style.text}>Web前端工程师</div>
        </div>
        <div className={style.user_address}>
          <SysIcon className={style.icon} type="icon-a-dingweiweizhiditu" />
          <div className={style.text}>北京市朝阳区</div>
        </div>
        <div className={style.user_phone}>
          <SysIcon className={style.icon} type="icon-dianhua" />
          <div className={style.text}>{user?.phone}</div>
        </div>
        <div className={style.user_email}>
          <SysIcon className={style.icon} type="icon-a-xinxiyoujian" />
          <div className={style.text}>{user?.email}</div>
        </div>
      </div>
      <Divider />
      <div className={style.user_tags}>
        <div className={style.user_tags_title}>个人标签</div>
        <div className={style.user_tags_content}>
          {user?.aboutTags?.split('、')?.map((v) => (
            <span>{v}</span>
          ))}
        </div>
      </div>
      <Divider />
      <div className={style.user_team}>
        <div className={style.user_team_title}>团队</div>
        <div className={style.user_team_content}>
          <div className={style.team_item}>
            <Avatar
              className={style.team_icon}
              size={'small'}
              src={
                user?.img || (
                  <SysIcon
                    className={style.avatar_icon}
                    style={{ fontSize: 24 }}
                    type="icon-yonghutouxiang"
                  />
                )
              }
            />
            <span className={style.team_item_name}>团队一</span>
          </div>
          <div className={style.team_item}>
            <Avatar
              className={style.team_icon}
              size={'small'}
              src={
                user?.img || (
                  <SysIcon
                    className={style.avatar_icon}
                    style={{ fontSize: 24 }}
                    type="icon-yonghutouxiang"
                  />
                )
              }
            />
            <span className={style.team_item_name}>团队二</span>
          </div>
          <div className={style.team_item}>
            <Avatar
              className={style.team_icon}
              size={'small'}
              src={
                user?.img || (
                  <SysIcon
                    className={style.avatar_icon}
                    style={{ fontSize: 24 }}
                    type="icon-yonghutouxiang"
                  />
                )
              }
            />
            <span className={style.team_item_name}>团队三</span>
          </div>
          <div className={style.team_item}>
            <Avatar
              className={style.team_icon}
              size={'small'}
              src={
                user?.img || (
                  <SysIcon
                    className={style.avatar_icon}
                    style={{ fontSize: 24 }}
                    type="icon-yonghutouxiang"
                  />
                )
              }
            />
            <span className={style.team_item_name}>团队四</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
