const mongoose = require('mongoose');

// Movies Model
const moviesSchema = new mongoose.Schema({
	name: String,
	director: String,
	hero : String,
    heroine: String,
    producer: String
})

const Movies = mongoose.model('movies', moviesSchema);

module.exports = Movies