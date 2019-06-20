const List = require('../models/List');

module.exports = {
	createList: (req, res) => {
		const { listName } = req.body;
		const newList = new List({
			listName
		})
		newList.save((err, list) => {
			if (err) return res.json({
				error: 'Could not create list'
			})
			return res.json({
				message: 'list created, successfully',
				list
			})
		})
	},
	getLists: (req, res) => {
		List.find({}, (err, lists) => {
			if (err) return res.json({
				error: 'Could not get lists'
			})
			return res.json({
				message: 'Getting lists',
				lists
			})
		})
	}
}