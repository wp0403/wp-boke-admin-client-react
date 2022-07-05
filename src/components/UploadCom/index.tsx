/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-07-04 15:15:03
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-07-04 15:30:35
 */
import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadCom = () => {
  return (
    <Upload
      name="logo"
      action="https://wp-1302605407.cos.ap-beijing.myqcloud.com"
      listType="picture"
      maxCount={1}
      data={{
        SecretId: 'AKIDoRoujQs2vXtxkGWUBbkcDXaMs63kAI9j',
        SecretKey: 'KN9drpWw6zbx3tSjjTv60e17w5zcx2qN',
      }}
    >
      <Button icon={<UploadOutlined />}>点击上传图片</Button>
    </Upload>
  );
};

export default UploadCom;
