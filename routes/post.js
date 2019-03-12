var express = require('express');
var router = express.Router();
var fs = require('fs')
/* 上传 */
var multiparty = require('multiparty');

router.post('/', function(req, response, next) {
  try{
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/images'});
    form.parse(req, function(err, fields, files) {
      var filesTmp = JSON.stringify(files);
      console.log(filesTmp)
      if(err){
        console.log('parse error: ' + err);
        response.sendStatus(500)
      } else {
        // testJson = eval("(" + filesTmp+ ")"); 
        // console.log(testJson.file[0].path);
        // res.json({imgSrc:testJson.file[0].path})
        // console.log('rename ok');
        // 转化成对象
        var testJson = JSON.parse(filesTmp); 
        console.log(testJson.file[0].path);
        var uploadedPath = testJson.file[0].path;
        var dstPath = './public/images/' + testJson.file[0].originalFilename;
        // 重命名图片
        fs.rename(uploadedPath, dstPath, function(err) {
          if(err){
            console.log('parse error: ' + err);
            response.sendStatus(500)
          } else {
            let data = {
              code: '0',
              data: {
                imgUrl: dstPath
              },
              msg: 'success'
            }
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(data));
          }
        })
        
      }
    });
  }catch(e) {
    console.log(e)
    response.sendStatus(500)
  }
});


module.exports = router;
