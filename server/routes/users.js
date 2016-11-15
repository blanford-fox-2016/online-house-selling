var express = require('express');
var router = express.Router();
const userController = require('../controllers/controller.api.users')

router.get('/seed', userController.seedUser)
router.get('/', userController.getUser)
router.get('/:userId', userController.getUserByUserId)
router.post('/register', userController.localRegisterUser)
router.post('/login', userController.loginUser)
router.delete('/', userController.deleteAllUsers)
router.delete('/:userId', userController.deleteUserByUserId)
router.put('/:userId', userController.updateUser)

module.exports = router;
