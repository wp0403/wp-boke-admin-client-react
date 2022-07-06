/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2022-01-22 13:20:17
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-07-06 10:18:53
 */
export default [
  {
    path: '/login',
    component: '../layouts/login',
  },
  {
    path: '/',
    component: '../layouts/LayoutComponent',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: '首页',
        icon: 'icon-a-shouyezhuyefangzi',
        routes: [
          {
            path: '/home',
            redirect: '/home/statistics',
          },
          {
            path: '/home/statistics',
            name: '数据统计',
            exact: true,
            component: './home',
          },
        ],
      },
      {
        path: '/classify',
        name: '博文',
        icon: 'icon-a-wendangjiludingdan',
        routes: [
          {
            path: '/classify',
            redirect: '/classify/list',
          },
          {
            path: '/classify/list',
            name: '博文列表',
            exact: true,
            component: './classify',
          },
          {
            path: '/classify/:id/details',
            exact: true,
            component: './classify-details',
          },
          {
            path: '/classify/add-bowen',
            exact: true,
            component: './classify-add',
          },
        ],
      },
      {
        path: '/itinerary',
        name: '旅行日记',
        icon: 'icon-a-biaojitudingdidian',
        routes: [
          {
            path: '/itinerary',
            redirect: '/itinerary/list',
          },
          {
            path: '/itinerary/list',
            name: '旅行列表',
            exact: true,
            component: './itinerary',
          },
          {
            path: '/itinerary/:id/details',
            exact: true,
            component: './itinerary-details',
          },
        ],
      },
      {
        path: '/projectLibrary',
        name: '项目库',
        icon: 'icon-a-gengduocaidangongneng',
        routes: [
          {
            path: '/projectLibrary',
            redirect: '/projectLibrary/list',
          },
          {
            path: '/projectLibrary/list',
            name: '项目列表',
            exact: true,
            component: './project-library',
          },
        ],
      },
      {
        path: '/secret',
        name: '树洞先生',
        icon: 'icon-a-renwuqingdanliebiao',
        routes: [
          {
            path: '/secret',
            redirect: '/secret/list',
          },
          {
            path: '/secret/list',
            name: '树洞列表',
            exact: true,
            component: './secret',
          },
        ],
      },
      {
        path: '/timeAxis',
        name: '时间轴',
        icon: 'icon-a-shijianzuijin',
        routes: [
          {
            path: '/timeAxis',
            redirect: '/timeAxis/list',
          },
          {
            path: '/timeAxis/list',
            name: '时间轴列表',
            exact: true,
            component: './timeAxis',
          },
        ],
      },
      {
        path: '/403',
        component: '@/pages/error/403',
      },
      {
        path: '/404',
        component: '@/pages/error/404',
      },
      {
        path: '/500',
        component: '@/pages/error/500',
      },
    ],
  },
];
