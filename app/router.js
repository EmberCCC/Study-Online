
'use strict';
module.exports = app => {
  app.get('/', app.controller.spa.home.home);
  app.post('/api/user/login', app.controller.user.login);
};
