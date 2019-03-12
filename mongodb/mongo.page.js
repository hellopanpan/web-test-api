var mongoose = require("mongoose");
let userSchema = new mongoose.Schema({ //table 模式,数据模型
	title:{
		type: String,
		default: "panpan"
	},
	type: {
		type: Number,
		default: 0
	},
	text:{
		type: String,
		default: "20"
	},
	img: {
		type: String,
		default: "20"
	},
	learn: {
		type: Number,
		default: 100
	},
	good: {
		type: Number,
		default: 20
	},
	comment: {
		type: Number,
		default: 16
	},
	addtime: {
		type: Number,
		default: 20
	}
});
// pageTable 集合名称；集合的结构对象
// pageTables 为collection的名称 查询；db.pageTables.find()
module.exports = mongoose.model('pageTable', userSchema); 
