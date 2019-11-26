"use strict";
const express = require('express');
// const nodemailer = require("nodemailer");
const app = express();
const bodypaser = require('body-parser');
app.use(bodypaser.urlencoded({extended:false}));
app.use(bodypaser.json())
app.post('/get',(req,res) =>{
  let {mail} = req.body;
  let code = parseInt(Math.random()*10000)
})
  
//监听端口
app.listen(3000,()=>{
    console.log('server start')
})