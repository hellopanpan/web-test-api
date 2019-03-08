var mongoose = require("mongoose");
let userSchema = new mongoose.Schema({ //table 模式,数据模型
	name:{
		type: String,
		default: "panpan"
	},
	age:{
		type: String,
		default: "20"
	},
});
// pageTable 集合名称；集合的结构对象
// pageTables 为collection的名称 查询；db.pageTables.find()
module.exports = mongoose.model('pageTable', userSchema); 
