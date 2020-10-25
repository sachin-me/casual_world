const mongoose = require('mongoose');
const slug = require('slug');

const Schema = mongoose.Schema;
const BoardSchema = new Schema({
	boardName: { type: String , required: true},
	lists: [{type: Schema.Types.ObjectId, ref: 'List'}],
	slug: { type: String, unique: true },
	teamMembers: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
})

BoardSchema.pre('save', function(next) {
	this.slug = slug(this.boardName, { lower: true });
	next();
})

const Board = mongoose.model('Board', BoardSchema);
module.exports = Board;