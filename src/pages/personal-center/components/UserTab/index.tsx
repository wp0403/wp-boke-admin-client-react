/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-14 09:58:48
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-14 15:36:03
 */
import React, { useEffect, useState } from 'react';
import { useThrottleEffect, useGetState } from 'ahooks';
import { Tabs, Pagination } from 'antd';
import LoadingCard from '@/components/LoadingCard';
import DataEmptyCard from '@/components/DataEmptyCard';
import ArticleItemCard from '../ArticleItemCard';
import DiaryItemCard from '../DiaryItemCard';
import ProjectItemCard from '../ProjectItemCard';
import CommentItemCard from '../CommentItemCard';
import BrowseItemCard from '../BrowseItemCard';
import style from './index.less';

import * as mack from '../../mock';

const UserTab = () => {
  const [list, setList] = useState<any[]>([]);
  const [page, setPage, getPage] = useGetState<number>(1);
  const [total, setTotal, getTotal] = useGetState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [tabNums, setTabNums] = useState<any>({});
  const [activeKey, setActiveKey] = useState<string>('article');
  // 获取列表数据
  const getList = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setList(mack[activeKey] || []);
    }, 600);
  };
  // 获取当前用户的tab数量
  const getUserTabNums = async () => {
    const obj = {
      article: 100,
      diary: 30,
      project: 80,
      comment: 90,
    };
    setTabNums(obj);
    setTotal(obj[activeKey]);
  };

  useThrottleEffect(
    () => {
      getList();
    },
    [page, activeKey],
    {
      leading: false,
      wait: 600,
    },
  );

  useEffect(() => {
    getUserTabNums();
  }, []);

  const onChange = (key: string) => {
    setActiveKey(key);
    setPage(1);
    setTotal(tabNums[key]);
    setList([]);
  };

  const changeCard = (v) => {
    switch (activeKey) {
      case 'article':
        return <ArticleItemCard item={v} />;

      case 'diary':
        return <DiaryItemCard item={v} />;

      case 'project':
        return <ProjectItemCard item={v} />;

      // case 'comment':
      //   return <CommentItemCard item={v} />;

      // case 'browse':
      //   return <BrowseItemCard item={v} />;

      default:
        return <DataEmptyCard type={2} />;
    }
  };

  // 当前标签页渲染的内容
  const tabContent = () => {
    return (
      <div className={style.tab_content}>
        {!loading && list[0] && (
          <>
            <div className={style.tab_list}>
              {list?.map((v) => changeCard(v))}
            </div>
            <div className={style.tab_pager}>
              <Pagination
                current={getPage()}
                pageSize={10}
                total={getTotal()}
                showSizeChanger={false}
                hideOnSinglePage={true}
              />
            </div>
          </>
        )}
        {loading && <LoadingCard />}
        {!loading && !list[0] && <DataEmptyCard type={2} />}
      </div>
    );
  };

  return (
    <div className={style.user_tab}>
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        tabBarGutter={40}
        items={[
          {
            label: `文章(${tabNums['article']})`,
            key: 'article',
            children: tabContent(),
          },
          {
            label: `旅行日记(${tabNums['diary']})`,
            key: 'diary',
            children: tabContent(),
          },
          {
            label: `项目(${tabNums['project']})`,
            key: 'project',
            children: tabContent(),
          },
          {
            label: `评论(${tabNums['comment']})`,
            key: 'comment',
            children: tabContent(),
          },
          {
            label: `浏览历史`,
            key: 'browse',
            children: tabContent(),
          },
        ]}
      />
    </div>
  );
};

export default UserTab;
