const List = require('../models/List');
const Board = require('../models/Board');

module.exports = {
	createList: (req, res) => {
		const { listName } = req.body;
		const boardId = req.params.id;
		const newList = new List({
			listName
		})
		newList.save((err, list) => {
			if (err) return res.json({
				error: 'Could not create list'
			})
			Board.findByIdAndUpdate(boardId, {
				$push: {
					lists: list._id
				}
			}, { new: true }, (err, updatedList) => {
				if (err) return res.json({
					error: 'Failed to update list'
				})
				return res.json({
					message: 'list created, successfully',
					updatedList
				})
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