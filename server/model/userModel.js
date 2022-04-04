const mongoose = require('mongoose');

// User Model 
const userSchema = new mongoose.Schema({
	name: String,
	email:{
        type:String,
        required: true,
        unique:true
    },
	password: String,
    address: String,
    age: Number,
    adhaar :{
        type:Number,
        unique:true,
        required:true
    },
    phone: Number
});

const User = mongoose.model('user', userSchema);

module.exports = User