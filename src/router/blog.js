const { getList } = require('../controller/blog');
const { SuccessModel, ErrorModle } = require('../model/resModel');
const handleBlogRouter = (req,res)=>{
  //获取博客列表
  if(req.method === 'GET' && req.path === '/api/blog/list' ){
      let author = req.query.author || '';
      let keyword = req.query.keyword || '';
      const listData = getList(author,keyword)
      return new SuccessModel(listData);
  }
  //获取博客详情
  if(req.method === 'GET' && req.path === '/api/blog/detail' ){
    return {
      msg:'这是获取博客详情的接口'
    }
  }
  //获取新建博客
  if(req.method === 'POST' && req.path === '/api/blog/new' ){
    return {
      msg:'这是新建博客详情的接口'
    }
  }
  //更新博客接口
  if(req.method === 'POST' && req.path === '/api/blog/update' ){
    return {
      msg:'这是更新博客的接口'
    }
  }
}
module.exports = handleBlogRouter