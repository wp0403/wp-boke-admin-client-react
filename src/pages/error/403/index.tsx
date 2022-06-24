import { Link } from 'umi';
import { Result, Button } from 'antd';
import React from 'react';
import style from './index.less';

interface props {
  currentUser: any;
}

const AuthPage: React.FunctionComponent<props> = () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    className={style.box}
    subTitle="暂无权限访问该资源，如有问题请联系管理员"
    extra={
      <Link to="/">
        <Button type="primary">返回首页</Button>
      </Link>
    }
  />
);

export default AuthPage;
