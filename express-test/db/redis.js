const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

//创建客户端
const client = redis.createClient(REDIS_CONF.port,REDIS_CONF.host);

client.on('error',err=>{
    console.error(err)
})

module.exports = client;