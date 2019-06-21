const Card = require('../models/Card');
const List = require('../models/List');

module.exports = {
	createCard: (req, res) => {
		const { cardName } = req.body;
		const newCard = new Card({
			cardName
		})
		newCard.save((err, card) => {
			if (err) return res.json({
				error: 'Could not create card'
			})
			
			return res.json({
				message: 'Card created, successfully',
				card
			})
		})
	}
}