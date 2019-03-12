var express = require('express');
var router = express.Router();
// var bodyParser= require("body-parser");
// var jsonParser = bodyParser.json();
// 引入并创建数据库 

/* GET users listing. */
router.get('/', function(req, response, next) {
  let userI = new User({
    name: 'hh3',
    age: '2633',
    score: '6666'
  })
  User.find({}).limit(5).exec((err, res) => {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      response.send(res);
    }
  })
});
// 登录接口
router.post('/login', (req, res, next) => {
  if(!req.body) return res.sendStatus(400);
  console.log(req.signedCookies)
  try{
    if (req.body.username == 'panpan' && req.body.password == '123456') {
      let data = {
        code: '0',
        data: {
          msg: 'yes'
        },
        msg: 'success'
      }
      res.cookie('user', 'xpanpan', {
        signed: true,
        maxAge: 600000
      })
      res.send(JSON.stringify(data))
    } else {
      let data = {
        code: '1',
        data: {
          msg: 'no'
        },
        msg: 'no admin user! plz check it again!'
      }
      res.send(JSON.stringify(data))
    }
  } catch(e) {
    console.log('err' + e)
    res.sendStatus(500);
  }
  
})

module.exports = router;
