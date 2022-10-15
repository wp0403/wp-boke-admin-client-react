/*
 * @Descripttion: 读取上传文件的内容
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-15 17:30:50
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-15 18:18:31
 */
import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { handleUpload } from '@/utils/dataUtils';

type Props = {
  accept?: string;
  onChange?: (v: string) => any;
};

const ReadFileUpload = (props: Props) => {
  const { accept, onChange } = props;
  const customRequest = ({ file }) => {
    handleUpload(file, onChange);
  };
  return (
    <Upload
      name="file"
      accept={accept || '.md'}
      showUploadList={false}
      customRequest={customRequest}
    >
      <Button icon={<UploadOutlined />}>上传Markdown</Button>
    </Upload>
  );
};

export default ReadFileUpload;
