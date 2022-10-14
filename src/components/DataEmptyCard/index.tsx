/*
 * @Descripttion: 空状态组件
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-07 17:34:14
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-13 23:27:40
 */
import React from 'react';
import noResult from '../../../public/defaultGraph/noResult.svg';
import empty from '../../../public/defaultGraph/empty.svg';
import noQA from '../../../public/defaultGraph/noQA.svg';
import noImg from '../../../public/defaultGraph/noImg.svg';
import noImg2 from '../../../public/defaultGraph/noImg2.svg';
import noContent from '../../../public/defaultGraph/noContent.svg';
import noContent2 from '../../../public/defaultGraph/noContent2.svg';
import noNews from '../../../public/defaultGraph/noNews.svg';
import noJurisdiction from '../../../public/defaultGraph/noJurisdiction.svg';
import uploadFailed from '../../../public/defaultGraph/uploadFailed.svg';
import style from './index.less';

/**
 * @param type
 * @returns 1 没有搜索结果
 * @returns 2 没有内容
 * @returns 3 没有内容2
 * @returns 5 没有权限
 * @returns 6 没有问答
 * @returns 7 没有消息
 * @returns 8 图片加载失败
 * @returns 9 图片加载失败2
 * @returns 10 上传失败
 */

const DataEmptyCard = (props: any) => {
  const selectImg = () => {
    switch (props.type) {
      case 1:
        return noResult;
      case 2:
        return noContent;
      case 3:
        return noContent2;
      case 4:
        return noResult;
      case 5:
        return noJurisdiction;
      case 6:
        return noQA;
      case 7:
        return noNews;
      case 8:
        return noImg;
      case 9:
        return noImg2;
      case 10:
        return uploadFailed;
      default:
        return empty;
    }
  };
  return (
    <div className={style.dataEmptyCard}>
      <img src={selectImg()} style={props.style || null} alt="" />
    </div>
  );
};

export default DataEmptyCard;
