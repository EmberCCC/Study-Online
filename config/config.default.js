const path = require("path");
const fs = require("fs");
module.exports = (app) => {
  const config = {};

  config.session = {
    key: "EGG_SESS",
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: false,
    encrypt: false,
    renew: true,
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: "database-1.cny3yynkfqmk.ap-northeast-1.rds.amazonaws.com",
      // 端口号
      port: "3306",
      // 用户名
      user: "root",
      // 密码
      password: "f54>8KP:LpoGLcDUyd$Iu%MsJ{1G",
      // 数据库名
      database: "study",
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.siteFile = {
    "/favicon.ico": fs.readFileSync(
      path.join(app.baseDir, "app/web/asset/images/favicon.ico")
    ),
  };

  config.logger = {
    consoleLevel: "DEBUG",
    dir: path.join(app.baseDir, "logs"),
  };

  config.static = {
    prefix: "/public/",
    dir: path.join(app.baseDir, "public"),
  };

  config.keys = "123456";

  config.middleware = ["locals", "access"];

  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      ".tpl": "nunjucks",
    },
  };

  config.reactssr = {
    layout: path.join(app.baseDir, "app/web/view/layout.html"),
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
