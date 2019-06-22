const handleUserRouter = (req,res) => {
  //登陆接口 
  if(req.method==='POST' && req.path === '/api/user/login'){
    return {
      msg:'这是登陆的接口'
    }
  }
}

module.exports = handleUserRouter;