class BaseModel {
  constructor(data,message){
    if(typeof data === 'string'){
      //做的兼容，如果没有传入 message 数据，并且data是字符串，
      //则把data 复制给message
      this.message = data;
      data = null;
      message = null;
    }
    if(data){
      this.data = data;
    }
    if(message){
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data,message){
    super(data,message);
    this.errno = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(data,message){
    super(data,message);
    this.errno = -1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
