const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true , useUnifiedTopology: true } );

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('链接成功')
});

// scheme 对象

//创建一个和集合相关的scheme对象 类似表头
var Schema = mongoose.Schema;

var userScheme = new Schema({
    us : {type:String,required:true},
    ps : {type:String,required:true},
    age : Number,
    sex : {type:Number,default:0}
});
//将scheme对象转化为数据模型
var User = mongoose.model('user',userScheme); //该数据对象和集合关联（'集合名’，scheme对象）
//find
User.find({age:17})
//操作数据库
// User.insertMany({us:'tom',ps:16})
.then((data) => {
    console.log(data)
    console.log('写入成功！')
})
.catch((err) => {
    console.log('写入失败！')
})