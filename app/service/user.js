const { Service } = require('egg');
const crypto = require('crypto');

class UserService extends Service {

    async login(username, password) {
        const { app, ctx } = this;
        const user = await app.mysql.get('user', { "username": username });
        if (!user) {
            return {
                success: false,
                message: "用户名不存在"
            }
        }
        const md5 = crypto.createHash('md5');
        //compare password
        const target = user.password;
        const pwd = md5.update(password).digest('hex');
        if (pwd !== target) {
            return {
                success: false,
                message: "用户名或密码错误"
            }
        }
        if (user.status === 2) {
            return {
                success: false,
                message: "用户已被禁用"
            }
        }

        ctx.session.userId = user.id;
        return {
            success: true,
            message: "登录成功"
        }
    }

    async list() {
        const { app, ctx } = this;



        const userId = ctx.session.userId;


        const user = await app.mysql.get('user', { "id": userId });
        // if (!user && user.identify !== "admin") {
        //     return {
        //         success: false,
        //         message: "用户不存在或权限不足"
        //     }
        // }
        const result = await app.mysql.select('user');
        // remove password field
        result.forEach(item => {
            delete item.password;
        })
        return result;
    }

    async register(userInfo) {
        const { app, ctx } = this;
        const user = await app.mysql.get('user', { "username": userInfo.username });
        if (user) {
            return {
                success: false,
                message: "用户名已存在"
            }
        }

        const md5 = crypto.createHash('md5');

        // password must be longer than 6 characters
        if (userInfo.password.length < 6) {
            return {
                success: false,
                message: "密码长度不能小于6位"
            }
        }


        const result = await app.mysql.insert('user', {
            "username": userInfo.username,
            "password": md5.update(userInfo.password).digest('hex'),
            "identify": userInfo.identify,
            "profile": userInfo.profile,
        })
        if (result.affectedRows === 1) {
            return {
                success: true,
                message: "注册成功"
            }
        }
        return {
            success: false,
            message: "注册失败"
        }
    }

    async delete(id) {
        const { app, ctx } = this;
        // only admin can delete user
        if (ctx.session.userId === undefined || ctx.session.userId === null) {
            return {
                success: false,
                message: "请先登录"
            }
        }
        const user = await app.mysql.get('user', { "id": ctx.session.userId });
        if (user.identify !== 'admin') {
            return {
                success: false,
                message: "权限不足"
            }
        }

        const result = await app.mysql.delete('user', { "id": id });
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

    async deleteByUserName(username) {
        const { app } = this;
        const result = await app.mysql.delete('user', { "username": username });
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

    async update(userInfo) {
        const { app, ctx } = this;

        const md5 = crypto.createHash('md5');

        const result = await app.mysql.update('user', {
            "id": userInfo.id,
            "username": userInfo.username,
            "password": md5.update(userInfo.password).digest('hex'),
            "identify": userInfo.identify,
            "profile": userInfo.profile,
        });
        if (result.affectedRows === 1) {
            return {
                success: true,
                message: "更新成功"
            }
        }
        return {
            success: false,
            message: "更新失败"
        }
    }

    async self() {
        const { app, ctx } = this;
        const userId = ctx.session.userId;
        const user = await app.mysql.get('user', { "id": userId });
        if (!user) {
            return {
                success: false,
                message: "用户不存在"
            }
        }
        return {
            success: true,
            message: "获取成功",
            data: user
        }
    }

}

module.exports = UserService;
