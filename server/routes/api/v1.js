const router = require('express').Router();
const userController = require('../../controllers/user.controller');
const boardController = require('../../controllers/board.controller');
const listController = require('../../controllers/list.controller');
const cardController = require('../../controllers/card.controller');

router.post('/createUser', userController.createUser);
router.post('/loginuser', userController.loginUser);

// Creating new board
router.post('/:id/createboard', boardController.createBoard);

// Getting list of boards
router.get('/:id/getboards', boardController.getBoards);

// Getting single board
router.get('/:userid/board/:boardid', boardController.getSingleBoard);

// Creating new list
router.post('/board/:id/createlist', listController.createList)

// Getting all lists
router.get('/board/:id/getlists', listController.getLists)

// Creating new card
router.post('/board/:boardid/list/:listid/createcard', cardController.createCard)

// Getting all cards which belongs to a particular list
router.get('/list/:listid/getcards', cardController.getCards);

module.exports = router;