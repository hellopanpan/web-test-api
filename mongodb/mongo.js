var mongoose = require("mongoose");
DB_URL = 'mongodb://localhost:27017/webtest';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function (err) {  
	if(err){
		console.log(err);
		return;
	}
  console.log('mongo connected');  
}); 
mongoose.connection.on('error',function (err) {    
	console.log('Mongoose error: ' + err);  
}); 
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose disconnected');  
}); 

module.exports = mongoose;