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
				console.log(createdCard, 'creating new card');
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

	// Getting list of all cards
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
	}
}