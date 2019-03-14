var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {host: 'http://static.xpanpan.com/webstatic'});
});


module.exports = router;
