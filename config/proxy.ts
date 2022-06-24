/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2022-01-22 13:20:17
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-16 16:37:38
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
    '/api/': {
      target: 'http://127.0.0.1:7002',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  test: {
    '/api/': {
      target: 'http://101.43.203.116/api/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'http://localhost:7001/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
} as any;
