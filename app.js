//app.js 只是一个入口文件，其他的逻辑应该放在其他文件中 
// 最后可以通过postman请求接口
const querystring = require('querystring');
const handleUserRouter = require('./src/router/user.js'); //路由处理
const handleBlogRouter = require('./src/router/blog.js');
//新增的获取post请求的数据
const getPostData = (req)=>{
  const promise = new Promise((resolve,reject)=>{
    if(req.method !== 'POST'){
      resolve();
      return;
    }
    if(req.headers['content-type'] !== 'application/json'){
      resolve();
      return;
    }
    let postData = '';
    req.on('data',chunk=>{
      postData += chunk.toString();
    })
    req.on('end',()=>{
      if(!postData){
        resolve({})
        return;
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise;
}

const serverHandle = (req,res)=>{
  res.setHeader('Content-type','application/json');
  const url = req.url;
  req.path = url.split('?')[0];
  //解析 query，解析结果以对象的形式放在query中。
  req.query = querystring.parse(url.split('?')[1]);
  
  //处理路由前，执行解析
  getPostData(req).then(postData => {
    req.body = postData;
    //处理blog路由,并且把请求和res的数据传给 handleBlogRouter
    // 这样下面的路由都会获取到req中body的post请求的数据
    const blogData = handleBlogRouter(req,res);
    if(blogData){
      res.end(
        JSON.stringify(blogData)
      )
      return
    }
    //处理登陆信息
    const userData = handleUserRouter(req,res);
    if(userData){
      res.end(
        JSON.stringify(userData)
      )
      return
    }
    //未命中路由 返回404 并且以纯文本形式返回
    res.writeHead(404,{"Content-type":"text/plain"})
    res.write("404 Not Found\n")
    res.end();//因为上面已经写过文本了 所以这里没有写
  })
  
  
}

module.exports = serverHandle;