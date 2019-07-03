const Card = require('../models/Card');
const List = require('../models/List');
const Board = require('../models/Board');
const User = require('../models/User');

module.exports = {
	createCard: (req, res) => {
		const { cardName, dueDate } = req.body;
		const listId = req.params.listid;
		const userId = req.params.userid;

		User.findById(userId, (err, user) => {

			const newCard = new Card({
				cardName,
				dueDate,
				assignee: user._id
			})
			newCard.save((err, card) => {
				if (err) return res.json({
					error: 'Could not create card'
				})
				List.findByIdAndUpdate(listId, {
					$push: {
						cards: card._id
					}
				}, { new: true }, (err, createdCard) => {
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
		let boardId = req.params.id;
		Board.findById(boardId, (err, board) => {
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
	deleteCard: (req, res) => {
		let listId = req.params.listid;
		let cardId = req.params.cardid;
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

	}
}