const express = require('express');
const db = require('./db/connect');
const userouter = require('./router/userRouter');
const app = express();
const path = require('path');
const bodypaser = require('body-parser');
const foodmodel = require('./router/foodRouter');
const file = require('./router/fileRouter');
const request = require('request');
const cookieParse = require('cookie-parse');
const session = require('express-session');
const jwt = require('./utils/jwt');
//session 整体配置
app.use(session({
    secret: 'ananiah', //为了安全性的考虑设置secret
    cookie: {maxAge: 60 * 1000}, //设置session过期时间
    resave: false, //即使session 没有被修改 也保存 session 值 默认为true
    saveUninitialized: false, // 无论有没有session cookie 每次请求都设置个session cookie 默认
    // cookie: {secure: true}
}))
// 设置跨域
const cors = require('cors');
app.use(cors());
// console.log(session,session)
app.use(bodypaser.urlencoded({extended:false}));
app.use(bodypaser.json())
app.use('/user',(req,res,next) => {
    console.log(req.body)
    console.log(req.session.login)
    next()
    // if(req.session.login){
    //     next()
    // }else{
    //     res.send({err:-999,msg:'请先登录！'})
    // }
   
},userouter)
// app.use('/food',(req,res,next) => {
//     console.log(req.body)
//     console.log(req.session.login)
//     if(req.session.login){
//         next()
//     }else{
//         res.send({err:-999,msg:'请先登录！'})
//     }
   
// },foodmodel)
// token验证
app.use('/food',(req,res,next) => {
    // console.log(jwt.palyload)
    let {token} = req.body;
    jwt.checkToken(token)
    .then((data) => {
        next()
    })
    .catch((err) => {
        res.send({err:'-998',msg:'token 非法！'})
    })

   
},foodmodel)
app.use('/file',file)
// app.use('/socket',socket)  
// 设置文件路径
    /**
     * @api {post} /static/img/1574414544159.jpeg  访问图片
     * @apiName accessImg
     * @apiGroup Upload
     * @apisuccess {String} firstname Firstname of the User
     * @apisuccess {String} lastname Lasrname of the User 
     */
app.use('/static',express.static(path.join(__dirname,'./public')))
    /**
     * @api {post} /public/html/file.html  文件上传
     * @apiName file.html
     * @apiGroup Upload
     * @apisuccess {String} firstname Firstname of the User
     * @apisuccess {String} lastname Lasrname of the User 
     */
app.use('/public',express.static(path.join(__dirname,'./static')))
    /**
     * @api {post} /api/index.html  接口文档地址
     * @apiGroup Upload
     * @apisuccess {String} firstname Firstname of the User
     * @apisuccess {String} lastname Lasrname of the User 
     */
app.use('/api/index.html',express.static(path.join(__dirname,'./api')))
// app.use('/socket',express.static(path.join(__dirname,'./socket')))
    /**
     * @api {post} /cros  代理跨域
     * @apiGroup Upload
     * @apisuccess {String} firstname Firstname of the User
     * @apisuccess {String} lastname Lasrname of the User 
     */
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
