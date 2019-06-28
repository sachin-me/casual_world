const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BoardSchema = new Schema({
	boardName: { type: String , required: true},
	lists: [{type: Schema.Types.ObjectId, ref: 'List'}]
})

const Board = mongoose.model('Board', BoardSchema);
module.exports = Board;