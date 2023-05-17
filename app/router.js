
'use strict';
module.exports = app => {
  app.post('/api/user/login', app.controller.user.login);
  app.post('/api/user/register', app.controller.user.register);
  app.get('/api/user/list', app.controller.user.list);
  app.delete('/api/user/delete/:id', app.controller.user.delete);
  app.put('/api/user/update', app.controller.user.update);


  app.get('/api/course/list', app.controller.course.list);
  app.post('/api/course/add', app.controller.course.add);
  app.delete('/api/course/delete/:id', app.controller.course.delete);
  app.put('/api/course/update', app.controller.course.update);
  app.get('/api/course/listMyJoinCourses', app.controller.course.listMyJoinCourses);
  app.post('/api/course/join/:id', app.controller.course.join);
  app.delete('/api/course/quit/:id', app.controller.course.unjoin);

  app.get('/api/course/listContent/:id', app.controller.course.listContent);
  app.post('/api/course/addContent', app.controller.course.addContent);
  app.put('/api/course/updateContent', app.controller.course.updateContent);
  app.delete('/api/course/deleteContent/:id', app.controller.course.deleteContent);


  app.get('/api/book/list', app.controller.book.list);
  app.post('/api/book/add', app.controller.book.add);
  app.delete('/api/book/delete/:id', app.controller.book.delete);
  app.put('/api/book/update', app.controller.book.update);
  app.get('/api/book/listMyStarBooks', app.controller.book.listMyStarBooks);
  app.post('/api/book/star/:id', app.controller.book.star);
  app.delete('/api/book/unstar/:id', app.controller.book.unstar);
  // app.redirect('/', '/spa');
  app.get('(/.*)?', app.controller.spa.home.home);
};
