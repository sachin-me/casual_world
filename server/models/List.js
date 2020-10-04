const mongoose = require('mongoose');
const slug = require('slug');

const Schema = mongoose.Schema;
const ListSchema = new Schema({
	listName: { type: String },
	board: { type: Schema.Types.ObjectId, ref: 'Board' },
	cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
	slug: { type: String, unique: true }
})

ListSchema.pre('save', function(next) {
	this.slug = slug(this.listName, { lower: true })
	next();
})

const List = mongoose.model('List', ListSchema);
module.exports = List;