const { Service } = require('egg');

class CourseService extends Service {

    async list() {
        const { app } = this;
        const result = await app.mysql.select('course');
        return result;
    }

    async add(courseInfo) {
        const { app, ctx } = this;

        if (ctx.session.userId === undefined || ctx.session.userId === null) {
            return {
                success: false,
                message: "请先登录"
            }
        }
        const user = await app.mysql.get('user', { "id": ctx.session.userId });
        if (user.identify !== 'admin' && user.identify !== 'teacher') {
            return {
                success: false,
                message: "权限不足"
            }
        }


        //get current timestamp number  
        const timestamp = Date.parse(new Date());

        const result = await app.mysql.insert('course', {
            "name": courseInfo.name,
            "details": courseInfo.details,
            "teacher_desc": courseInfo.teacher_desc,
            "teacher_id": courseInfo.teacher_id,
            "start_time": timestamp,
        });

        if (result.affectedRows === 1) {
            return {
                success: true,
                message: "添加成功"
            }
        }
        return {
            success: false,
            message: "添加失败"
        }
    }

    async delete(id) {
        const { app, ctx } = this;
        if (ctx.session.userId === undefined || ctx.session.userId === null) {
            return {
                success: false,
                message: "请先登录"
            }
        }
        const course = app.mysql.get('course', { "id": id });
        if (!course) {
            return {
                success: false,
                message: "课程不存在"
            }
        }
        const user = app.mysql.get('user', { "id": ctx.session.userId });
        if (course.teacher_id !== user.id && user.identify !== 'admin') {
            return {
                success: false,
                message: "权限不足"
            }
        }

        const result = await app.mysql.delete('course', { "id": id });
        if (result.affectedRows === 1) {
            return {
                success: true,
                message: "删除成功"
            }
        }
        return {
            success: false,
            message: "删除失败"
        }
    }

    async update(courseInfo) {
        const { app, ctx } = this;
        if (ctx.session.userId === undefined || ctx.session.userId === null) {
            return {
                success: false,
                message: "请先登录"
            }
        }
        const course = app.mysql.get('course', { "id": courseInfo.id });
        if (!course) {
            return {
                success: false,
                message: "课程不存在"
            }
        }
        const user = app.mysql.get('user', { "id": ctx.session.userId });
        if (course.teacher_id !== user.id && user.identify !== 'admin') {
            return {
                success: false,
                message: "权限不足"
            }
        }
        console.log(courseInfo);
        const result = await app.mysql.update('course', {
            "id": courseInfo.id,
            "name": courseInfo.name,
            "details": courseInfo.detail,
            "teacher_desc": courseInfo.teacher_desc,
            "teacher_id": courseInfo.teacher_id,
            "start_time": courseInfo.start_time,
            "profile": courseInfo.profile,
        });
        if (result.affectedRows === 1) {
            return {
                success: true,
                message: "修改成功"
            }
        }
        return {
            success: false,
            message: "修改失败"
        }
    }

    async listContent(id) {
        const { app } = this;
        const result = await app.mysql.select('course_content', {
            where: { "course_id": id },
            orders: [['create_time', 'desc']]
        });
        return result;
    }

    async addContent(contentInfo) {
        const { app, ctx } = this;
        if (ctx.session.userId === undefined || ctx.session.userId === null) {
            return {
                success: false,
                message: "请先登录"
            }
        }
        const course = app.mysql.get('course', { "id": contentInfo.course_id });
        if (!course) {
            return {
                success: false,
                message: "课程不存在"
            }
        }
        const user = app.mysql.get('user', { "id": ctx.session.userId });
        if (course.teacher_id !== user.id && user.identify !== 'admin') {
            return {
                success: false,
                message: "权限不足"
            }
        }

        const result = await app.mysql.insert('course_content', {
            "course_id": contentInfo.course_id,
            "title": contentInfo.title,
            "content": contentInfo.content
        });

        if (result.affectedRows === 1) {
            return {
                success: true,
                message: "添加成功"
            }
        }
        return {
            success: false,
            message: "添加失败"
        }
    }

