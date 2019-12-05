const jwt = require('jsonwebtoken');

let secret = 'asdfasagfag234342'
let payload = {
    us:123,
    ps:456
}
//产生一个token
let token = jwt.sign(payload,secret) //h256加密 数据 荷载 secret
console.log(token)
// 验证token的合法性
jwt.verify(token,secret,(err,data) => {
    console.log(err)
    console.log(data)
})