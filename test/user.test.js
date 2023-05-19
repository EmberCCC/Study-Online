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
            let user = JSON.parse(JSON.stringify(userInfo));
            user.password = '12345'
            await app.httpRequest()
                .post('/api/user/register')
                .send(user)
                .expect(200)
                .expect({
                    success: false,
                    message: "密码长度不能小于6位"
                });
        })

    });

    describe('login', () => {

        let userInfo = {
            username: 'teacher',
            password: '123456',
        }

        it('Username and password match', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            await app.httpRequest()
                .post('/api/user/login')
                .send(user)
                .expect(200)
                .expect({
                    success: true,
                    message: "登录成功"
                });
        })

        it('Username and password does not match', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            user.password = '12345'
            await app.httpRequest()
                .post('/api/user/login')
                .send(user)
                .expect(200)
                .expect({
                    success: false,
                    message: "用户名或密码错误"
                });
        })

        it('User is disabled', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            user.username = 'disabled'
            await app.httpRequest()
                .post('/api/user/login')
                .send(user)
                .expect(200)
                .expect({
                    success: false,
                    message: "用户已被禁用"
                });
        })

        it('User does not exist', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            user.username = 'notexist'
            await app.httpRequest()
                .post('/api/user/login')
                .send(user)
                .expect(200)
                .expect({
                    success: false,
                    message: "用户名不存在"
                });

        })

    })

    describe('star book', () => {

        let userInfo = {
            userId: 2
        }
        let bookInfo = {
            id: 1
        }

        it('Collect books after user login', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user)
            let book = JSON.parse(JSON.stringify(bookInfo));
            await app.httpRequest()
                .post('/api/book/star/' + book.id)
                .expect(200)
                .expect({
                    success: true,
                    message: "收藏成功"
                });

            await app.httpRequest()
                .delete('/api/book/unstar/' + book.id)
                .expect(200)
                .expect({
                    success: true,
                    message: "取消收藏成功"
                });
        })

        it('View your started books', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user)

            await app.httpRequest()
                .get('/api/book/listMyStarBooks')
                .expect(200)
        })

        it('if user not login', async () => {
            app.mockSession(null);
            await app.httpRequest()
                .get('/api/book/listMyStarBooks')
                .expect(200)
                .expect({
                    success: false,
                    message: "请先登录"
                });
        })

        it('book not exist', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user)
            let book = JSON.parse(JSON.stringify(bookInfo));
            book.id = 100
            await app.httpRequest()
                .post('/api/book/star/' + book.id)
                .expect(200)
                .expect({
                    success: false,
                    message: "书籍不存在"
                });
        });

    })

    describe('join course', () => {
        let userInfo = {
            userId: 2
        }
        let courseInfo = {
            id: 1
        }

        it('Join course after user login', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user)
            let course = JSON.parse(JSON.stringify(courseInfo));
            await app.httpRequest()
                .post('/api/course/join/' + course.id)
                .expect(200)
                .expect({
                    success: true,
                    message: "加入成功"
                });
            await app.httpRequest()
                .delete('/api/course/quit/' + course.id)
                .expect(200)
                .expect({
                    success: true,
                    message: "退出成功"
                });
        })

        it('View your joined courses', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user)
            await app.httpRequest()
                .get('/api/course/listMyJoinCourses')
                .expect(200)
        })

        it('if user not login', async () => {
            app.mockSession(null);
            await app.httpRequest()
                .get('/api/course/listMyJoinCourses')
                .expect(200)
                .expect({
                    success: false,
                    message: "请先登录"
                });
        })

        it('course not exist', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user)
            let course = JSON.parse(JSON.stringify(courseInfo));
            course.id = 100
            await app.httpRequest()
                .post('/api/course/join/' + course.id)
                .expect(200)
                .expect({
                    success: false,
                    message: "课程不存在"
                });
        })

    })

    describe('manage', () => {
        let userInfo = {
            userId: 1
        }

        it('list all users', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user)
            await app.httpRequest()
                .get('/api/user/list')
                .expect(200)
        })

        it('add user', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user)
            let newUser = {
                username: 'newuser',
                password: '123456',
                identify: 'student',
                profile: '{}'
            }

            await app.httpRequest()
                .post('/api/user/register')
                .send(newUser)
                .expect(200)
                .expect({
                    success: true,
                    message: "注册成功"
                });
            const result = await app.mysql.delete('user', { username: newUser.username })
            assert(result.affectedRows === 1);
        })

        it('update user', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user)

            let updateUser = {
                id: 1,
                username: 'admin',
                password: '12345',
                identify: 'admin',
                profile: '{}'
            }

            await app.httpRequest()
                .put('/api/user/update')
                .send(updateUser)
                .expect(200)
                .expect({
                    success: true,
                    message: "更新成功"
                });
            updateUser.password = '123456'
            await app.httpRequest()
                .put('/api/user/update')
                .send(updateUser)
                .expect(200)
                .expect({
                    success: true,
                    message: "更新成功"
                });


        })

        it('delete user', async () => {
            let newUser = {
                username: 'newuser',
                password: '123456',
                identify: 'student',
                profile: '{}'
            }
            await app.httpRequest()
                .post('/api/user/register')
                .send(newUser)
                .expect(200)
                .expect({
                    success: true,
                    message: "注册成功"
                });
            const newUserResult = await app.mysql.get('user', { username: newUser.username })
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user)

            await app.httpRequest()
                .delete('/api/user/delete/' + newUserResult.id)
                .expect(200)
                .expect({
                    success: true,
                    message: "删除成功"
                });
        })

        it('if user not login', async () => {
            app.mockSession(null);
            await app.httpRequest()
                .delete('/api/user/delete/999')
                .expect(200)
                .expect({
                    success: false,
                    message: "请先登录"
                });
        })

        it('if user not admin', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            user.userId = 2
            app.mockSession(user)
            await app.httpRequest()
                .delete('/api/user/delete/999')
                .expect(200)
                .expect({
                    success: false,
                    message: "权限不足"
                });
        })

    })

})

