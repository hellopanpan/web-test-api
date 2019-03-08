var mongoose = require("mongoose");
let userNum = new mongoose.Schema({ //table 模式,数据模型
	name:{
		type: String,
		default: "panpan"
	},
	age:{
		type: String,
		default: "20"
	},
});
let User = mongoose.model('userNummm', userNum); // userNummm 集合名称；集合的结构对象
// userNummms 为collection的名称 查询；db.userNummms.find()
module.exports = User