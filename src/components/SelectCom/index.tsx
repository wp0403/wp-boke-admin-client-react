/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-07-06 11:09:35
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-07-06 18:11:59
 */
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

interface Props {
  fun: Function;
  onChange: Function;
  showSearch: boolean; //使单选模式可搜索
  placeholder?: string;
  optionItem: any; // 将列表的哪些字段转为label，value形式
  defaultOptions?: any[];
  defaultValue?: any;
  keyName: string;
}

let timerId;

const SelectCom = (props: Props) => {
  const {
    fun,
    showSearch = false,
    placeholder,
    optionItem,
    defaultOptions = [],
    defaultValue,
    onChange,
    keyName,
  } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const [options, setOptions] = useState<any[]>(defaultOptions);

  const [keyword, setKeyword] = useState<string>('');

  const getList = async () => {
    setLoading(true);
    await fun({ params: { keyword } })
      .then(({ data }) => {
        if (data.code === 200) {
          setOptions(
            data.data?.map((item) => ({
              ...item,
              label: item[optionItem.label],
              value: `${item[optionItem.value]}`,
            })) || [],
          );
        }
      })
      .finally(() => setLoading(false));
  };

  const onSearch = (value) => {
    timerId && clearTimeout(timerId);
    timerId = setTimeout(() => {
      setKeyword(value);
    }, 600);
  };

  useEffect(() => {
    getList();
  }, [keyword]);

  return (
    <Select
      onSearch={onSearch}
      optionFilterProp="label"
      loading={loading}
      showSearch={showSearch}
      placeholder={placeholder}
      options={options}
      notFoundContent={null}
      defaultActiveFirstOption={false}
      defaultValue={defaultValue}
      onChange={(value, opt) => onChange(value, opt, keyName) as any}
    />
  );
};

export default SelectCom;
