var express = require('express');
var router = express.Router();

// 引入并创建数据库 
var Pages = require("../mongodb/mongo.page.js")

// 插入
router.get('/add', function(req, response, next) {
  let page = new Pages({
    name: 'panpan',
    age: '2666666333',
  })
  // 插入
  page.save((err, res) => {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      response.send('add success');
    }
  })
});

// 查询
router.get('/', function(req, response, next) {
  Pages.find({}).exec((err, res) => {
    debugger
    if (err) {
      console.log("Error:" + err);
    }
    else {
      let data = {
        list: res
      }
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(data));
    }
  })
});

// 删除
router.get('/remove', function(req, response, next) {
  // 删除
  let wherestr = {'name' : 'zzzz'};
  Pages.remove(wherestr, (err, res) => {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      response.send('add success');
    }
  })
});

// 更新
router.get('/update', function(req, response, next) {
  // 更新
  let wherestr = {'name' : 'panpan'};
  let updatestr = {'name': 'zzzz'};
  // updateMany 更新全部
  Pages.updateMany(wherestr, {$set: updatestr}, (err, res) => {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      response.send('add success');
    }
  })
});

module.exports = router;
