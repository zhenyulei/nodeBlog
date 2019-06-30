const { getList, getDetail ,newBlog,updateBlog,delBlog} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

//验证是否登陆，后期封装到中间件中 统一的登陆验证函数
const loginCheck = (req)=>{
  //如果无效返回错误信息，已经登陆则返回 undefeated
  if(!req.session.username){
    return Promise.resolve(
      new ErrorModel('尚未登陆')
    )
  }
}


const handleBlogRouter = (req,res)=>{
  let id = req.query.id;
  let method = req.method;
  //获取博客列表
  if(method === 'GET' && req.path === '/api/blog/list' ){
      let author = req.query.author || '';
      let keyword = req.query.keyword || '';
      //新增admin部分
      if(req.query.isadmin){
        const loginCheckResult = loginCheck(req);
        if(loginCheckResult){
          //未登陆
          return loginCheckResult
        }
        // 强制查询自己的博客,也就是说有这个参数的时候，不在使用url上给到的usernam
        // 而是使用当前登陆信息中的 username
        author = req.session.username
        
      }
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
  //新建博客
  if(method === 'POST' && req.path === '/api/blog/new' ){
    const loginCheckResult = loginCheck(req);
    if(loginCheckResult){
      //有返回值表示为登陆
      return loginCheckResult
    }
    req.body.author= req.session.username;//假数据,待开发登陆时在改成真是数据
    const result = newBlog(req.body);
    return result.then(data=>{
      return new SuccessModel(data);
    })
  }
  //更新博客接口
  if(method === 'POST' && req.path === '/api/blog/update' ){
    const loginCheckResult = loginCheck(req);
    if(loginCheckResult){
      //有返回值表示为登陆
      return loginCheckResult
    }
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
    const loginCheckResult = loginCheck(req);
    if(loginCheckResult){
      //有返回值表示为登陆
      return loginCheckResult
    }
    const author= req.session.username;//假数据,待开发登陆时在改成真是数据
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