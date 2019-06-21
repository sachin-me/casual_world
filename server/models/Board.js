const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BoardSchema = new Schema({
	boardName: { type: String , required: true},
	dueDate: { type: String, required: true },
	status: {
		type: String, 
		enum: ['OPEN', 'IN PROGRESS', 'IN REVIEW', 'CLOSED'],
		default: 'OPEN'
	},
	lists: [{type: Schema.Types.ObjectId, ref: 'List'}]
})

const Board = mongoose.model('Board', BoardSchema);
module.exports = Board;