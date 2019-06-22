# nodeBlog
基于nodeJs开发的简易博客

## 本节概述 
---

- 1. 新建数据模型,用于统一返回给浏览器的数据，文件是 model/resModel.js 文件
- 2. 在app.js 中，增加 处理url参数的方法 querystring
- 3. 新建文件 controller/blog.js user.js文件
- 4. 总结一下： 首先在app.js文件中通过 querystring ，将请求到的参数放在了             req.query中，然后在 router/blog.js 文件中通过获取到的 请求参数，传给
     controller/blog.js 文件中，先返回假数据，在app.js 中得到返回的数据后，
     在通过model/resModel.js 规定的成功失败模型，返回给浏览器。
- 5. 可以看出 controller/blog.js 文件是处理请求数据，返回数据的文件；
     model/resModel.js 文件是处理成功失败的格式文件；
     router/blog.js 是匹配请求路径接口，组装上述文件，返回数据
     app.js 是最终把数据返回给 浏览器的
- 6. 目前文件层级：
      1）bin/www.js 规定了最基础的 http 服务，并且把 app.js 中主文件搭载了http上
      2）app.js 不太涉及到业务逻辑，而是偏向于基础层面，包括req 和 res，以及返回给浏览器数据，访问不到 404 等等的处理；
      3）router/blog.js 是匹配路由的，相当于一个盒子，对应不同的路由，入参出参；
      4）controller/blog.js 处理具体的业务数据，传入的数据然后返回的数据；
      5）model/resModel.js 文件是处理成功，失败的格式文件；