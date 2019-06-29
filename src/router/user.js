const { login } = require('../controller/user.js');
const { SuccessModel, ErrorModel } = require('../model/resModel');
//获取cookie的过期时间
const getCookieExpires = ()=>{
  const d = new Date();
  d.setTime(d.getTime() + (24*60*60*1000));
  return d.toGMTString();//一天后过期
}

const handleUserRouter = (req,res) => {
  const method = req.method;
  //登陆接口 
  if(method==='GET' && req.path === '/api/user/login'){
    //const result = login(req.body);
    const result = login(req.query);
    return result.then((data)=>{
      if(data.username){
        //操作cookie
        //且规定path路径是跟路径，也就是cookie生效的路径是跟路径
        //禁止客户端修改该cookie 使用 httpOnly
        res.setHeader('Set-Cookie',`username=${data.username};path=/;httpOnly;expires=${getCookieExpires()}`)
        return new SuccessModel();
        //这样在url上访问 http://localhost:8000/api/user/login?username=zhangsan&password=123
        //之后，服务器会给浏览器返回消息中设置 usename的 cookie

      }else{
        return new ErrorModel('登陆失败');
      }
    })
  }


  //登陆验证的测试
  //访问该api地址，然后在浏览器端设置cookie即可
  if(method==='GET' && req.path ==='/api/user/login-test'){
    //因为已经在 app.js 中对cookie做了解析，放在了 req.cookie 中，所以这里可以直接使用
    if(req.cookie.username){
      //如没有异步，使用 promise.resolve 可以直接封装一个 promise 返回
      return Promise.resolve(new SuccessModel());
    }
    return Promise.resolve(new ErrorModel('尚未登陆'));
  }

}

module.exports = handleUserRouter;