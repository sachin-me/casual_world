const mongoose = require('mongoose');
const slug = require('slug');

const Schema = mongoose.Schema;
const CardSchema = new Schema({
	cardName: { type: String, required: true },
	dueDate: { type: String, required: true },
	status: {
		type: String, 
		enum: ['OPEN', 'IN PROGRESS', 'IN REVIEW', 'CLOSED'],
		default: 'OPEN'
	},
	assignee: [{type: Schema.Types.ObjectId, ref: 'User'}],
	slug: { type: String, unique: true },
	list: { type: Schema.Types.ObjectId, ref: 'List' },
})

CardSchema.pre('save', function(next) {
	this.slug = slug(this.cardName, { lower: true });
	next();
})

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;