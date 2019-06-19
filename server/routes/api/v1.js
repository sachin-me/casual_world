const router = require('express').Router();
const userController = require('../../controllers/user.controller');
const boardController = require('../../controllers/board.controller');
const listController = require('../../controllers/list.controller');

router.post('/createUser', userController.createUser);
router.post('/loginuser', userController.loginUser);

// Creating new board
router.post('/createboard', boardController.createBoard);

// Creating new list
router.post('/createlist', listController.createList)
module.exports = router;