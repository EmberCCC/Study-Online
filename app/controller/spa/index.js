
module.exports = app => {
  return class AdminController extends app.Controller {
    async login() {
      const { ctx } = this;
      await ctx.renderClient('login.js', {name:123});
    }

    async home(ctx) {
      const list = ctx.service.mock.getArticleList();
      if (ctx.query.mode === 'ssr') {
        await ctx.render('spa.js', { prefix: '/spa', url: ctx.url, list });
      } else {
        await ctx.renderClient('spa.js', { prefix: '/spa', url: ctx.url, list });
      }
    }

    async detail() {
      const { ctx } = this;
      // 调用 service 创建一个 topic
      const list = ctx.service.mock.getArticleList();
    
      ctx.body = list
      ctx.status = 200;
    }

    

  };
};