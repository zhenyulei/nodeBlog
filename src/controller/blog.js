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
module.exports = {
  getList
};