const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ListSchema = new Schema({
	listName: { type: String }
})

const List = mongoose.model('List', ListSchema);
module.exports = List;