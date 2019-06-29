# nodeBlog
基于nodeJs开发的简易博客

## 本节概述 
---

- 1. 本节课主要讲解了server端操作 cookie和session
- 2. 在app.js 文件中解析cookie（注意要用chrome浏览器设置cookie，firefox给禁止了）
- 3. router/user.js 文件中将 loginCheck 改为 login 因为之后要用到这个字段(小技巧：用全局搜索，然后双击一个选中 com+d 可以同时修改多个)；编辑 “登陆验证的测试” 的测试代码
- 4. 暂且将 登陆接口 “/api/user/login” 改为 get请求，然后再其中设置服务端修改cookie的代码，设置禁止修改cookie，设置过期时间
