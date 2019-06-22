const { loginCheck } = require('../controller/user.js');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleUserRouter = (req,res) => {
  const method = req.method;
  //登陆接口 
  if(method==='POST' && req.path === '/api/user/login'){
    const result = loginCheck(req.body);
    if(result){
      return new SuccessModel(result);
    }else{
      return new ErrorModel('登陆失败');
    }
  }
}

module.exports = handleUserRouter;