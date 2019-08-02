
/*var infoUserSchema = new Schema({
	name: 		{ type: String },
	lastName: 		{ type: String },
	secondLastName: 	{ type: String },
	tel:  	{ type: String },
	email: 	{ type: String },
	sex: 	{ type: String},
	comment:{ type: String }    
});*/


var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var infoUserSchema = new Schema({
	title: 		{ type: String },
	year: 		{ type: String },
	country: 	{ type: String },
	poster:  	{ type: String },
	seasons: 	{ type: String },
	genre: 		{ type: String, enum :
					['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']
				},
	summary: 	{ type: String }    
});


module.exports = mongoose.model('RInfoUser', infoUserSchema);