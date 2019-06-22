const getList = (author,keyword)=>{
  // 先返回假数据
  return [
    {
      id:1,
      title:'标题A',
      content:'内容A',
      createTime:1561173237094,
      author:'zhangsan'
    },
    {
      id:2,
      title:'标题B',
      content:'内容B',
      createTime:1561173237300,
      author:'lisi'
    }
  ]
}

const getDelete = (id)=>{
  return {
    id:1,
    title:'标题A',
    content:'内容A',
    createTime:1561173237094,
    author:'zhangsan'
  }
}

const newBlog = (blogData = {})=>{
  //blogData 是一个博客对象，包含了 title content 属性，默认为空对象
  //console.log(blogData)
  return {
    id:3 //表示新建博客，插入到数据表里面的id
  }
}

const updateBlog = (id, blogData = {})=>{
  //id 就是 要更新博客的id
  //blogData 是一个博客对象，包含了 title content 属性，默认为空对象
  //console.log('update',blogData);
  return true;
}

const delBlog = (id)=>{
  //id 就是要删除博客的id
  console.log(id);
  return true;
}
module.exports = {
  getList,
  getDelete,
  newBlog,
  updateBlog,
  delBlog
};