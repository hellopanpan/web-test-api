var express = require('express');
var router = express.Router();

// 引入并创建数据库 
var User = require("../mongodb/mongo.user.js")

/* GET users listing. */
router.get('/', function(req, response, next) {
  let userI = new User({
    name: 'hh3',
    age: '2633',
    score: '6666'
  })
  // 插入
  // userI.save((err, res) => {
  //   if (err) {
  //     console.log("Error:" + err);
  //   }
  //   else {
  //     console.log("Res:" + res);
  //   }
  // })

  // 删除
  // User.remove((err, res) => {
  //   if (err) {
  //     console.log("Error:" + err);
  //   }
  //   else {
  //     console.log("Res:" + res);
  //   }
  // })
  User.find({}).limit(5).exec((err, res) => {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      response.send(res);
    }
  })
});

module.exports = router;
