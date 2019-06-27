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

// Deleting a particular board
router.delete('/:userid/board/:boardid/delete', boardController.deleteBoard); 

// Updating a particular board
router.put('/:userid/board/:boardid/update', boardController.updateBoard);

// Creating new list
router.post('/board/:id/createlist', listController.createList)

// Getting all lists
router.get('/board/:id/getlists', listController.getLists)

// Updating a particular list
router.put('/board/:boardid/list/:listid/update', listController.updateList);

// Deleting a particular list
router.delete('/board/:boardid/list/:listid/delete', listController.deleteList)

// Creating new card
router.post('/board/:boardid/list/:listid/createcard', cardController.createCard)

// Getting all cards which belongs to a particular list
router.get('/list/:listid/getcards', cardController.getCards);

// Getting all lists after populating cards
router.get('/board/:id/list/getallcards', cardController.getAllCards);

// Deleting a particular card
router.delete('/list/:listid/card/:cardid/delete', cardController.deleteCard)

module.exports = router;