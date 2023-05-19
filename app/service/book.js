const Service = require('egg').Service;

class BookService extends Service {

    async list() {
        const { app } = this;
        const result = await app.mysql.select('book');
        return result;
    }

    async add(bookInfo) {
        const { ctx, app } = this;
        // only admin can add book
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

        const result = await app.mysql.insert('book', {
            "name": bookInfo.name,
            "author": bookInfo.author,
            "desc": bookInfo.desc,
            "type": bookInfo.type,
            "word_count": bookInfo.word_count,
            "logo": bookInfo.logo,
            "profile": bookInfo.profile,
        })

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
        // only admin can delete book
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

        const result = await app.mysql.delete('book', { "id": id });
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

    async update(bookInfo) {
        const { app, ctx } = this;
        // only admin can update book
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

        const result = await app.mysql.update('book', {
            "id": bookInfo.id,
            "name": bookInfo.name,
            "author": bookInfo.author,
            "desc": bookInfo.desc,
            "type": bookInfo.type,
            "word_count": bookInfo.word_count,
            "logo": bookInfo.logo,
            "profile": bookInfo.profile,
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

    async listMyStarBooks() {
        const { app, ctx } = this;
        if (ctx.session.userId === undefined || ctx.session.userId === null) {
            return {
                success: false,
                message: "请先登录"
            }
        }


        const userId = ctx.session.userId;
        const books = await app.mysql.query('select * from book where id in (select book_id from user_star_book where user_id = ?)', [userId]);

        return books;
    }

    async starBook(bookId) {
        const { app, ctx } = this;
        if (ctx.session.userId === undefined || ctx.session.userId === null) {
            return {
                success: false,
                message: "请先登录"
            }
        }


        //query book is exist
        const book = await app.mysql.get('book', { "id": bookId });
        if (book === null) {
            return {
                success: false,
                message: "书籍不存在"
            }
        }



        const userId = ctx.session.userId;
        const result = await app.mysql.insert('user_star_book', {
            "user_id": userId,
            "book_id": bookId,
        });

        if (result.affectedRows === 1) {
            return {
                success: true,
                message: "收藏成功"
            }
        }
        return {
            success: false,
            message: "收藏失败"
        }
    }

    async unstarBook(bookId) {
        const { app, ctx } = this;
        if (ctx.session.userId === undefined || ctx.session.userId === null) {
            return {
                success: false,
                message: "请先登录"
            }
        }

        const userId = ctx.session.userId;
        const result = await app.mysql.delete('user_star_book', {
            "user_id": userId,
            "book_id": bookId,
        });

        if (result.affectedRows === 1) {
            return {
                success: true,
                message: "取消收藏成功"
            }
        }
        return {
            success: false,
            message: "取消收藏失败"
        }
    }

}

module.exports = BookService;