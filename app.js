//app.js 只是一个入口文件，其他的逻辑应该放在其他文件中 
// 最后可以通过postman请求接口
const querystring = require('querystring');
const handleUserRouter = require('./src/router/user.js'); //路由处理
const handleBlogRouter = require('./src/router/blog.js');
const { get, set } = require('./src/db/redis');
const { access } = require('./src/utils/log');

//session数据
const SESSION_DATA = {};
//获取cookie的过期时间
const getCookieExpires = ()=>{
  const d = new Date();
  d.setTime(d.getTime() + (24*60*60*1000));
  return d.toGMTString();//一天后过期
}
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
  //记录 access log
  access(`${req.method}--${req.url}--${req.headers['user-agent']}--${Date.now()}`);
  res.setHeader('Content-type','application/json');
  const url = req.url;
  req.path = url.split('?')[0];
  //解析 query，解析结果以对象的形式放在query中。
  req.query = querystring.parse(url.split('?')[1]);
  
  // 解析cookie
  req.cookie = {};
  const  cookieStr = req.headers.cookie || ''//k1=v1;k2=v2
  cookieStr.split(';').forEach((item)=>{
    if(!item){
      return
    }
    const arr = item.split('=');
    //由于新增多个cookie的时候，会在前面自动加空格，所以需要做处理
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] =val;
    //console.log('req.cookie is',req.cookie);
    //在浏览器端控制台设置 cookie 然后刷新浏览器即可
  })
  
//解析session 使用 redis
let needSetCookie = false; 
let userId = req.cookie.userid;
if(!userId){//即cookie中没有 userid
  needSetCookie = true; //返回的res中要设置对应的cookie
  userId = `${Date.now()}_${Math.random()}`;
  set(userId,{})// useId在redis中对应的是{name:xx,realname:xxx}
}
//获取session
// 如果没有userId，则设置useId，并在redis中对应的初始化为空对象
// (如果没有已经给了随机数了) 所以进行到这里肯定会有userId，
req.sessionId = userId;
// 从redis 中获取对应的id的val值
get(req.sessionId).then((sessionData)=>{
  if(sessionData == null){//即key值没有对应的val值[比如上面没有userId的时候，赋值的id是随机数]
    //则初始化 redis中的session 值为空对象
   // set(req.sessionId,{})
    //userid没有对应的val值，则设置session为空对象
    res.session={}
  }else{
    // 例如已经登陆过一次了，再次访问别的接口，sessionData 是username等数据了
    // 赋值给 session 然后在具体的接口请求中可以通过 session 获取
    req.session = sessionData;
  }
  return getPostData(req);
}).then(postData => {
    req.body = postData;
    //处理blog路由,并且把请求和res的数据传给 handleBlogRouter
    // 这样下面的路由都会获取到req中body的post请求的数据
    const blogResult = handleBlogRouter(req,res);
    if(blogResult){
      blogResult.then((blogData)=>{
        // 上面 const userId = req.cookie.userid; 是从cookie获取的，没有则设置给cookie
        if(needSetCookie){
          res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }
    //处理登陆信息
    const userResult = handleUserRouter(req,res);
    if(userResult){
      userResult.then((userData)=>{
        if(needSetCookie){
          res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }
    //未命中路由 返回404 并且以纯文本形式返回
    res.writeHead(404,{"Content-type":"text/plain"})
    res.write("404 Not Found\n")
    res.end();//因为上面已经写过文本了 所以这里没有写
  })
  
  
}

module.exports = serverHandle;