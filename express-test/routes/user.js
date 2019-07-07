var express = require('express');
var router = express.Router();
const { login } = require('../controller/user.js');
const { SuccessModel, ErrorModel } = require('../model/resModel');

/* GET users listing. */
router.post('/login', function(req, res, next) {
    const {username,password} = req.body;
    const result = login(username,password);
    return result.then((data)=>{
      if(data.username){
        //设置session
        req.session.username = data.username;
        req.session.realname = data.realname;
        res.json(
          new SuccessModel()
        )
      }else{
        res.json(
          new ErrorModel('登陆失败')
        )
      }
    })
});

router.get('/login-test',(req,res,next)=>{
  if(req.session.username){
    res.json({
      error:0,
      msg:req.session.username
    })
    return
  }
  res.json({
    error:-1,
    msg:'尚未登陆'
  })
})

module.exports = router;
