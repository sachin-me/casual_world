const router = require('express').Router();
const userController = require('../../controllers/user.controller');

router.post('/createUser', userController.createUser);
router.post('/loginuser', userController.loginUser);
module.exports = router;