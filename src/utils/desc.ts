// 网站关键字
const metaDesc =
  'html,css3,javaScript,vue3,react,umiJs,uni-app,taro,antd,echarts,webpack,axios,npm,nodejs,express,koa2,egg,mySql,jenkins,http,数据库,git,文集,生活,树洞';

// 字典列表
export const bowen_class_sub = [
  {
    id: '1',
    value: '前端',
    children: [
      { id: '1_1', value: 'html' },
      { id: '1_2', value: 'css3' },
      { id: '1_3', value: 'javaScript' },
      { id: '1_4', value: 'vue3' },
      { id: '1_5', value: 'react' },
      { id: '1_6', value: 'umiJs' },
      { id: '1_7', value: 'uni-app' },
      { id: '1_8', value: 'taro' },
      { id: '1_9', value: 'antd' },
      { id: '1_10', value: 'echarts' },
      { id: '1_11', value: 'webpack' },
      { id: '1_12', value: 'axios' },
      { id: '1_13', value: 'npm' },
      { id: '1_16', value: '其它' },
    ],
  },
  {
    id: '2',
    value: '后端',
    children: [
      { id: '2_1', value: 'nodejs' },
      { id: '2_2', value: 'express' },
      { id: '2_3', value: 'koa2' },
      { id: '2_4', value: 'egg' },
      { id: '2_5', value: 'mySql' },
      { id: '2_6', value: 'jenkins' },
      { id: '2_7', value: 'http' },
      { id: '2_8', value: '其它' },
    ],
  },
  {
    id: '3',
    value: '其它学习资料',
    children: [
      { id: '3_1', value: '数据库' },
      { id: '3_2', value: 'git' },
      { id: '3_3', value: '设计' },
    ],
  },
  {
    id: '4',
    value: '花若盛开',
    children: [{ id: '4_1', value: '文集' }],
  },
  {
    id: '5',
    value: '阳光自在',
    children: [{ id: '5_1', value: '生活' }],
  },
];

// 仅一级分类
export const bowen_class = [
  { id: '1', value: '前端' },
  { id: '2', value: '后端' },
  { id: '3', value: '其它学习资料' },
  { id: '4', value: '花若盛开' },
  { id: '5', value: '阳光自在' },
];

export const bowen_type = [
  { id: '1', value: '正常' },
  { id: '2', value: '审核未通过' },
  { id: '3', value: '审核中' },
];

// 背景图片数据
export const imgs = [
  { id: '1', value: '墨韵', src: '/bgImg/bg00001.jpg' },
  { id: '2', value: '墨韵', src: '/bgImg/bg00002.jpg' },
  { id: '3', value: '墨韵', src: '/bgImg/bg00003.jpg' },
  { id: '4', value: '墨韵', src: '/bgImg/bg00004.jpg' },
  { id: '5', value: '墨韵', src: '/bgImg/bg00005.jpg' },
  { id: '6', value: '墨韵', src: '/bgImg/bg00006.jpg' },
  { id: '7', value: '墨韵', src: '/bgImg/bg00007.jpg' },
  { id: '8', value: '墨韵', src: '/bgImg/bg00008.jpg' },
];

// 树洞导语
export const secretGuide = `在吗？先生？我有好多事情想与你说，你会替我保密的对吧？
  \\n先生，你在吗？为什么你从来都不会与我说说我没见过的世界啊？
  \\n先生，我遇到好多问题，但是我不知道能够跟谁去说说，你可以听我说吗？先生。
  \\n先生我不太开心，也说不上来为什么，呀！你怎么知道我在想什么，可是先生，我放不下啊！
  \\n先生，你也会不开心的吧，没关系的先生，我会一直在，一直在的。`;

// 天气
export const weatherList = [
  { id: '1', value: '晴', icon: 'icon-qingtian' },
  { id: '2', value: '夜晚', icon: 'icon-yewan-qingtian' },
  { id: '3', value: '阴', icon: 'icon-yin' },
  { id: '4', value: '雾', icon: 'icon-wu' },
  { id: '5', value: '霾', icon: 'icon-mai' },
  { id: '6', value: '小雨', icon: 'icon-xiaoyu' },
  { id: '7', value: '中雨', icon: 'icon-zhongyu' },
  { id: '8', value: '大雨', icon: 'icon-dayu' },
  { id: '9', value: '暴雨', icon: 'icon-baoyu' },
  { id: '10', value: '大暴雨', icon: 'icon-dabaoyu' },
  { id: '11', value: '阵雨', icon: 'icon-zhenyu' },
  { id: '12', value: '雷阵雨', icon: 'icon-leizhenyu' },
  { id: '13', value: '小雪', icon: 'icon-xiaoxue' },
  { id: '14', value: '中雪', icon: 'icon-zhongxue' },
  { id: '15', value: '大雪', icon: 'icon-daxue' },
  { id: '16', value: '暴雪', icon: 'icon-baoxue' },
  { id: '17', value: '刮风', icon: 'icon-guafeng' },
  { id: '18', value: '大风', icon: 'icon-dafeng' },
  { id: '19', value: '飓风', icon: 'icon-jufeng' },
  { id: '20', value: '扬沙', icon: 'icon-yangsha' },
  { id: '21', value: '沙尘暴', icon: 'icon-shachenbao' },
  { id: '22', value: '无', icon: 'icon-wu1' },
];

// 心情
export const moodList = [
  { id: '1', value: '无感', icon: 'icon-buzhidao' },
  { id: '2', value: '得意', icon: 'icon-deyi' },
  { id: '3', value: '孤独', icon: 'icon-gudu' },
  { id: '4', value: '充实', icon: 'icon-chongshi' },
  { id: '5', value: '烦躁', icon: 'icon-fanzao' },
  { id: '6', value: '暖心', icon: 'icon-nuanxin' },
  { id: '7', value: '惊喜', icon: 'icon-jingxi' },
  { id: '8', value: '开心', icon: 'icon-kaixin' },
  { id: '9', value: '难过', icon: 'icon-nanguo' },
  { id: '10', value: '梦境', icon: 'icon-mengjing' },
  { id: '11', value: '疲惫', icon: 'icon-pibei' },
  { id: '12', value: '迷茫', icon: 'icon-mimang' },
  { id: '13', value: '尴尬', icon: 'icon-ganga' },
  { id: '14', value: '努力', icon: 'icon-nuli' },
  { id: '15', value: '平静', icon: 'icon-pingjing' },
  { id: '16', value: '逃避', icon: 'icon-taobi' },
  { id: '17', value: '委屈', icon: 'icon-weiqu' },
  { id: '18', value: '生气', icon: 'icon-shengqi' },
  { id: '19', value: '甜蜜', icon: 'icon-tianmi' },
];
