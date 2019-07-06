#!/bin/sh
cd /Users/limeng/Documents/codeDemo/nodeBlog/logs
# pwd 可以获取当前文件的目录
cp access.log $(date +%y-%m-%d).access.log
# echo 赋值access.log 为空字符串 也就是清空 access.log
echo "" > access.log 