# nodeBlog
基于nodeJs开发的简易博客

## 本节概述 
---

- 1. 本节课主要讲解了 redis ，首先增加 conf/db.js 中新增 配置;
- 2. 在db文件夹下新增 redis.js 文件 用来执行连接 redis
- 3. 修改app.js 文件 增加 redis，思路是 通过登陆接口api中，用 redis 保存id对应的username等信息
      之后在访问其他接口，先从redis中获取到id对应的username 保存到 session中，其他接口就可以获取到 session的username等信息了
- 4. 之前 login-test接口都是用来测试有没有登陆，现在把这个判断登陆功能加到其他接口中去。所以要修改 router/blog.js 文件,给对应的接口增加登陆校验，然后需要获取username的也改成从 session获取
- 5. 在user.js 中将login接口改为 post，username从 req.body 中获取;由于无法再使用 postman 模拟
保存cookie 所以这里要 使用前端联调了。
     