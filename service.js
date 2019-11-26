const express = require('express');
const db = require('./db/connect');
const userouter = require('./router/userRouter');
const app = express();
const path = require('path');
const bodypaser = require('body-parser');
const foodmodel = require('./router/foodRouter');
const file = require('./router/fileRouter');
const request = require('request')
// 设置跨域
const cors = require('cors');
app.use(cors());

app.use(bodypaser.urlencoded({extended:false}));
app.use(bodypaser.json())
app.use('/user',userouter)
app.use('/food',foodmodel)
app.use('/file',file)
// 设置文件路径
app.use('/static',express.static(path.join(__dirname,'./public')))
app.use('/public',express.static(path.join(__dirname,'./static')))
//proxy 跨域
app.get('/cros',(req,res) => {
    console.log('cors.html is ajax')
    request('http://192.168.1.129/shizhikang/zx/sy/api/v2/index/student?uid=28&article_num=10&nowPage=1',(err,response,body) =>{
        console.log(body)
    })
    res.send('ok')
})

//监听端口
app.listen(3000,()=>{
    console.log('server start')
})
