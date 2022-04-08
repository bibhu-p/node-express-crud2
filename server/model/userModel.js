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
        max: 12
    },
    phone: {
        type:Number,
        required: true,
        unique :true,
        min: [10, 'Must be at least 10 digits, got {VALUE}'],
        max:12
    },
    movie :[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "movies"
	}]
});

const User = mongoose.model('user', userSchema);

module.exports = User