const path = require('path');
const fs = require('fs');
module.exports = app => {
  const config = {};

  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true
  }

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '192.168.123.112',
      // 端口号
      port: '3307',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'study',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  config.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  config.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  config.keys = '123456';

  config.middleware = [
    'locals',
    'access'
  ];

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks'
    }
  };

  config.reactssr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html')
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };


  return config;
};
