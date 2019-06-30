const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

//创建客户端
const client = redis.createClient(REDIS_CONF.port,REDIS_CONF.host);

client.on('error',err=>{
    console.error(err)
})

function set(key,val){
  if(typeof val === 'object'){
    val = JSON.stringify(val);
  }
  client.set(key,val,redis.print)
}
//get 是异步hanshu
function get(key){
  const promise = new Promise((resolve,reject)=>{
    client.get(key,(err,val)=>{
        if(err){ //处理异常
            reject(err)
            return;
        }
        // 有可能key是随便写的，没有对应的val值，所以返回null
        if(val===null){
          resolve(null);
          return
        }
        //因为set的时候可能进行了JSON格式化，所以这里先尝试序列化
        //如果不成功 说明 之前没有进行过格式化 则直接返回愿数据
        try{
          resolve(
            JSON.parse(val)
          )
        }catch(err){
          resolve(val)
        }
    })
  })
  return promise;
}

module.exports = {
  set,
  get
}