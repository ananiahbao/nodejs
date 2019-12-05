const express = require('express');
const router = express.Router();
const user = require('../db/model/userModel');
const emaill = require('../utils/mail');
const jwt = require('../utils/jwt')

    /**
     * @api {post} /user/reg  用户注册
     * @apiName registered
     * @apiGroup User
     * @apiParam {String} us 用户名
     * @apiParam {String} ps 密码
     * @apisuccess {String} firstname Firstname of the User
     * @apisuccess {String} lastname Lasrname of the User
     * 
     */
router.post('/reg',(req,res) => {
    //获取数据
    let {us,ps} = req.body
    if(!us||!ps) return res.send({err:-1,msg:'参数错误！'})
    user.find({us})
    .then((data) => {
        if(data.length === 0){
            user.insertMany({us:us,ps:ps})
        }else{
            return res.send({err:-3,msg:'用户名存在！'})
        }
    })
    .then(()=>{
        return res.send({err:0,msg:'写入成功！'})
    })
    .catch((err) => {
        return res.send({err:-2,msg:'写入失败！'})
    })
    // 数据处理
    //返回数据
   
})
    /**
     * @api {post} /user/login  用户登录
     * @apiName login
     * @apiGroup User
     * @apiParam {String} us 用户名
     * @apiParam {String} ps 密码
     * @apiParam err : 0 成功 -1 参数错误 -2 用户名或密码不正确！
     * @apisuccess {String} lastname Lasrname of the User
     * @apisuccess {String} lastname Lasrname of the User
     * 
     */
//登录
router.post('/login',(req,res) => {
    let {us,ps} = req.body;
    if(!us || !ps) return res.send({err:-1,msg:'参数错误!'});
    user.find({us,ps})
    .then((data) => {
        if(data.length > 0){
            // 登陆成功之后将用户的信息存到session中
            // req.session.login = true
            // req.session.us = us
            // jwt验证
            let token = jwt.creatToken({login:true,name:us})
            console.log(token)
            return res.send({err:0,msg:'登录成功！',token:token})
        }else{
            return res.send({err:-2,msg:'用户名或密码不正确！'})
        }
       
    })
    .catch((err) => {
        console.log(err)
        return res.send({err:-2,msg:'内部错误！'})
    })
})
  /**
     * @api {post} /user/sendmail  发送邮箱验证码
     * @apiName sendMail
     * @apiGroup User
     * @apiParam {String} mail 邮箱
     * @apisuccess {String} lastname Lasrname of the User 
     * @apisuccess {String} lastname Lasrname of the User 
     */
//邮箱发送验证码
router.post('/sendmail',(req,res) =>{
    let {mail} = req.body;
    let code = parseInt(Math.random()*10000);
    emaill.send(mail,code)
    .then(() => {
        res.send({err:0,msg:'验证码发送成功！'})
    })
    .catch((err) => {
        res.send({err:1,msg:'验证码发送失败！'})
    })
})
  /**
     * @api {post} /user/logout  销毁保存的session
     * @apiName logout
     * @apiGroup User
     * @apisuccess {String} lastname Lasrname of the User 
     * @apisuccess {String} lastname Lasrname of the User 
     */
//销毁保存的session
router.post('/logout',(req,res) =>{
    req.session.destroy() 
    res.send({err:0,msg:'已退出！'})
})
 
module.exports = router