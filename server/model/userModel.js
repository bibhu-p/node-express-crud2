const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

// User Model 
const userSchema = new mongoose.Schema({
	name: {
        type:String,
        required:true
    },
	email:{
        type:String,
        required: true,
        unique:true
    },
	password: {
        type:String,
        required :true
    },
    address: String,
    age: Number,
    adhaar :{
        type:Number,
        unique:true,
        required:true,
    },
    phone: {
        type:Number,
        required: true,
        unique :true,
    },
    movie :[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "movies"
	}]
});

const User = mongoose.model('user', userSchema);

module.exports = User