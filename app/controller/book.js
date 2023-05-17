const Controller = require('egg').Controller;

class BookController extends Controller {

    async list() {
        const { ctx, service } = this;
        const result = await service.book.list();
        ctx.body = result;
    }

    async add() {
        const { ctx, service } = this;
        const result = await service.book.add(ctx.request.body);
        ctx.body = result;
    }

    async delete() {
        const { ctx, service } = this;
        const result = await service.book.delete(ctx.params.id);
        ctx.body = result;
    }

    async update() {
        const { ctx, service } = this;
        const result = await service.book.update(ctx.request.body);
        ctx.body = result;
    }

    async listMyStarBooks() {
        const { ctx, service } = this;
        const result = await service.book.listMyStarBooks();
        ctx.body = result;
    }

    async star() {
        const { ctx, service } = this;
        const result = await service.book.starBook(ctx.params.id);
        ctx.body = result;
    }

    async unstar() {
        const { ctx, service } = this;
        const result = await service.book.unstarBook(ctx.params.id);
        ctx.body = result;
    }

}

module.exports = BookController;