// 网站关键字
const metaDesc =
  'html,css3,javaScript,vue3,react,umiJs,uni-app,taro,antd,echarts,webpack,axios,npm,nodejs,express,koa2,egg,mySql,jenkins,http,数据库,git,文集,生活,树洞';

// 字典列表
export const bowen_class_sub = [
  {
    id: 1,
    classDesc: '前端',
    children: [
      { id: '1_1', classDesc: 'html' },
      { id: '1_2', classDesc: 'css3' },
      { id: '1_3', classDesc: 'javaScript' },
      { id: '1_4', classDesc: 'vue3' },
      { id: '1_5', classDesc: 'react' },
      { id: '1_6', classDesc: 'umiJs' },
      { id: '1_7', classDesc: 'uni-app' },
      { id: '1_8', classDesc: 'taro' },
      { id: '1_9', classDesc: 'antd' },
      { id: '1_10', classDesc: 'echarts' },
      { id: '1_11', classDesc: 'webpack' },
      { id: '1_12', classDesc: 'axios' },
      { id: '1_13', classDesc: 'npm' },
      { id: '1_16', classDesc: '其它' },
    ],
  },
  {
    id: 2,
    classDesc: '后端',
    children: [
      { id: '2_1', classDesc: 'nodejs' },
      { id: '2_2', classDesc: 'express' },
      { id: '2_3', classDesc: 'koa2' },
      { id: '2_4', classDesc: 'egg' },
      { id: '2_5', classDesc: 'mySql' },
      { id: '2_6', classDesc: 'jenkins' },
      { id: '2_7', classDesc: 'http' },
      { id: '2_8', classDesc: '其它' },
    ],
  },
  {
    id: 3,
    classDesc: '其它学习资料',
    children: [
      { id: '3_1', classDesc: '数据库' },
      { id: '3_2', classDesc: 'git' },
      { id: '3_3', classDesc: '设计' },
    ],
  },
  {
    id: 4,
    classDesc: '花若盛开',
    children: [{ id: '4_1', classDesc: '文集' }],
  },
  {
    id: 5,
    classDesc: '阳光自在',
    children: [{ id: '5_1', classDesc: '生活' }],
  },
];

// 仅一级分类
export const bowen_class = [
  { id: 1, classDesc: '前端' },
  { id: 2, classDesc: '后端' },
  { id: 3, classDesc: '其它学习资料' },
  { id: 4, classDesc: '花若盛开' },
  { id: 5, classDesc: '阳光自在' },
];

// 背景图片数据
export const imgs = [
  { id: 1, title: '墨韵', src: '/bgImg/bg00001.jpg' },
  { id: 2, title: '墨韵', src: '/bgImg/bg00002.jpg' },
  { id: 3, title: '墨韵', src: '/bgImg/bg00003.jpg' },
  { id: 4, title: '墨韵', src: '/bgImg/bg00004.jpg' },
  { id: 5, title: '墨韵', src: '/bgImg/bg00005.jpg' },
  { id: 6, title: '墨韵', src: '/bgImg/bg00006.jpg' },
  { id: 7, title: '墨韵', src: '/bgImg/bg00007.jpg' },
  { id: 8, title: '墨韵', src: '/bgImg/bg00008.jpg' },
];

// 树洞导语
export const secretGuide = `在吗？先生？我有好多事情想与你说，你会替我保密的对吧？
  \\n先生，你在吗？为什么你从来都不会与我说说我没见过的世界啊？
  \\n先生，我遇到好多问题，但是我不知道能够跟谁去说说，你可以听我说吗？先生。
  \\n先生我不太开心，也说不上来为什么，呀！你怎么知道我在想什么，可是先生，我放不下啊！
  \\n先生，你也会不开心的吧，没关系的先生，我会一直在，一直在的。`;

// 天气
export const weatherList = [
  { id: 1, name: '晴', icon: 'icon-qingtian' },
  { id: 2, name: '夜晚', icon: 'icon-yewan-qingtian' },
  { id: 3, name: '阴', icon: 'icon-yin' },
  { id: 4, name: '雾', icon: 'icon-wu' },
  { id: 5, name: '霾', icon: 'icon-mai' },
  { id: 6, name: '小雨', icon: 'icon-xiaoyu' },
  { id: 7, name: '中雨', icon: 'icon-zhongyu' },
  { id: 8, name: '大雨', icon: 'icon-dayu' },
  { id: 9, name: '暴雨', icon: 'icon-baoyu' },
  { id: 10, name: '大暴雨', icon: 'icon-dabaoyu' },
  { id: 11, name: '阵雨', icon: 'icon-zhenyu' },
  { id: 12, name: '雷阵雨', icon: 'icon-leizhenyu' },
  { id: 13, name: '小雪', icon: 'icon-xiaoxue' },
  { id: 14, name: '中雪', icon: 'icon-zhongxue' },
  { id: 15, name: '大雪', icon: 'icon-daxue' },
  { id: 16, name: '暴雪', icon: 'icon-baoxue' },
  { id: 17, name: '刮风', icon: 'icon-guafeng' },
  { id: 18, name: '大风', icon: 'icon-dafeng' },
  { id: 19, name: '飓风', icon: 'icon-jufeng' },
  { id: 20, name: '扬沙', icon: 'icon-yangsha' },
  { id: 21, name: '沙尘暴', icon: 'icon-shachenbao' },
  { id: 22, name: '无', icon: 'icon-wu1' },
];

// 心情
export const moodList = [
  { id: 1, name: '无感', icon: 'icon-buzhidao' },
  { id: 2, name: '得意', icon: 'icon-deyi' },
  { id: 3, name: '孤独', icon: 'icon-gudu' },
  { id: 4, name: '充实', icon: 'icon-chongshi' },
  { id: 5, name: '烦躁', icon: 'icon-fanzao' },
  { id: 6, name: '暖心', icon: 'icon-nuanxin' },
  { id: 7, name: '惊喜', icon: 'icon-jingxi' },
  { id: 8, name: '开心', icon: 'icon-kaixin' },
  { id: 9, name: '难过', icon: 'icon-nanguo' },
  { id: 10, name: '梦境', icon: 'icon-mengjing' },
  { id: 11, name: '疲惫', icon: 'icon-pibei' },
  { id: 12, name: '迷茫', icon: 'icon-mimang' },
  { id: 13, name: '尴尬', icon: 'icon-ganga' },
  { id: 14, name: '努力', icon: 'icon-nuli' },
  { id: 15, name: '平静', icon: 'icon-pingjing' },
  { id: 16, name: '逃避', icon: 'icon-taobi' },
  { id: 17, name: '委屈', icon: 'icon-weiqu' },
  { id: 18, name: '生气', icon: 'icon-shengqi' },
  { id: 19, name: '甜蜜', icon: 'icon-tianmi' },
];
