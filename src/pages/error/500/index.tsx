import { Link } from 'umi';
import { Result, Button } from 'antd';
import React from 'react';
import style from './index.less';

interface props {
  currentUser: any;
}

const AuthPage: React.FunctionComponent<props> = () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    className={style.box}
    subTitle="Sorry, the server is reporting an error."
    extra={
      <Link to="/">
        <Button type="primary">返回首页</Button>
      </Link>
    }
  />
);

export default AuthPage;
