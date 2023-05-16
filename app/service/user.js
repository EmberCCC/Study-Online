const { Service } = require('egg');
const crypto = require('crypto');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node')
const userDBFile = "../db/user.json"

class UserService extends Service {
    constructor() {
        super();
        const adapter = new JSONFile(userDBFile)
        this.db = new Low(adapter)

    }

    async login(username, password) {
        const { db, ctx } = this;
        await db.read()
        const user = db.data.users.find(user => user.username === username)
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

