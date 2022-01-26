/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

const { createProxyMiddleware } = require('http-proxy-middleware');

/*****************************************************************************/

const OPTIONS = {
  /* Local mode */
  local: {
    target: 'http://[::1]:9876',
    changeOrigin: true,
    logLevel: 'debug',
    secure: false,
  },

  /* Development mode */
  dev: {
    target: 'https://test.post.kz',
    changeOrigin: true,
    logLevel: 'debug',
    secure: false,
  },

  /* Stage mode */
  stage: {
    target: 'https://stage.post.kz',
    changeOrigin: true,
    secure: false,
  },

  /* Production mode */
  prod: {
    /* Define the target of your proxy, which will be the backend server */
    target: 'https://post.kz',
    changeOrigin: true,
    /* @see: https://github.com/chimurai/http-proxy-middleware/issues/233#issuecomment-355830567 */
    secure: false,
    // pathRewrite: {},
  },
};

const envs = {
  local: OPTIONS.local,
  development: OPTIONS.dev,
  stage: OPTIONS.stage,
  production: OPTIONS.prod,
};

// const proxies = new Map([
//   ['/auth/login', envs[process.env.REACT_APP_ENV] ?? envs['production']],
//   ['/crm-server/api/**', envs[process.env.REACT_APP_ENV] ?? envs['production']],
// ]);

const proxies = new Map([
  ['/admin-console-app/auth/login', OPTIONS.dev],
  // ['/auth/login', OPTIONS.local],
  ['/admin-console-app/crm-server/api/**', OPTIONS.dev],
  ['/admin-console-app/crm-server/v2/**', OPTIONS.dev]
]);

module.exports = function (app) {
  proxies.forEach((value, key, _) => {
    console.log('createProxyMiddleware', key);
    app.use(key, createProxyMiddleware(value));
  });
};
