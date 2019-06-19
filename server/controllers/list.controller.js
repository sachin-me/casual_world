const List = require('../models/List');

module.exports = {
	createList: (req, res) => {
		console.log(req.body, 'checking incoming data from client');
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
	}
}