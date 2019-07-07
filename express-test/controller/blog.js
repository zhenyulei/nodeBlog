const { exec } = require('../db/mysql');
const xss = require('xss');
const getList = (author,keyword)=>{
  // 如果不写 1=1 ，若 author keyword 两个均无值的时候 sql语句就变成了
  // where order by.... 就会报错
  let sql = `select * from blogs where 1=1 `//注意最后有空格
  if(author){
    sql += `and author='${author}' `
  }
  if(keyword){
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  //返回的是 promise
  return exec(sql);
}

const getDetail = (id)=>{
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows=>{
    //返回的是个数组
    return rows[0]
  })
}
//新建博客
const newBlog = (blogData = {})=>{
  //blogData 是一个博客对象，包含了 title content author属性，默认为空对象
  let {title,content,author} = blogData;
  title = xss(title);
  content = xss(content);
  const createTime = Date.now();
  const sql=`
    insert into blogs (title,content,author,createTime)
    value ('${title}','${content}','${author}',${createTime})
  `
  return exec(sql).then(insertData=>{
    if(insertData){
      return {
        id:insertData.insertId
      }
    }else{
      return {
        err:0
      }
    }
    
  })
}

const updateBlog = (id, blogData = {})=>{
  //id 就是 要更新博客的id
  //blogData 是一个博客对象，包含了 title content 属性，默认为空对象
  const {title,content} = blogData;
  const sql = `
    update blogs set title='${title}', content='${content}'
    where id=${id}
  `
  return exec(sql).then((updateData)=>{
    if(updateData.affectedRows>0){
      return true;
    } else{
      return false;
    }
  })
  
}

const delBlog = (id,author)=>{
  //id 就是要删除博客的id 
  const sql = `delete from blogs where id=${id} and author='${author}';`
  return exec(sql).then(deleteData=>{
    if(deleteData.affectedRows>0){
      return true;
    } else{
      return false;
    }
  })
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
