const mongoose = require('mongoose');
const slug = require('slug');

const Schema = mongoose.Schema;
const TeamSchema = new Schema({
	name: { type: String },
	email: { type: String, unique: true },
	Board: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
	slug: { type: String, unique: true }
})

TeamSchema.pre('save', function(next) {
	this.slug = slug(this.name, { lower: true })
	next();
})

const Team = mongoose.model('Team', TeamSchema);
module.exports = Team;