/*
 * @Descripttion: 用于字典下拉搜索
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-13 14:05:01
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-13 17:50:55
 */
import React from 'react';
import { Select } from 'antd';
import { getOnlyDictObj } from '@/utils/globalDataUtils';

type Props = {
  code?: string;
  options?: any[];
  placeholder: string;
  isShowSearch?: boolean; // 使单选模式可搜索
  isShowArrow?: boolean; // 是否显示下拉小箭头
  onChange?: (v: any, d: any) => any;
};

const DictSelectCom = (props: Props) => {
  const { code, options, placeholder, isShowSearch, isShowArrow, onChange } =
    props;

  const initOptions = () => {
    if (code) {
      return (
        getOnlyDictObj(code)?.map((item) => ({
          label: item.value,
          value: item.id,
        })) || []
      );
    }
    return options;
  };

  return (
    <Select
      options={initOptions() as any}
      placeholder={placeholder}
      onChange={onChange}
      showSearch={isShowSearch}
      showArrow={isShowArrow}
    />
  );
};

export default DictSelectCom;
