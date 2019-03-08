// 引入依赖
var express = require('express');
var path = require('path');
var http = require('http');

// 数据库mongodb初始化
var mongoose = require("./mongodb/mongo.js")

// 建立 express 实例
var app = express();
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
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	console.log('connnect---->all')
	next();
});

// 使用routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pagesRouter = require('./routes/pages');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pages', pagesRouter);

