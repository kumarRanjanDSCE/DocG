const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		userName: { type: String, required: true, unique: true },
        email: {type:String,required:true},
		password: { type: String, required: true },
        Cpassword: {type:String,required:true}
	},
	{ collection: 'new-user' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model