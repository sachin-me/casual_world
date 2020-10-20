const router = require('express').Router();
const userController = require('../../controllers/user.controller');
const boardController = require('../../controllers/board.controller');
const listController = require('../../controllers/list.controller');
const cardController = require('../../controllers/card.controller');

router.post('/createUser', userController.createUser);
router.post('/loginuser', userController.loginUser);
router.get('/me', userController.getCurrentUser);
router.get('/logout', userController.logout);

// Creating new board
router.post('/createboard', boardController.createBoard);

// Getting list of boards
router.get('/getboards', boardController.getBoards);

// Getting single board
router.get('/board/:slug', boardController.getSingleBoard);

// Deleting a particular board
router.delete('/board/:boardid/delete', boardController.deleteBoard); 

// Updating a particular board
router.put('/board/:boardid/update', boardController.updateBoard);

// Creating new list
router.post('/board/:id/createlist', listController.createList)

// Getting all lists
router.get('/board/:slug/getlists', listController.getLists)

// Updating a particular list
router.put('/board/:boardid/list/:listid/update', listController.updateList);

// Deleting a particular list
router.delete('/board/:boardid/list/:listid/delete', listController.deleteList)

// Creating new card
router.post('/board/:boardid/list/:listid/createcard', cardController.createCard)

// Getting all cards which belongs to a particular list
router.get('/list/:listid/getcards', cardController.getCards);

// Getting all lists after populating cards
router.get('/board/:slug/list/getallcards', cardController.getAllCards);

// Deleting a particular card
router.delete('/list/:listid/card/:cardid/delete', cardController.deleteCard);

// Updating a particular card
router.put('/list/:listid/card/:cardid/update', cardController.updateCard)

// setting task status for a specific card
router.post('/list/:listid/card/:cardid/updatetaskstatus', cardController.updateTaskStatus)

// getting a single list
router.get('/list/:slug', listController.getSingleList);

// getting a single card
router.get('/card/:slug', cardController.getSingleCard);
module.exports = router;