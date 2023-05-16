const Controller = require('egg').Controller;

class UserController extends Controller {

    async login() {
        const { ctx, service } = this;
        const userInfo = ctx.request.body;
        const result = await service.user.login(userInfo.username, userInfo.password);
        ctx.body = result;
    }

}

module.exports = UserController;
