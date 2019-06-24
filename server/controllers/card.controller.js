const Card = require('../models/Card');
const List = require('../models/List');
const Board = require('../models/Board');

module.exports = {
	createCard: (req, res) => {
		const { cardName } = req.body;
		const listId = req.params.listid;
		const newCard = new Card({
			cardName
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
	}
}