/*
 * @Descripttion: 联动下拉组件
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-13 18:07:54
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-13 23:09:25
 */
import React, { useEffect, useState } from 'react';
import { Select, Tooltip } from 'antd';
import { getOnlyDictObj } from '@/utils/globalDataUtils';
import style from './index.less';

type Props = {
  code?: string; // 拥有二级字典的code
  options?: any[]; // 自定义的二级列表数据
  onChange?: (v: any) => any; // 抛出一个数组 [一级value,二级value]
};

const LinkageSelectCom = (props: Props) => {
  const { code, options, onChange } = props;

  const [list, setList] = useState<any[]>([]);
  const [oneValue, setOneValue] = useState<any>();
  const [subList, setSubList] = useState<any[]>([]);
  const [twoValue, setTwoValue] = useState();

  // 一级下拉选择事件
  const handleOneChange = (value, option) => {
    setOneValue(value);
    const newSubList =
      list
        .find((v) => v.value === value)
        ?.children?.map((item) => ({
          label: item.value,
          value: item.id,
        })) || [];
    setSubList(newSubList);
    setTwoValue(newSubList[0]?.value);
  };
  // 二级下拉选择事件
  const onSecondCurrent = (value) => {
    setTwoValue(value);
  };
  // 初始化列表事件
  const parentOptionss = () => {
    const newList = code
      ? getOnlyDictObj(code)?.map((item) => ({
          label: item.value,
          value: item.id,
          children: item.children,
        })) || []
      : options || [];
    setList(newList);
    setOneValue(newList[0].value);
    const newSubList =
      newList[0]?.children?.map((item) => ({
        label: item.value,
        value: item.id,
      })) || [];
    setSubList(newSubList);
    setTwoValue(newSubList[0]?.value);
  };

  useEffect(() => {
    parentOptionss();
  }, []);

  useEffect(() => {
    onChange && onChange([oneValue, twoValue]);
  }, [oneValue, twoValue]);

  return (
    <>
      <Select
        className={style.linkage_select}
        value={oneValue}
        // options={list}
        onChange={handleOneChange}
      >
        {list?.map((v) => (
          <Select.Option key={v.value}>
            <Tooltip placement="topLeft" title={v.label}>
              {v.label}
            </Tooltip>
          </Select.Option>
        ))}
      </Select>
      <Select
        className={style.linkage_select}
        value={twoValue}
        // options={subList}
        onChange={onSecondCurrent}
      >
        {subList?.map((v) => (
          <Select.Option key={v.value}>
            <Tooltip placement="topLeft" title={v.label}>
              {v.label}
            </Tooltip>
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default LinkageSelectCom;
