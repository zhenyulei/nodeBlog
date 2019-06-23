const { getList, getDetail ,newBlog,updateBlog,delBlog} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleBlogRouter = (req,res)=>{
  let id = req.query.id;
  let method = req.method;
  //获取博客列表
  if(method === 'GET' && req.path === '/api/blog/list' ){
      let author = req.query.author || '';
      let keyword = req.query.keyword || '';
      const result = getList(author,keyword)
      //这里return的是promise对象，这里的return 会跳出代码块
      return result.then(listData => {
        //这里return的是 model 的返回值，也就是这里的return不会跳出代码块
        return new SuccessModel(listData);
      })
  }
  //获取博客详情
  if(method === 'GET' && req.path === '/api/blog/detail' ){
    const result = getDetail(id);
    return result.then(data=>{
      return new SuccessModel(data);
    })
  }
  //获取新建博客
  if(method === 'POST' && req.path === '/api/blog/new' ){
    req.body.author= 'wanghua';//假数据,待开发登陆时在改成真是数据
    const result = newBlog(req.body);
    return result.then(data=>{
      return new SuccessModel(data);
    })
  }
  //更新博客接口
  if(method === 'POST' && req.path === '/api/blog/update' ){
    const result = updateBlog(id,req.body);
    return result.then(val=>{
      if(val){
        return new SuccessModel();
      }else{
        return new ErrorModel('更新博客失败');
      }
    })
  }
  //删除博客接口
  if(method === 'POST' && req.path === '/api/blog/del'){
    const author= 'wanghua';//假数据,待开发登陆时在改成真是数据
    const result = delBlog(id,author);
    return result.then(val=>{
      if(val){
        return new SuccessModel();
      }else{
        return new ErrorModel('删除博客失败');
      }
    })
    
  }
}
module.exports = handleBlogRouter