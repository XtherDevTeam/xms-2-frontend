const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/xms/api',
    createProxyMiddleware({
      target: 'https://www.xiaokang00010.top:11452/api/',
      changeOrigin: true,
      pathRewrite: {
        '^/xms/api': '' //remove /api
      }
    })
  );
  app.use(
    '/xms/lyric',
    createProxyMiddleware({
      target: 'https://api.vkeys.cn',
      changeOrigin: true,
      pathRewrite: {
        '^/xms/lyric': '' //remove /api
      }
    })
  );
};