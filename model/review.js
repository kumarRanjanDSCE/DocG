const mongoose = require('mongoose')

const review= new mongoose.Schema(
	{
		name:String,
        city:String,
        feedBack:String
	}
)
module.exports=mongoose.model('review',review);