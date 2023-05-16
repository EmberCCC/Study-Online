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

  return config;
};
