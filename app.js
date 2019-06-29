//app.js 只是一个入口文件，其他的逻辑应该放在其他文件中 
// 最后可以通过postman请求接口
const querystring = require('querystring');
const handleUserRouter = require('./src/router/user.js'); //路由处理
const handleBlogRouter = require('./src/router/blog.js');
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

  //是否需要设置 cookie,
  //思路：先从cookie中获取userId，如果没有，则设置 SESSION_DATA 对应key
  //的value值是随机数，如果有userId，则把 SESSION_DATA[userId]赋值给
  // session，SESSION_DATA 相当于一个中间变量。
  // 此外，cookie中没有 userid的时候，就需要在服务器端设置 cookie中的userid
  // 这样 浏览器端只是通过操作 cookie 中的 userid，来影响 session 中的值
  let needSetCookie = false; 
  
   //解析 session
  let userId = req.cookie.userid;
  //如果有 userId 则赋值给session 如果没有则赋值空对象
  //注意 userId 相当于 key:value 中的 key
  if(userId){ 
    if(!SESSION_DATA[userId]){
      SESSION_DATA[userId] = {}; 
    }
  }else{
    needSetCookie = true;
    //如果没有 userId （说明是第一次访问，给其赋值一个随机数）
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}; 
  }
  //即session中没有useId的话 就初始化，有的话 就赋值
  //console.log(SESSION_DATA[userId]);
  req.session = SESSION_DATA[userId];



  //处理路由前，执行解析
  getPostData(req).then(postData => {
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