const Controller = require('egg').Controller;

class CourseController extends Controller {
    async list() {
        const { ctx } = this;
        const result = await ctx.service.course.list();
        ctx.body = result;
    }

    async add() {
        const { ctx } = this;
        const result = await ctx.service.course.add(ctx.request.body);
        ctx.body = result;
    }

    async delete() {
        const { ctx } = this;
        const result = await ctx.service.course.delete(ctx.params.id);
        ctx.body = result;
    }

    async update() {
        const { ctx } = this;
        const result = await ctx.service.course.update(ctx.request.body);
        ctx.body = result;
    }

    async listContent() {
        const { ctx } = this;
        const result = await ctx.service.course.listContent(ctx.params.id);
        ctx.body = result;
    }

    async addContent() {
        const { ctx } = this;
        const result = await ctx.service.course.addContent(ctx.request.body);
        ctx.body = result;
    }

    async updateContent() {
        const { ctx } = this;
        const result = await ctx.service.course.updateContent(ctx.request.body);
        ctx.body = result;
    }

    async deleteContent() {
        const { ctx } = this;
        const result = await ctx.service.course.deleteContent(ctx.params.id);
        ctx.body = result;
    }

    async listMyJoinCourses() {
        const { ctx } = this;
        const result = await ctx.service.course.listMyJoinCourse();
        ctx.body = result;
    }

    async join() {
        const { ctx } = this;
        const result = await ctx.service.course.joinCourse(ctx.params.id);
        ctx.body = result;
    }

    async unjoin() {
        const { ctx } = this;
        const result = await ctx.service.course.quitCourse(ctx.params.id);
        ctx.body = result;
    }


}

module.exports = CourseController;