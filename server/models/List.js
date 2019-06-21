const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ListSchema = new Schema({
	listName: { type: String },
	board: { type: Schema.Types.ObjectId, ref: 'Board' },
	cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
})

const List = mongoose.model('List', ListSchema);
module.exports = List;