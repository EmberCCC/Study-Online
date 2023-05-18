const { app, assert } = require('egg-mock/bootstrap');
const { describe } = require('node:test');


describe('user', () => {
    describe('register', () => {

        let userInfo = {
            username: 'test',
            password: '123456',
            identify: 'student',
            profile: '{}'
        };


        it('Fill in the user registration information correctly', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            await app.httpRequest()
                .post('/api/user/register')
                .send(user)
                .expect(200)
                .expect({
                    success: true,
                    message: "注册成功"
                });
            const result = await app.mysql.delete('user', { "username": userInfo.username });
            assert(result.affectedRows === 1);
        })

        it('Username already exists', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            user.username = 'admin'
            await app.httpRequest()
                .post('/api/user/register')
                .send(user)
                .expect(200)
                .expect({
                    success: false,
                    message: "用户名已存在"
                });
        })

        it('Password length is less than 6 characters', async () => {

        })

    });
})

