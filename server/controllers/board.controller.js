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
	}
}