    async deleteContent(id) {
        const { app, ctx } = this;
        if (ctx.session.userId === undefined || ctx.session.userId === null) {
            return {
                success: false,
                message: "请先登录"
            }
        }
        const content = app.mysql.get('course_content', { "id": id });
        if (!content) {
            return {
                success: false,
                message: "内容不存在"
            }
        }
        const course = app.mysql.get('course', { "id": content.course_id });
        if (!course) {
            return {
                success: false,
                message: "课程不存在"
            }
        }
        const user = app.mysql.get('user', { "id": ctx.session.userId });
        if (course.teacher_id !== user.id && user.identify !== 'admin') {
            return {
                success: false,
                message: "权限不足"
            }
        }

        const result = await app.mysql.delete('course_content', { "id": id });
        if (result.affectedRows === 1) {
            return {
                success: true,
                message: "删除成功"
            }
        }
        return {
            success: false,
            message: "删除失败"
        }
    }

    async updateContent(contentInfo) {
        const { app, ctx } = this;
        if (ctx.session.userId === undefined || ctx.session.userId === null) {
            return {
                success: false,
                message: "请先登录"
            }
        }
        const content = app.mysql.get('course_content', { "id": contentInfo.id });
        if (!content) {
            return {
                success: false,
                message: "内容不存在"
            }
        }
        const course = app.mysql.get('course', { "id": content.course_id });
        if (!course) {
            return {
                success: false,
                message: "课程不存在"
            }
        }
        const user = app.mysql.get('user', { "id": ctx.session.userId });
        if (course.teacher_id !== user.id && user.identify !== 'admin') {
            return {
                success: false,
                message: "权限不足"
            }
        }

        const result = await app.mysql.update('course_content', {
            "course_id": contentInfo.course_id,
            "title": contentInfo.title,
            "content": contentInfo.content
        });
        if (result.affectedRows === 1) {
            return {
                success: true,
                message: "修改成功"
            }
        }
        return {
            success: false,
            message: "修改失败"
        }
    }

    async listMyJoinCourse() {
        const { app, ctx } = this;
        const userId = ctx.session.userId;
        if (userId === undefined || userId === null) {
            return {
                success: false,
                message: "请先登录"
            }
        }
        const courses = await app.mysql.query('select * from course where id in (select course_id from user_join_course where user_id = ?)', [userId]);
        return courses;
    }

    async joinCourse(courseId) {
        const { app, ctx } = this;
        const userId = ctx.session.userId;
        if (userId === undefined || userId === null) {
            return {
                success: false,
                message: "请先登录"
            }
        }
        const course = await app.mysql.get('course', { "id": courseId });
        if (!course) {
            return {
                success: false,
                message: "课程不存在"
            }
        }
        const user = await app.mysql.get('user', { "id": userId });
        if (!user) {
            return {
                success: false,
                message: "用户不存在"
            }
        }
        const result = await app.mysql.insert('user_join_course', {
            "user_id": userId,
            "course_id": courseId
        });
        if (result.affectedRows === 1) {
            return {
                success: true,
                message: "加入成功"
            }
        }
        return {
            success: false,
            message: "加入失败"
        }
    }

    async quitCourse(courseId) {
        const { app, ctx } = this;
        const userId = ctx.session.userId;
        if (userId === undefined || userId === null) {
            return {
                success: false,
                message: "请先登录"
            }
        }
        const course = await app.mysql.get('course', { "id": courseId });
        if (!course) {
            return {
                success: false,
                message: "课程不存在"
            }
        }
        const user = await app.mysql.get('user', { "id": userId });
        if (!user) {
            return {
                success: false,
                message: "用户不存在"
            }
        }
        const result = await app.mysql.delete('user_join_course', {
            "user_id": userId,
            "course_id": courseId
        });
        if (result.affectedRows === 1) {
            return {
                success: true,
                message: "退出成功"
            }
        }
        return {
            success: false,
            message: "退出失败"
        }
    }

}

module.exports = CourseService;