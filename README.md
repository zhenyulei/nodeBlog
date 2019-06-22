# nodeBlog
基于nodeJs开发的简易博客

## 本节概述 
---

- 1. 本节课主要增加了post请求，首先在app.js中通过异步函数，对请求的postData流做了处理，放在了 req.body 中
- 2. 然后新建post请求的路由，首先在controller/blog.js 中新增 newBlog。然后在   router/blog.js中新增获取博客的接口，可以使用postman测试
- 3. 本节主要是设置post请求，套路是先设置 controller/blog.js 的接受/返回数据，然后在 router中编码；
- 4. 注意的是在 app.js 中 处理post函数 getPostData的返回数据 
resolve(JSON.parse(postData)) 务必是 用JSON.parse包裹，否则后面无法用对象获取数据。