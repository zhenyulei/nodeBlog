const { getList, getDetail ,newBlog,updateBlog,delBlog} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');//因为导出的是函数，所以前面不用大括号
var express = require('express');
var router = express.Router();


router.get('/list',function(req,res,next){
      let author = req.query.author || '';
      let keyword = req.query.keyword || '';
      //新增admin部分
      if(req.query.isadmin){
        // if(req.session.username == null){
        //   res.json(
        //     new ErrorModel('未登陆')
        //   )
        //   return 
        // }
        author = req.session.username
        console.log(author);
      }
      
      const result = getList(author,keyword)
      //这里return的是promise对象，这里的return 会跳出代码块
      return result.then(listData => {
        //这里return的是 model 的返回值，也就是这里的return不会跳出代码块
        res.json(
          new SuccessModel(listData)
        )
      })
})
router.get('/detail',function(req,res,next){
  const result = getDetail(req.query.id);
  return result.then(data=>{
    res.json(
      new SuccessModel(data)
    )
  })
})
router.post('/new',loginCheck,(req,res,next)=>{
  req.body.author = req.session.username;
  const result = newBlog(req.body);
  return result.then((data)=>{
    res.json(
      new SuccessModel(data)
    )
  })
})
router.post('/del',loginCheck,(req,res,next)=>{
  const author = req.session.username;
  const id = req.query.id;
  const result = delBlog(id,author);
  return result.then((data)=>{
    res.json(
      new SuccessModel(data)
    )
  })
})
router.post('/update',loginCheck,(req,res,next)=>{
  const id = req.query.id;
  const result = updateBlog(id,req.body);
  return result.then((data)=>{
    res.json(
      new SuccessModel(data)
    )
  })
})

module.exports = router;