# nodeBlog
基于nodeJs开发的简易博客

## 本节概述 
---

- 1. 本节课主要讲解了 写日志
- 2. 新建文件夹 utils/log.js
- 3. 在app.js 中继续编写
- 4. 新建shell 脚本:utils/copy.sh 然后cd到 utils 文件夹下，执行 sh copy.sh;
- 5. 切换到 nodeblog 目录，执行 crontab -e
编辑：
* 0 * * * sh /Users/limeng/Documents/codeDemo/nodeBlog/src/utils
表示在每天的凌晨执行sh脚本
crontab -l 查看当前脚本
- 6. 使用 readline 分析脚本，首先在utils文件夹下新建 readline.js文件
最后执行 node readline.js