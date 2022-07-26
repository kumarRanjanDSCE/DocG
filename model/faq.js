const mongoose = require('mongoose')

const faq= new mongoose.Schema(
	{
		ques:String,
        ans:String
	}
)
module.exports=mongoose.model('faq',faq);