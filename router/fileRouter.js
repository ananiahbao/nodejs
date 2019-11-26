const express = require('express');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    //设置上传文件的路径，uploads文件夹会自动创建
    destination:function(req,file,cb) {
        cb(null,'./public/img')
    },
    filename:function(req,file,cb) {
        let exts = file.originalname.split('.')
        let ext = exts[exts.length -1]
        let temname = new Date().getTime() + parseInt(Math.random()*9999) // 时间戳
        //指定文件名
        cb(null,`${temname}.${ext}`);
    }
});
var upload = multer({
    storage: storage
})
    /**
     * @api {post} /food/upload  图片上传
     * @apiName upload
     * @apiGroup File
     * @apiParam {String} formData 图片formData,
     * @apiParam {Array} types 允许上传的数据类型
     * @apiParam {String} src 返回上传路径
     * @apiParam {String} img 前端formData
     * @apisuccess {String} firstname Firstname of the User
     * @apisuccess {String} lastname Lasrname of the User 
     */
router.post('/upload',upload.single('img'),(req,res) => {
    //img 上传图片数据的key值
    let {size,mimetype,path} = req.file
    let types = ['jpg','jpeg','gif'] 
    let tmpType = mimetype.split('/')[1]
    if(size >= 5000000000){ //小于等于500k
        return  res.send({err:-1,msg:'尺寸过大'})
    }else if(types.indexOf(tmpType) == -1){
        return res.send({err:-2,msg:'上传类型错误'})
    }else{
        let src = `/static/img/${req.file.filename}`
        res.send({err:0,msg:'上传ok',src:src})
    }
})

module.exports = router