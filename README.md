# nodeBlog
基于nodeJs开发的简易博客

## 本节概述 
---

- 1. 本节课主要增加了mysql数据库
- 2. 首先新建 src/conf/db.js 文件，里面分环境对数据库的基本信息做了连接配置
- 3. 新建 db/mysql.js 文件，在这面统一进行sql语句的 exec 操作。
- 4. 然后改造 controller/blog.js 文件，由于返回的是 promise，所以继续改变 router/blog.js文件