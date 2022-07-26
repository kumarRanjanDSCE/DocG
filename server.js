const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const faq=require("./model/faq")
const review=require("./model/review")
var nodemailer = require('nodemailer');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//secret hash code
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
//connecting monogoD
mongoose.connect('mongodb://127.0.0.1:27017/account', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
var db=mongoose.connection; 
db.on('error',()=>console.log("Error in connection"));
db.once('open',()=>console.log("connected to database"));

const app = express()
app.use(cookieParser());
app.use(express.static('public'))
app.use(bodyParser.json())

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.get("/",async (req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
	const arr=await faq.find();
	const arr2=await review.find();
	console.log(arr);
    return res.render('index',{arr:arr,arr2:arr2});
})
app.get("/book-ambulance",(req,res)=>{
    return res.render('bookambu')})
app.get("/news",(req,res)=>{
    return res.render('news')})

app.post('/api/register', async (req, res) => {
    const { userName,email, password: plainTextPassword,Cpassword: plainTextPassword1 } = req.body

	if (!userName || typeof userName !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}
	if (plainTextPassword!=plainTextPassword1) {
		return res.json({ status: 'error', error: 'Password nOt match' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)
	const Cpassword = await bcrypt.hash(plainTextPassword1, 10)

	try {
		const response = await User.create({
			userName,
            email,
			password,
            Cpassword
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

app.post('/api/login', async (req, res) => {
	const { userName, password } = req.body
	const user = await User.findOne({ userName }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				userName: user.userName
			},
			JWT_SECRET,
			{ expiresIn: '2 seconds' }
		)
		res.cookie('jwt', token, {
			expires:new Date(Date.now()+3000),
			 httpOnly:true
		});

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

//sending health tips
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: '-------',//put your gamil
	  pass: '-------'//put your gmail password
	}
  });
app.post('/api/subscribe', (req, res) => {
	console.log(req.body);
	
    var mailOptions = {
		from: 'abhitabhkp.ic.20@nitj.ac.in',
		to: `${req.body.email}`,
		subject: 'Sending Email using Node.js',
		text: `Hi Smartherd, thank you for your nice Node.js tutorials.
				I will donate 50$ for this course. Please send me payment options.`,
		html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
	  };
	  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	  });
})

app.listen(9999, () => {
	console.log('Server up at 9999')
})




