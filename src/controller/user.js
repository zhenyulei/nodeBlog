const loginCheck = (data)=>{
  const { username,password} = data;
  if(username === 'zhangsan' && password === '123'){
    return true;
  }
  return false;
}
module.exports = {
  loginCheck
};