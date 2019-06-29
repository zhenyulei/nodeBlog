# nodeBlog
基于nodeJs开发的简易博客

## 本节概述 
---

- 1. 本节课主要讲解了server端操作 cookie和session
- 2.  在 app.js 中解析 session,通过获取 userid ，就能拿到对应的用户信息，
- 3. 思路：
     首先访问 /api/user/login-test，因为 session 中没有值，所以返回 尚未登陆的信息
     但是在app.js 中，第一次访问，cookie中是没有 userid 的值的，所以 needSetCookie 为true，
     且给 req.session 初始化为{},由于 needSetCookie 为true，所以会在返回的res中设置 userid 的cookie
     第二次访问 /api/user/login-test， cookie中已经有了userid了，needSetCookie 为false，
     且上次 SESSION_DATA[userId] 中已经初始化为{}了，所以可以直接赋值给 SESSION_DATA[userId]为{}
     （说明SESSION_DATA[userId]一直是{},如果没有，则赋值给{}，有值的话赋值给也是{}）
     访问 /api/user/login?username=zhangsan&password=123 接口
     此时，cookie 中已经有 userid ，且 SESSION_DATA[userId]={},赋值给req.session={}；
     把数据库中的 username 和 realname 赋值给 session
     然后在次访问 /api/user/login-test，就能在浏览器中得到 session 值  username 和 realname 了。


