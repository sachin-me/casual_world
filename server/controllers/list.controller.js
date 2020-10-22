const List = require('../models/List');
const Board = require('../models/Board');
const Notification = require('../models/Notification');
const Card = require('../models/Card');

module.exports = {
	createList: (req, res) => {
		const { listName } = req.body;
		const boardId = req.params.id;
		const newList = new List({
			listName,
			board: boardId,
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
		let boardSlug = req.params.slug;
		Board.findOne({ slug: boardSlug }).populate('lists').exec((err, lists) => {
			if (err) return res.json({
				error: 'Could not get lists'
			})
			return res.json({
				message: 'Getting lists',
				lists
			})
		})
	},

	// Updating a particular list
	updateList: (req, res) => {
		let boardId = req.params.boardid;
		let listId = req.params.listid;
		const { listName } = req.body;
		List.findOneAndUpdate({ _id: listId}, {
			listName
		}, { new: true }, (err, list) => {
			if (err) return res.json({
				error: 'Failed to update list'
			})
			List.find({}, (err, lists) => {
				if (err) return res.json({
					error: 'Could not find lists'
				})
				return res.json({
					message: 'List updated',
					lists
				})
			})
		})
	},

	// Deleting a particular list
	deleteList: async (req, res) => {
		let boardId = req.params.boardid;
		let listid = req.params.listid;
		 
		List.findByIdAndDelete(listid, async (err, list) => {
			if (err) return res.json({
				error: 'Could not delete list'
			})
			if (list) {
				const deletedCard = await Card.findOneAndDelete({ list: listid });
				const deleteNotification = await Notification.findOneAndDelete({ card: deletedCard._id });
				
				Board.findByIdAndUpdate(boardId, {
					$pull: {
						lists: listid
					}
				}, { new: true }).populate('lists').exec((err, updatedList) => {
					if (err) return res.json({
						error: 'Could not update board'
					})
					return res.json({
						message: 'List deleted, successfully',
						updatedList: updatedList.lists
					})
				})
				
			}
		})
		
	},

	getSingleList: (req, res) => {
		let { slug } = req.params;
		List.findOne({ slug: slug }, function (err, list) {
			if (err) {
				return res.json({
					error: 'Could not find list'
				})
			} else {
				return res.json({
					message: 'List getting successfully',
					list
				})
			}
		})
	}
}