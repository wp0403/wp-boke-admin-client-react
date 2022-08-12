/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-09 16:26:31
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-07-07 11:55:25
 */
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { useSize } from 'ahooks';
import { Button, message } from 'antd';
import api from '@/api';
import { localSet } from '@/utils/local';
import { initCos } from '@/utils/cosExample';
import style from './index.less';

const { login } = api;

const LayoutLogin = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [warnObj, setWarnObj] = useState<any>({
    isUser: false,
    isPwd: false,
    isCode: false,
  });
  const [isBtn, setIsBtn] = useState<boolean>(false);
  const [isAgre, setIsAgre] = useState<boolean>(false);
  const [svg, setSvg] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 获取当前窗口大小
  const size = useSize(document.body);

  // 获取登陆的图形验证码
  const getVCode = async () => {
    await login._getVCode().then(({ data }) => {
      if (data.code && data.code === 200) {
        setSvg(data.data);
      }
    });
  };
  // 登陆表单填写
  const changeValue = (val: any, type: string) => {
    switch (type) {
      case 'username':
        setUsername(val);
        setWarnObj((v) => ({
          ...v,
          isUser: /^\S{5,}$/gi.test(val),
        }));
        return;
      case 'password':
        setPassword(val);
        setWarnObj((v) => ({
          ...v,
          isPwd: /^\w{6,8}$/gi.test(val),
        }));
        return;
      case 'code':
        setCode(val);
        setWarnObj((v) => ({
          ...v,
          isCode: /^([a-z]|[A-Z]|\d){6}$/gi.test(val),
        }));
        return;
      case 'isAgre':
        setIsAgre(val);
        return;
    }
  };
  // 更新验证码
  const clickCode = () => {
    getVCode();
  };
  // 点击登录
  const signIn = async () => {
    if (!isAgre) return message.warning('请阅读服务协议并同意后再继续登陆');
    setIsBtn(true);
    if (Object.values(warnObj).some((v) => !v))
      return message.error('请正确输入登陆信息');
    setLoading(true);
    await login
      ._postLogin({
        username,
        password,
        code,
      })
      .then((res) => {
        const { code, data, msg, meta } = res.data;
        if (code === 200) {
          localSet('token', meta.token);
          localSet('auth', meta.auth);
          localSet('dict', meta.dict);
          history.push('/');
          initCos();
        } else {
          message.error(data || msg);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getVCode();
  }, []);

  return (
    <div className={style.login}>
      <div className={style.loginBg}>
        <video
          className={style.loginVideo}
          autoPlay
          controls={false}
          muted
          loop
          src="https://wp-1302605407.cos.ap-beijing.myqcloud.com/mp4/mp4-3.mp4"
          // src="https://wp-1302605407.cos.ap-beijing.myqcloud.com/mp4/mp4-2.mp4"
          // src="https://wp-1302605407.cos.ap-beijing.myqcloud.com/mp4/mp4-1.mp4"
        />
      </div>
      <div
        className={
          (size?.width || 600) >= 600 ? style.loginFrom : style.loginFromM
        }
      >
        <div className={style.title}>后台管理</div>
        <div className={style.username}>
          <div className={style.label}>用户名</div>
          <div className={style.input}>
            <input
              type="text"
              className={isBtn && !warnObj.isUser ? style.warn_input : ''}
              onChange={(e) => changeValue(e.target.value, 'username')}
            />
            {!username && (
              <div className={style.tips}>请输入用户名、手机或邮箱</div>
            )}
            {isBtn && !warnObj.isUser && (
              <div className={style.warn_tips}>请输入至少5位登陆用户名</div>
            )}
          </div>
        </div>
        <div className={style.password}>
          <div className={style.label}>密码</div>
          <div className={style.input}>
            <input
              type="password"
              className={isBtn && !warnObj.isPwd ? style.warn_input : ''}
              onChange={(e) => changeValue(e.target.value, 'password')}
            />
            {!password && <div className={style.tips}>请输入6-8位密码</div>}
            {isBtn && !warnObj.isPwd && (
              <div className={style.warn_tips}>请输入6-8位登陆密码</div>
            )}
          </div>
        </div>
        <div className={style.code}>
          <div className={style.label}>验证码</div>
          <div className={style.codeRight}>
            <div className={style.codeRightContent}>
              <div
                className={style.codeImg}
                dangerouslySetInnerHTML={{ __html: svg ? svg : '加载失败' }}
                onClick={clickCode}
              />
              <div className={style.codeInput}>
                <input
                  type="text"
                  className={isBtn && !warnObj.isCode ? style.warn_input : ''}
                  onChange={(e) => changeValue(e.target.value, 'code')}
                />
                {!code && <div className={style.tips}>请输入验证码</div>}
                {isBtn && !warnObj.isCode && (
                  <div className={style.warn_tips}>请输入6位验证码</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={style.agreement}>
          <div className={style.label}>
            <input
              type="checkbox"
              onChange={(e) => changeValue(e.target.checked, 'isAgre')}
            />
          </div>
          <div className={style.agreementText}>我已阅读并同意“服务协议”</div>
        </div>
        <div className={style.btnBox}>
          <Button onClick={() => history.push('/register')}>注册</Button>
          <Button loading={loading} onClick={signIn}>
            登陆
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LayoutLogin;
