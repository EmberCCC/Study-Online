const Controller = require('egg').Controller;

class UserController extends Controller {

    async login() {
        const { ctx, service } = this;
        const userInfo = ctx.request.body;
        const result = await service.user.login(userInfo.username, userInfo.password);
        ctx.body = result;
    }

    async register() {
        const { ctx, service } = this;
        const userInfo = ctx.request.body;
        const result = await service.user.register(userInfo);
        ctx.body = result;
    }

    async list() {
        const { ctx, service } = this;
        const result = await service.user.list();
        ctx.body = result;
    }

    async delete() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const result = await service.user.delete(id);
        ctx.body = result;
    }

    async update() {
        const { ctx, service } = this;
        const userInfo = ctx.request.body;
        const result = await service.user.update(userInfo);
        ctx.body = result;
    }

    async self() {
        const { ctx, service } = this;
        const result = await service.user.self();
        ctx.body = result;
    }

}

module.exports = UserController;
