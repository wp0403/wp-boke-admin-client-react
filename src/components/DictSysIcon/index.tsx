/*
 * @Descripttion: 根据字典code和id获取icon
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-14 15:37:32
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-14 15:51:00
 */
import React from 'react';
import SysIcon from '@/components/SysIcon';
import { getDictObj } from '@/utils/globalDataUtils';
import style from './index.less';

type Props = {
  code: string;
  id: number | string;
  isLabel?: boolean;
};

const DictSysIcon = (props: Props) => {
  const { code, id, isLabel = true } = props;

  const dictObj = getDictObj(code, id);
  console.log(dictObj);

  return (
    <div className={style.dict_icon}>
      <SysIcon className={style.icon} type={dictObj?.icon} />
      {isLabel && <div className={style.text}>{dictObj?.value}</div>}
    </div>
  );
};

export default DictSysIcon;
