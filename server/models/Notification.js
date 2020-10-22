const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
	card: { type: Schema.Types.ObjectId, ref: 'Card' },
	notifyTime: { type: Date },
	deadLine: { type: Date },
	read: { type: Boolean }
})

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;