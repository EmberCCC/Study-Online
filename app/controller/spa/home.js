const Controller = require('egg').Controller;

class HomeController extends Controller {
  async home() {
    const { ctx } = this;
    if(ctx.query.mode === 'ssr'){
      await ctx.render('spa.js');
    }else{
      await ctx.renderClient('spa.js');
    }
  }
}

module.exports = HomeController;