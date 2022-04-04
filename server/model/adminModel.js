
const mongoose = require('mongoose');

// Admin Model
const adminSchema = new mongoose.Schema({
	name: String,
	email:{
        type:String,
        required: true,
        unique:true
    } ,
    password: String
});


const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin
