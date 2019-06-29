const { exec } = require('../db/mysql');
const login = (data)=>{
  const { username,password} = data;
  const sql =  `select username,realname from users 
  where username='${username}' and password='${password}';`
  return exec(sql).then(rows=>{
    return rows[0] || {};
  })

}
module.exports = {
  login
};