const jwt = require('jsonwebtoken');
const scrict = 'sdlkjfpsjfspfjspj[sd;l;ask[';

function creatToken(palyload){
    //产生token
    palyload.ctime = Date.now() //创建时间
    palyload.exp = 1000*6; //设置token过期时间
    return jwt.sign(palyload,scrict)
}

function checkToken(token){
    return new Promise((resovle,reject) => {
        jwt.verify(token,scrict,(err,data) => {
            if(err){ reject('token 验证失败') }
            resovle(data)
        })
    })
}

module.exports = {
    creatToken,checkToken
}