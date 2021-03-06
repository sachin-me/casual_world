const JWT = require('jsonwebtoken');
const Card = require('../models/Card');
const List = require('../models/List');
const Board = require('../models/Board');
const User = require('../models/User');
const Notification = require('../models/Notification');

module.exports = {
	createCard: (req, res) => {
		const { cardName, dueDate } = req.body;

		const listId = req.params.listid;
		const token = req.cookies.token;
		const user = JWT.verify(token, 'secret');
		console.log(user, 'getting user in get boards');
		const { id } = user;

		User.findById(id, (err, user) => {

			const newCard = new Card({
				cardName,
				dueDate,
				assignee: user._id,
				list: listId
			})
			newCard.save((err, card) => {
				if (err) return res.json({
					error: 'Could not create card'
				})

				const cardId = card._id;
				const data = { cardId, ...req.body }

				// creating new notification when a new card is created
				const crtTS = +new Date(dueDate);
				const newNotification = new Notification({
					card: cardId,
					notifyTime: Math.abs(crtTS - (+new Date())),
					deadLine: crtTS,
					read: false
				})

				newNotification.save(((err, data) => {
					// console.log(data, 'data after saving notificaiton in db');
					if (err) {
						return res.json({
							error: 'Failed to create notification'
						})
					} else {
						Card.findByIdAndUpdate(data.card, {
							$push: {
								notifications: data._id
							} 
						}, { new: true, upsert: true }, (err, res) => {
							if (err) {
								throw new Error(err);
							}
							console.log(res, 'res after updating card');
						})
					}
				}));

				List.findByIdAndUpdate(listId, {
					$push: {
						cards: card._id
					}
				}, { new: true }, (err, createdCard) => {
					console.log(createdCard, 'created card');
					if (err) return res.json({
						error: 'Could not update list'
					})
					return res.json({
						message: 'Card created, successfully',
						createdCard
					})
				})
			})
		})
	},

	// Getting list of all cards which belongs to a particular list
	getCards: (req, res) => {
		const listId = req.params.listid;
		List.findById(listId).populate('cards').exec((err, cards) => {
			if (err) return res.json({
				error: 'Could not get cards'
			})
			return res.json({
				message: 'Getting cards, successfully',
				cards
			})
		})
	},

	// Getting all lists after populating cards
	getAllCards: (req, res) => {
		let boardSlug = req.params.slug;
		Board.findOne({ slug: boardSlug }, (err, board) => {
			if (err) return res.json({
				error: 'Could not get board'
			})
			List.find({}).populate('cards').exec((err, lists) => {
				if (err) return res.json({
					error: 'Could not get lists'
				})
				return res.json({
					message: 'Getting lists, successfully',
					lists
				})
			})
		})
	},

	// Deleting a particular card
	deleteCard: async (req, res) => {
		let listId = req.params.listid;
		let cardId = req.params.cardid;
		await Card.findByIdAndDelete(cardId, (err, card) => {
			if (err) {
				return res.json({
					error: 'Could not delete card'
				})
			}

			List.findByIdAndUpdate(listId, {
				$pull: {
					cards: card._id
				}
			}, { upsert: true }, (err, list) => {
				if (err) {
					return res.json({
						error: 'Could not update list'
					})
				}
				List.find({}).populate('cards').exec((err, cards) => {
					if (err) {
						return res.json({
							error: 'Failed to update list afer deleting card'
						})
					}
					return res.json({
						message: 'Card deleted, successfully',
						cards
					})
				})
			})
		})

		const deleteNotification = await Notification.findOneAndDelete({ card: cardId });
	},

	// Updating a new card
	updateCard: (req, res) => {
		let listId = req.params.listid;
		let cardId = req.params.cardid;
		const { cardName } = req.body;

		Card.findByIdAndUpdate(cardId, {
			cardName
		}, { new: true }, (err, card) => {
			if (err) {
				return res.json({
					error: 'Failed to update card'
				})
			}
			List.find({}).populate('cards').exec((err, cards) => {
				if (err) {
					return res.json({
						error: 'Failed to update list afer deleting card'
					})
				}
				return res.json({
					message: 'Card deleted, successfully',
					cards
				})
			})
		})
	},

	// Setting task status for a specific card
	updateTaskStatus: (req, res) => {

		let listId = req.params.listid;
		let cardId = req.params.cardid;

		const { value } = req.body;

		if (value === 'CLOSED') {
			Card.findByIdAndDelete(cardId, (err, card) => {
				if (err) {
					return res.json({
						error: 'Could not delete card'
					})
				}
				List.findByIdAndUpdate(listId, {
					$pull: {
						cards: card._id
					}
				}, { upsert: true }, (err, list) => {
					if (err) {
						return res.json({
							error: 'Could not update list'
						})
					}
					List.find({}).populate('cards').exec((err, cards) => {
						if (err) {
							return res.json({
								error: 'Failed to update list afer deleting card'
							})
						}
						return res.json({
							message: 'Card deleted, successfully',
							cards
						})
					})
				})
			})
		} else {
			Card.findByIdAndUpdate(cardId, {
				$set: {
					status: value
				}
			}, { new: true }, (err, card) => {
				if (err) {
					return res.json({
						error: 'Failed to update card'
					})
				}

				List.find({}).populate('cards').exec((err, cards) => {
					if (err) {
						return res.json({
							error: 'Failed to update task status'
						})
					}
					return res.json({
						message: 'Task status updated, successfully',
						cards
					})
				})
			})
		}

	},

	// Getting a single card
	getSingleCard: (req, res) => {
		const { slug } = req.params;
		Card.findOne({ slug: slug }, function (err, card) {
			if (err) {
				return res.json({
					error: 'Falied to get single card'
				})
			} else {
				return res.json({
					message: 'Card getting successfully',
					card
				})
			}
		})
	},
}