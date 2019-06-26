const Board = require('../models/Board');
const User = require('../models/User');

module.exports = {
	createBoard: (req, res) => {
		const { boardName, dueDate } = req.body;
		const userId = req.params.id;
		const newBoard = new Board({
			boardName,
			dueDate
		})
		newBoard.save((err, board) => {
			if (err) return res.json({
				error: 'Could not create board'
			})
			User.findByIdAndUpdate(userId, {
				$push: {
					boards: board._id
				}
			}, { new: true }, (err, createdBoard) => {
				if (err) return res.json({
					error: 'Failed to update user'
				})
				return res.json({
					message: 'Board created, successfully',
					createdBoard: createdBoard.boards
				})
			})
		})
	},

	// getting boards
	getBoards: (req, res) => {
		const userId = req.params.id;
		User.findById(userId).populate('boards').exec((err, boards) => {
			if (err) return res.json({
				error: 'Could not get boards'
			})
			return res.json({
				message: 'Getting Boards, successfully',
				boards: boards.boards
			})
		})
	},

	// getting single board
	getSingleBoard: (req, res) => {
		let boardId = req.params.boardid;
		let userId = req.params.userid;
		User.findById(userId, (err, user) => {
			Board.findById(boardId).populate('lists').exec((err, board) => {
				if (err) return res.json({
					error: 'Could not get board'
				})
				return res.json({
					message: 'Getting board, successfully',
					board
				})
			})
		})
	},

	// Deleting a particular board
	deleteBoard: (req, res) => {
		let boardId = req.params.boardid;
		let userId = req.params.userid;
		Board.findOneAndDelete(boardId, (err, board) => {
			if (err) return res.json({
				error: 'Could not delete board'
			})
			User.findOneAndUpdate({ _id: userId }, {
				$pull: {
					boards: board._id
				}
			}, { new: true }).populate('boards').exec((err, updatedBoard) => {
				if (err) return res.json({
					error: 'Could not update user'
				})	
				return res.json({
					message: 'Board deleted, successfully',
					updatedBoard: updatedBoard.boards
				})
			})
		})
	},

	// Updating a particular board
	updateBoard: (req, res) => {
		let boardId = req.params.boardid;
		const { boardName } = req.body;
		Board.findOneAndUpdate({ _id: boardId}, {
			boardName
		}, { new: true }, (err, board) => {
			if (err) return res.json({
				error: 'Failed to update Board'
			})
			Board.find({}, (err, boards) => {
				if (err) return res.json({
					error: 'Failed to find Board'
				})
				return res.json({
					message: 'Board updated',
					boards
				})
			})
		})
	}
}