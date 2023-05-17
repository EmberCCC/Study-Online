
'use strict';
module.exports = app => {
  // app.get('/', app.controller.spa.home.home);
  app.post('/api/user/login', app.controller.user.login);
  app.post('/api/user/register', app.controller.user.register);
  app.get('/api/user/list', app.controller.user.list);
  app.delete('/api/user/delete/:id', app.controller.user.delete);
  app.put('/api/user/update', app.controller.user.update);
  // app.redirect('/', '/spa');
  app.get('(/.*)?', app.controller.spa.home.home);
};
