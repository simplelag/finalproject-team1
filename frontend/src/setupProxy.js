const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/ttb',
        createProxyMiddleware({
            target: 'https://www.aladin.co.kr',
            changeOrigin: true,
        })
    );
};