const { app, assert } = require('egg-mock/bootstrap');
const { describe } = require('node:test');


describe('course', () => {

    describe('manage', () => {

        let userInfo = {
            userId: 1
        }

        let courseInfo = {
            name: "test",
            details: "test",
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
        })

        it('list cousrse content', async () => {
            await app.httpRequest()
                .get('/api/course/listContent/1')
                .expect(200)
        })

        it('add course content', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user);
            await app.httpRequest()
                .post('/api/course/addContent')
                .send(courseContentInfo)
                .expect(200)
                .expect({
                    success: true,
                    message: "添加成功"
                })

            const result = await app.mysql.delete('course_content', { "title": courseContentInfo.title });
            assert(result.affectedRows === 1);
        })

        it('add course', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user);

            await app.httpRequest()
                .post('/api/course/add')
                .send(courseInfo)
                .expect(200)
                .expect({
                    success: true,
                    message: "添加成功"
                })

            const result = await app.mysql.delete('course', { "name": courseInfo.name });
            assert(result.affectedRows === 1);
        });

        it('update course', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user);

            let course = JSON.parse(JSON.stringify(courseInfo));

            await app.httpRequest()
                .post('/api/course/add')
                .send(course)
                .expect(200)
                .expect({
                    success: true,
                    message: "添加成功"
                })

            course = await app.mysql.get('course', { "name": courseInfo.name });
            course.name = "test2";
            await app.httpRequest()
                .put('/api/course/update')
                .send(course)
                .expect(200)
                .expect({
                    success: true,
                    message: "修改成功"
                })

            const result = await app.mysql.delete('course', { "name": course.name });
            assert(result.affectedRows === 1);
        });

        it('delete course', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user);
            let course = JSON.parse(JSON.stringify(courseInfo));
            await app.httpRequest()
                .post('/api/course/add')
                .send(course)
                .expect(200)
                .expect({
                    success: true,
                    message: "添加成功"
                })

            course = await app.mysql.get('course', { "name": courseInfo.name });
            await app.httpRequest()
                .delete('/api/course/delete/' + course.id)
                .expect(200)
                .expect({
                    success: true,
                    message: "删除成功"
                })

        })

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

        it('if user not admin', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            user.userId = 2;
            app.mockSession(user);
            await app.httpRequest()
                .post('/api/course/add')
                .send(courseInfo)
                .expect(200)
                .expect({
                    success: false,
                    message: "权限不足"
                })
        });

    })

})