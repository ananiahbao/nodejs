const express = require('express');
const router = express.Router();
const foodmodel = require('../db/model/foodModel');

    /**
     * @api {post} /food/add  添加
     * @apiName add
     * @apiGroup Food
     * 
     * @apiParam {String} name 名称
     * @apiParam {String} price 价格
     * @apiParam {String} desc 描述
     * @apiParam {String} typename 类型
     * @apiParam {Number} typdid id
     * @apiParam {String} img 图片
     * @apisuccess {String} firstname Firstname of the User
     * @apisuccess {String} lastname Lasrname of the User
     * 
     */
router.post('/add',(req,res) => {
    let data = {name,price,desc,typename,typeid ,img} =req.body;
    foodmodel.insertMany({name,price,desc,typename,typeid ,img})
    .then((data) => {
        res.send({err:0,msg:'插入成功！'})
    })
    .catch((err) => {
        res.send({err:-1,msg:'插入失败！'})
    })
});

    /**
     * @api {post} /food/typefind  分类查询
     * @apiName typefind
     * @apiGroup Food
     * @apiParam {Number} typdid id
     * @apisuccess {String} firstname Firstname of the User
     * @apisuccess {String} lastname Lasrname of the User
     * 
     */
router.post('/typefind',(req,res) => {
    let {typeid} = req.body;
    foodmodel.find({typeid})
    .then((data) => {
        res.send({err:0,msg:'查询成功！',list:data})
    })
    .catch((err) => {
        res.send({err:-1,msg:'查询失败！'})
    })
})
    /**
     * @api {post} /food/getInfoBykw  模糊查询
     * @apiName getInfokw
     * @apiGroup Food
     * @apiParam {String} kw 关键字
     * @apisuccess {String} firstname Firstname of the User
     * @apisuccess {String} lastname Lasrname of the User 
     */
router.post('/getInfoBykw',(req,res) => {
    // $set $gte $or $and $regex mongodb内置方法
    let {kw} = req.body;
    let reg = new RegExp(kw);
    // foodmodel.find({name:{$regex:reg}}) // 查询一个
    foodmodel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]})
    .then((data) => {
        res.send({err:0,msg:'ok',list:data})
    })
    .catch((err) =>{
        res.send({err:-1,msg:'no'})
    })

})

    /**
     * @api {post} /food/del  删除
     * @apiName del
     * @apiGroup Food
     * @apiParam {String} kw 关键字
     * @apisuccess {String} firstname Firstname of the User
     * @apisuccess {String} lastname Lasrname of the User 
     */
router.post('/del',(req,res) => {
    let {_id} = req.body;
    // console.log(_id.join(','))
    foodmodel.remove({_id})
    // foodmodel.deleteMany({_id:{$in:_id}}) //多项删除
    .then((data) => {
        res.send({err:0,msg:'ok'})
    })
    .catch((err) => {
        // console.log(err)
        res.send({err:-1,msg:'no'})
    })

})

    /**
     * @api {post} /food/update  修改
     * @apiName update
     * @apiGroup Food
     * @apiParam {String} name 名称
     * @apiParam {String} price 价格
     * @apiParam {String} desc 描述
     * @apiParam {String} typename 类型
     * @apiParam {Number} typdid id
     * @apiParam {String} img 图片
     * @apisuccess {String} firstname Firstname of the User
     * @apisuccess {String} lastname Lasrname of the User 
     */
router.post('/update',(req,res) => {
    let {_id,name,price,desc,typename,typeid ,img} =req.body;
    foodmodel.update({_id},{name,price,desc,typename,typeid ,img})
    .then((data) => {
        res.send({err:0,msg:'修改成功'})
    })
    .catch((err) => {
        res.send({err:-1,msg:'修改失败'})
    })
})
    /**
     * @api {post} /food/getInfoPage  修改
     * @apiName getInfoPage
     * @apiGroup Food
     * @apiParam {Number} pageSize 每页数据条数
     * @apiParam {Number} page 哪一页
     * @apisuccess {String} firstname Firstname of the User
     * @apisuccess {String} lastname Lasrname of the User 
     */
router.post('/getInfoPage',(req,res) => {
    let pageSize = req.body.pageSize || 5 // 给一个默认值
    let page = req.body.page || 1

    foodmodel.find().limit(Number(pageSize)).skip(Number((page - 1)*pageSize))
    .then((data) => {
        res.send({err:0,msg:'查询成功',list:data})
    })
    .catch((err) => {
        console.log(err)
        res.send({err:-1,msg:'查询失败'})
    })
})
module.exports = router