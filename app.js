// 引入依赖
var express = require('express');
var path = require('path');
var http = require('http');

// 数据库mongodb初始化
var mongoose = require("./mongodb/mongo.js")

// 建立 express 实例
var app = express();

// 处理post请求
var bodyParser= require("body-parser");
app.use(bodyParser.json());
// 可以在路由中处理

// 处理cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser('lifelove'));

// 启动服务
var server = http.createServer(app, (req, res) => {
  console.log('app is running at port 3000');
});
server.listen(3001);

// 访问pub静态资源
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 路由
app.all('*', function(req, res, next) {
	console.log(req.path)
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	console.log('connnect---->all')
	// console.log(req.cookies); 未加密
  // 加密
	console.log(req.signedCookies)
	let cookie = req.signedCookies
	// 校验登录
	// if (cookie.user === 'xpanpan' || /\login/.test(req.path)) {
	// 	next();
	// } else {
	// 	let data = {
	// 		code : 403,
	// 		msg: 'plz login!'
	// 	}
	// 	res.send(JSON.stringify(data))
	// }
	next()
	
});

// 使用routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pagesRouter = require('./routes/pages');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pages', pagesRouter);

