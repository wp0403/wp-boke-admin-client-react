// https://umijs.org/config/
import { defineConfig } from 'umi';
import themeConfig from './themeConfig';
import proxy from './proxy';
import routes from './routes';

const { UMI_ENV } = process.env;

const devtoolMap = {
  dev: 'eval',
  test: 'source-map',
  pre: 'source-map',
  prod: 'hidden-source-map',
} as any;

export default defineConfig({
  /**
   * @desc 配置开发服务器。
   * @type object
   * @default {}
   * port，端口号，默认 8000
   * host，默认 0.0.0.0
   * https，是否启用 https server，同时也会开启 HTTP/2
   * writeToDisk，生成 assets 到文件系统
   */
  devServer: {
    port: 4000,
  },
  /**
   * @desc 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存。
   */
  hash: true,
  /**
   * @desc 用户配置 sourcemap 类型
   * @type string
   * @params eval，最快的类型，但不支持低版本浏览器，如果编译慢，可以试试  source-map，最慢最全的类型
   */
  devtool: devtoolMap[UMI_ENV || 'dev'],
  /**
   * @desc 国际化配置语言
   */
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  outputPath: '/admin',
  // base: '/admin',
  antd: {},
  dva: {
    hmr: true,
  },
  /**
   * @desc 配置 history 类型和配置项
   * @type object
   * @params {type: 'browser'}
   */
  history: {
    type: 'browser',
  },
  /**
   * @desc 是否启用按需加载，即是否把构建产物进行拆分，在需要的时候下载额外的 JS 再执行。
   * @type object
   * @default false
   * 子配置项 loading, 类型为字符串，指向 loading 组件文件
   */
  dynamicImport: {
    loading: '@/components/LoadingCard',
  },
  /**
   * @desc 配置需要兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换。
   * @type object
   * @default { chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10 }
   */
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: themeConfig,
  // 配置标题。
  title: '于风里读诗的网站后台管理',
  // 忽略 moment 的 locale 文件，用于减少尺寸。
  ignoreMomentLocale: true,
  // 配置代理能力。
  proxy: proxy[UMI_ENV || 'dev'],
  /**
   * @desc 配置是否需要生成额外用于描述产物的 manifest 文件，默认会生成 asset-manifest.json
   * basePath，给所有文件路径加前缀
   */
  // manifest: {
  //   basePath: '/',
  // },
  /**
   * 配置favicon图标
   */
  favicon: '/favicon.ico',
  // 快速刷新功能 https://umijs.org/config#fastrefresh
  fastRefresh: {},
  // esbuild: {},
  // 使用 webpack 5 代替 webpack 4 进行构建。
  // webpack5: {},
});
