const { app, assert } = require('egg-mock/bootstrap');
const { describe } = require('node:test');


describe('book', () => {

    describe('manage', () => {

        it('list all books', async () => {

            await app.httpRequest()
                .get('/api/book/list')
                .expect(200)
                .expect(res => {
                    assert(res.body.success === true);
                })
        })


    })

});