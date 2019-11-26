const mongoose = require('mongoose');
//创建一个和集合相关的scheme对象 类似表头
var Schema = mongoose.Schema;

var userScheme = new Schema({
    us : {type:String,required:true},
    ps : {type:String,required:true},
    age : Number,
    sex : {type:Number,default:0}
});
//将scheme对象转化为数据模型
var User = mongoose.model('users',userScheme); //该数据对象和集合关联（'集合名’，scheme对象）

module.exports = User;