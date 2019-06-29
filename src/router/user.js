const { login } = require('../controller/user.js');
const { SuccessModel, ErrorModel } = require('../model/resModel');


const handleUserRouter = (req,res) => {
  const method = req.method;
  //登陆接口 
  if(method==='GET' && req.path === '/api/user/login'){
    //const result = login(req.body);
    const result = login(req.query);
    
    return result.then((data)=>{
      
      if(data.username){
        //设置session
        req.session.username = data.username;
        req.session.realname = data.realname;
        return new SuccessModel();
      }else{
        return new ErrorModel('登陆失败');
      }
    })
  }


  //登陆验证的测试
  //访问该api地址，然后在浏览器端设置cookie即可
  if(method==='GET' && req.path ==='/api/user/login-test'){
    //因为已经在 app.js 中对cookie做了解析，放在了 req.cookie 中，所以这里可以直接使用
    if(req.session.username){
      //如没有异步，使用 promise.resolve 可以直接封装一个 promise 返回
      return Promise.resolve(new SuccessModel({
        session:req.session
      }));
    }
    return Promise.resolve(new ErrorModel('尚未登陆'));
  }

}

module.exports = handleUserRouter;