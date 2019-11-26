'use strict'
const nodemailer = require('nodemailer');

//创建邮件发布对象
let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 456,
    secure: true,
    auth:{
        user:'a_ananiah@foxmail.com',
        pass:'muzshiiihtjfeadi'
    }
});

function send(maill,code){
    // 邮件信息
    let mailobj = {
        form: '"Fred Foo" <a_ananiah@foxmail.com>',
        to: maill,
        subject: "1902",
        text: `您的验证码是${code}，有效期是五分钟！`
    }
    return new Promise((resolve,reject) => {
        transporter.sendMail(mailobj,(err,data) => {
            if(err){
                console.log(err)
                reject();
            }else{
                resolve();
            }
        })  
    })
}
module.exports = {send}