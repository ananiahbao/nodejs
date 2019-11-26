const mongoose = require('mongoose');
//创建一个和集合相关的scheme对象 类似表头
var Schema = mongoose.Schema;

var foodScheme = new Schema({
    name : {type:String,required:true},
    price : {type:String,required:true},
    desc : {type:String,required:true},
    typename : {type:String,required:true},
    typeid : {type:Number,required:true},
    img : {type:String,required:true}
});
//将scheme对象转化为数据模型
var Food = mongoose.model('foods',foodScheme); //该数据对象和集合关联（'集合名’，scheme对象）

module.exports = Food;