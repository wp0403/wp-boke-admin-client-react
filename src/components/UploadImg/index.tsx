/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-13 10:19:20
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-13 11:30:17
 */
import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '@/api';
import { calculation, formatDate } from '@/utils/dataUtils';
import { putCos } from '@/utils/cosExample';

const { resources } = api;

type Props = {
  isCopy?: boolean; // 是否需要执行额外函数
  callback?: (v: any) => any; // 额外的回调函数
  maxCount?: number; // 最大上传数量
  isFileList?: boolean; // 是否展示已上传图片列表
  onUpdate?: () => any; // 刷新的回调函数
  children?: any;
  multiple?: boolean;
};

const UploadImg = (props: Props) => {
  const {
    isCopy = false,
    callback,
    maxCount = 1,
    onUpdate,
    isFileList = true,
    multiple,
  } = props;
  // 自定义上传
  const customRequest = (options: any) => {
    const {
      action,
      data,
      file,
      filename,
      headers,
      onProgress,
      onSuccess,
      onError,
    } = options;
    // 调用腾讯云cos上传方法
    putCos({
      file,
      onProgress,
      onSuccess,
      onError,
    });
  };
  // 上传的change函数
  const onChangeUpload = async ({ file }) => {
    if (file.status === 'done' && file.response.statusCode === 200) {
      const imgUrl = file?.response?.Location;
      if (isCopy && imgUrl) {
        callback && callback(`https://${imgUrl}`);
      }
      const obj = {
        name: file.name,
        url: `https://img-1302605407.cos.ap-beijing.myqcloud.com/${file.name}`,
        updateTime: formatDate(file.lastModified, 'yyyy-MM-dd HH:ss:mm'),
        create_time: formatDate(new Date(), 'yyyy-MM-dd HH:ss:mm'),
        size: `${calculation(file.size, 1024 * 1024, 3)}MB`,
      };
      await resources
        ._putImg(obj)
        .then(({ data }) => {
          if (data.code === 200) {
            onUpdate && onUpdate();
          }
        })
        .finally(() => {});
    }
  };
  return (
    <Upload
      name="file"
      action="https://wp-1302605407.cos.ap-beijing.myqcloud.com"
      listType="picture"
      maxCount={maxCount}
      customRequest={customRequest}
      onChange={onChangeUpload}
      accept=".png,.jpg,.gif,.jpeg"
      showUploadList={isFileList}
      {...(multiple ? { multiple: multiple } : {})}
    >
      {props.children ? (
        props.children
      ) : (
        <Button icon={<UploadOutlined />}>点击上传图片</Button>
      )}
    </Upload>
  );
};

export default UploadImg;
