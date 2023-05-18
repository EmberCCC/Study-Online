const { app, assert } = require('egg-mock/bootstrap');
const { describe } = require('node:test');


describe('course', () => {

    describe('manage', () => {

        let userInfo = {
            username: "admin",
            password: "123456",
        }

        let courseInfo = {
            name: "test",
            detail: "test",
            teacher_desc: "test",
            teacher_id: 2,
            start_time: Date.parse(new Date()),
        }

        let courseContentInfo = {
            course_id: 1,
            title: "test",
            content: '{}',
        }


        it('list all courses', async () => {
            await app.httpRequest()
                .get('/api/course/list')
                .expect(200)
                .expect(res => {
                    assert(res.body.success === true);
                })
        })

        it('list cousrse content', async () => {
            await app.httpRequest()
                .get('/api/course/listContent/1')
                .expect(200)
                .expect(res => {
                    assert(res.body.success === true);
                })
        })

        it('add course content', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            await app.httpRequest()
                .post('/api/user/login')
                .send(user)
                .expect(200)
                .expect({
                    success: true,
                    message: "登录成功"
                })
            await app.httpRequest()
                .post('/api/course/addContent')
                .send(courseContentInfo)
                .expect(200)
                .expect({
                    success: true,
                    message: "添加成功"
                })

            const result = app.mysql.delete('course_content', { "title": courseContentInfo.title });
            assert(result.affectedRows === 1);
        })

        it('add course', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            await app.httpRequest()
                .post('/api/user/login')
                .send(user)
                .expect(200)
                .expect({
                    success: true,
                    message: "登录成功"
                })

            await app.httpRequest()
                .post('/api/course/add')
                .send(courseInfo)
                .expect(200)
                .expect({
                    success: true,
                    message: "添加成功"
                })

            const result = app.mysql.delete('course', { "name": courseInfo.name });
            assert(result.affectedRows === 1);
        });

        it('if user not login', async () => {
            app.mockSession(null);
            await app.httpRequest()
                .post('/api/course/add')
                .send(courseInfo)
                .expect(200)
                .expect({
                    success: false,
                    message: "请先登录"
                })
        });

    })

})