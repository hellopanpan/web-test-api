var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {host: 'http://localhost:8088'});
});


module.exports = router;
