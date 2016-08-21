var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShowSchema = new Schema ({
	show: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	note: {
		type: Schema.Types.ObjectId,
		ref: 'Note'
	}
});

var Show = mongoose.model('Show', ShowSchema);

module.exports = Show;