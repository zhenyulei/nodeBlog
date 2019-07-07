const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp.js');
const login = (username,password)=>{
  //password = genPassword(password)//密码加密。前提是数据库中对应的密码已经改成了加密的
  username = escape(username);
  password = escape(password);
  //因为 使用了escape之后才能在sql语句中去掉单引号，所以要把 escape放在后面
  const sql =  `select username,realname from users 
  where username=${username} and password=${password};`
  return exec(sql).then(rows=>{
    return rows[0] || {};
  })
}
module.exports = {
  login
};