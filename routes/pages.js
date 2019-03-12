var express = require('express');
var router = express.Router();

// 引入并创建数据库 
var Pages = require("../mongodb/mongo.page.js")

// 插入
router.post('/add', function(req, response, next) {
  if(!req.body) return res.sendStatus(400);
  try{
    let page = new Pages({
      title: req.body.title,
      type: req.body.type,
      text: req.body.text,
      img: req.body.img,
      learn: req.body.learn,
      good: req.body.good,
      comment: req.body.comment,
      addtime: req.body.addtime
    })
    // 插入
    page.save((err, ress) => {
      if (err) {
        console.log("Error:" + err);
        response.sendStatus(500)
      }
      else {
        let data = {
          code: '0',
          data: {
            msg: 'add success'
          },
          msg: 'add success'
        }
        response.send(JSON.stringify(data))
      }
    })
  }catch(e) {
    console.log('err' + e);
    response.sendStatus(500)
  }
});

// 查询
router.get('/', function(req, response, next) {
  try{
    var sort = {'addtime': -1}; // 排序
    var reg = new RegExp(req.query.search,'i');   // 关键字
    var pageSize = Number(req.query.pageSize) || 10
    var currentPage = Number(req.query.currentPage) || 1 //当前第几页
    var skipnum = (currentPage - 1) * pageSize;   //跳过数
    var whereStr = {'title':{$regex: reg}};
    // 查询条数
    let promise1 = new Promise((resolve, reject) => {
      Pages.find(whereStr).sort(sort).count(true).exec((err, res) => {
        if (err) {
          reject(err)
          console.log("Error:" + err);
          res.sendStatus(500);
        }
        else {
          resolve(res)
        }
      })
    })
    // 查询list 数据
    let promise2 = new Promise((resolve, reject) => {
      Pages.find(whereStr).sort(sort).skip(skipnum).limit(pageSize).exec((err, res) => {
        if (err) {
          console.log("Error:" + err);
          res.sendStatus(500);
        }
        else {
          resolve(res)
        }
      })
    })
    Promise.all([promise1, promise2]).then((result) => {
      let data = {
        code: '0',
        data: {
          total: result[0],
          list: result[1]
        },
        msg: 'success'
      }
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(data));
    }).catch((error) => {
      console.log(error)
    })
  } catch(e) {
    console.log(e)
    res.sendStatus(500);
  }
  
});

// 删除
router.get('/remove', function(req, response, next) {
  // 删除
  let wherestr = {};
  Pages.remove(wherestr, (err, res) => {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      response.send('remove success');
    }
  })
});

// 更新
router.post('/update', function(req, response, next) {
  // 更新
  if(!req.body) return res.sendStatus(400);
  try{
    let wherestr = {'_id' : req.body._id};
    let updatestr = req.body;
    // updateMany 更新全部
    Pages.updateMany(wherestr, {$set: updatestr}, (err, res) => {
      if (err) {
        console.log("Error:" + err);
        res.sendStatus(500);
      }
      else {
        let data = {
          code: '0',
          data: {
            msg: 'update success'
          },
          msg: 'yes'
        }
        response.send(JSON.stringify(data))
      }
    })
  } catch(e) {
    console.log('err' + e)
    res.sendStatus(500);
  }
  
});

module.exports = router;
