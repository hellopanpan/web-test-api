var express = require('express');
var router = express.Router();
var fs = require('fs')
var join = require('path').join;
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

// 读取文件, 返回目录
function getJsonFiles(jsonPath){
  let jsonFiles = [];
  function findJsonFile(path){
      let files = fs.readdirSync(path);
      files.forEach(function (item, index) {
          let fPath = join(path,item);
          let stat = fs.statSync(fPath);
          if(stat.isDirectory() === true) {
              findJsonFile(fPath);
          }
          if (stat.isFile() === true) { 
            jsonFiles.push(item);
          }
      });
  }
  findJsonFile(jsonPath);
  // console.log(jsonFiles);
  return jsonFiles
}
router.get('/pic', function(req, response, next) {
  try{
    // w文件目录
    let path = join(__dirname, '../public/images')
    // console.log(path);
    let pathArr = getJsonFiles(path)
    let data = {
      code: '0',
      data: {
        imgList: pathArr,
        msg: 'success'
      },
      msg: 'success'
    }
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));
  }catch(e) {
    console.log(e)
    response.sendStatus(500)
  }
})
// 删除文件

router.post('/remove', function(req, response, next) {
  let staticPath = '../public/images/' + req.body.picfile
  try{
    // w文件目录
    let filePath = join(__dirname, staticPath)
    console.log(filePath)
    
    if(!fs.existsSync(filePath)) {
      console.log('文件不存在');
      let data = {
        code: '-1',
        data: {
          msg: 'file is no exist!'
        },
        msg: 'file is no exist!'
      }
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(data));
    } else {
      console.log('删除文件成功....');
      fs.unlink(filePath, function(error){
          if(error){
              console.log(error);
              response.sendStatus(500)
          }
          console.log('删除文件成功');
          let data = {
            code: '0',
            data: {
              msg: 'remove success'
            },
            msg: 'success'
          }
          response.writeHead(200, {'Content-Type': 'application/json'});
          response.end(JSON.stringify(data));
      })
    }
  }catch(e) {
    console.log(e)
    response.sendStatus(500)
  }
})
module.exports = router;
