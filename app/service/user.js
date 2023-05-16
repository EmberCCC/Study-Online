const { Service } = require('egg');
const crypto = require('crypto');

class UserService extends Service {

    async login(username, password) {
        const { ctx } = this;
        const user = await ctx.db.queryOne('select * from user where username = ?', [username]);
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
                message: "密码错误"
            }
        }
        ctx.session.userId = user.id;
        return {
            success: true,
            message: "登录成功"
        }
    }
}

module.exports = UserService;
