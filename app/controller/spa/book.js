
module.exports = app => {
    return class BookController extends app.Controller {
      
      async getOneBook() {

        const { ctx } = this;
        // 调用 service 创建一个 topic
        //  get query params

        //  handle params



        const list = ctx.service.bookMock.getArticle();
      
        ctx.body = list
        ctx.status = 200;
      }
  
    };
  };