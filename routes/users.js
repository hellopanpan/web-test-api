var express = require('express');
var router = express.Router();

// 引入并创建数据库 
var User = require("../mongodb/user.js")

/* GET users listing. */
router.get('/', function(req, res, next) {
  let userI = new User({
    name: 'hh3',
    age: '2633'
  })
  userI.save((err, res) => {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
  res.send('respond with a resource');
});

module.exports = router;
