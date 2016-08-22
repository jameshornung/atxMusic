var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShowSchema = new Schema ({
	show: {
		type: String,
		required: true,
		unique: true
	},
	link: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	note: [{
		type: Schema.Types.ObjectId,
		ref: 'Note'
	}]
});

var Show = mongoose.model('Show', ShowSchema);

module.exports = Show;