const { app, assert } = require('egg-mock/bootstrap');
const { describe } = require('node:test');


describe('book', () => {

    describe('manage', () => {

        let userInfo = {
            userId: 1
        }

        let bookInfo = {
            name: "test",
            author: "test",
            desc: "test",
            type: "test",
            word_count: 100,
            logo: "test",
            profile: '{}',
        }

        it('list all books', async () => {
            await app.httpRequest()
                .get('/api/book/list')
                .expect(200)
        })

        it('add book', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user);
            await app.httpRequest()
                .post('/api/book/add')
                .send(bookInfo)
                .expect(200)
                .expect({
                    success: true,
                    message: "添加成功"
                })

            const result = await app.mysql.delete('book', { "name": bookInfo.name });
            assert(result.affectedRows === 1);
        })

        it('update book', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user);
            let book = JSON.parse(JSON.stringify(bookInfo));
            await app.httpRequest()
                .post('/api/book/add')
                .send(book)
                .expect(200)
                .expect({
                    success: true,
                    message: "添加成功"
                })
            book = await app.mysql.get('book', { "name": book.name });
            book.name = "test2";
            await app.httpRequest()
                .put('/api/book/update')
                .send(book)
                .expect(200)
                .expect({
                    success: true,
                    message: "更新成功"
                })
            const result = await app.mysql.delete('book', { "name": book.name });
            assert(result.affectedRows === 1);
        })

        it('delete book', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            app.mockSession(user);
            let book = JSON.parse(JSON.stringify(bookInfo));
            await app.httpRequest()
                .post('/api/book/add')
                .send(book)
                .expect(200)
                .expect({
                    success: true,
                    message: "添加成功"
                })
            book = await app.mysql.get('book', { "name": book.name });
            await app.httpRequest()
                .delete('/api/book/delete/' + book.id)
                .expect(200)
                .expect({
                    success: true,
                    message: "删除成功"
                })
        })

        it('if user is not login', async () => {
            app.mockSession(null);
            await app.httpRequest()
                .post('/api/book/add')
                .send(bookInfo)
                .expect(200)
                .expect({
                    success: false,
                    message: "请先登录"
                })
        })

        it('if user is not admin', async () => {
            let user = JSON.parse(JSON.stringify(userInfo));
            user.userId = 2;
            app.mockSession(user);
            await app.httpRequest()
                .post('/api/book/add')
                .send(bookInfo)
                .expect(200)
                .expect({
                    success: false,
                    message: "权限不足"
                })
        })

    })

});