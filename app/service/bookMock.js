const egg = require('egg');
module.exports = class BookMockService extends egg.Service {
  getArticle() {
    return  {
      id: 1,
      title: 'Egg + React 服务端渲染骨架',
      summary: '基于Egg + React + Webpack3/Webpack2 服务端渲染同构工程骨架项目',
      hits: 550,
      url: 'https://yuque.com/easy-team/egg-react'
    }
  }
}