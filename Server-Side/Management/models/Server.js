var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String
			},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
  date: {
    type: Date,
		default: Date.now()
  },
  admin:{
    type:Boolean,
    default:false
  }
});
UserSchema.index({'$**': 'text'});
//UserSchema.createIndex( { "$**": "text" } );

var Servers = module.exports = mongoose.model('servers', UserSchema);
