const http = require('http');
const PROT = 8001;
const serverHandle = require('../app');
const server = http.createServer(serverHandle);
server.listen(PROT);