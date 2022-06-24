import { Link } from 'umi';
import { Result, Button } from 'antd';
import React from 'react';
import style from './index.less';

interface props {
  currentUser: any;
}

const AuthPage: React.FunctionComponent<props> = () => (
  <Result
    status="404"
    title="404"
    style={{
      background: 'none',
    }}
    className={style.box}
    subTitle="抱歉，该页面不存在"
    extra={
      <Link to="/">
        <Button type="primary">返回首页</Button>
      </Link>
    }
  />
);

export default AuthPage;
