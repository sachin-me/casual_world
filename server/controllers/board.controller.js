const Board = require('../models/Board');

module.exports = {
	createBoard: (req, res) => {
		const { boardName, dueDate } = req.body;
		const newBoard = new Board({
			boardName,
			dueDate
		})
		newBoard.save((err, board) => {
			if (err) return res.json({
				error: 'Could not create board'
			})
			res.json({
				message: 'Board created, successfully',
				board
			})
		})
	}
}