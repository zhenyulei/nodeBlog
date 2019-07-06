# nodeBlog
基于nodeJs开发的简易博客

## 本节概述 
---

- 1. 本节课主要讲解了 防止常见攻击
- 2. （1）sql攻击 在输入username中 写上 注释代码！
db/mysql.js 新增 escape 方法;然后在controller中的user.js 过滤username password；同时把sql语句中的 username password 单引号去掉
对比一下，原来的内容,-- 把后面的代码注释掉了
where username='zhangsan'--'and password='123'
改动以后：
where username='zhangsan\'--'and password='123'
第二个单引号注释掉了
（2）XSS攻击
比如在输入框中保存 <script>alert(document.cookie)</script> ；
输入的是 JS 代码块；
安装工具：npm i xss -D
然后在 controller/user.js 中执行,需要防范的地方包裹 xss
title = xss(title);
 (3)给密码加密：
编写utils/cryp.js 加密后的密码是32位 记得修改数据库中 password的长度；
如果数据库执行 update 语句时，报 安全的错误的时候，执行下面的语句
SET SQL_SAFE_UPDATES = 0;
然后在 controller/user.js中编写
