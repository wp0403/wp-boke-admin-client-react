/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2022-01-22 13:20:17
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-09-08 17:28:11
 */
/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/adminApi/': {
      target: 'https://admin.wp-boke.work/adminApi',
      // target: 'http://localhost:7002',
      changeOrigin: true,
      pathRewrite: { '^/adminApi': '' },
    },
  },
  test: {
    '/adminApi/': {
      target: 'http://101.43.203.116/adminApi/',
      changeOrigin: true,
      pathRewrite: { '^/adminApi': '' },
    },
  },
  pre: {
    '/adminApi/': {
      target: 'http://localhost:7002',
      changeOrigin: true,
      pathRewrite: { '^/adminApi': '' },
    },
  },
} as any;
