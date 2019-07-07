1 安装脚手架 npm i express-generator -g 
2 使用 express 命令 生成 项目 express-test   express express-test 
3. npm install  &&  npm start
4. 安装  npm i nodemon cross-env -D 
5. 修改 package.json 文件 
"scripts": {
    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www"
}
6. 安装 mysql 和 xss
7. 新增conf，controller,db等文件夹，编辑路由
8. 使用 express-session 和 connect-redis 处理数据保存
npm i express-session -D //实现session功能
router/user.js 中 的 login 接口 
//设置session
req.session.username = data.username; 
req.session.realname = data.realname;
// 同步到 redis
set(req.sessionId, req.session)
// 使用框架之后 req.session 设置之后会同步到redis 所以这里先删掉 redis
9 记得更改 express 项目中的 port为 8000
10. 调试之后，npm i redis connect-redis -D
11 在db文件夹下新建redis.js 文件，在修改app文件 引入 session
12 编写中间件 middleware文件夹