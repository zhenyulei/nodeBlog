const { getList, getDelete ,newBlog,updateBlog,delBlog} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleBlogRouter = (req,res)=>{
  let id = req.query.id;
  let method = req.method;
  //获取博客列表
  if(method === 'GET' && req.path === '/api/blog/list' ){
      let author = req.query.author || '';
      let keyword = req.query.keyword || '';
      const listData = getList(author,keyword)
      return new SuccessModel(listData);
  }
  //获取博客详情
  if(method === 'GET' && req.path === '/api/blog/detail' ){
    const deleteData = getDelete(id);
    return new SuccessModel(deleteData);
  }
  //获取新建博客
  if(method === 'POST' && req.path === '/api/blog/new' ){
    const data = newBlog(req.body);
    return new SuccessModel(data);
  }
  //更新博客接口
  if(method === 'POST' && req.path === '/api/blog/update' ){
    const result = updateBlog(id,req.body);
    if(result){
      return new SuccessModel(result);
    }else{
      return new ErrorModel('更新博客失败');
    }
  }
  //删除博客接口
  if(method === 'POST' && req.path === '/api/blog/del'){
    const result = delBlog(id);
    if(result){
      return new SuccessModel(result);
    }else{
      return new ErrorModel('删除博客失败');
    }
  }
}
module.exports = handleBlogRouter