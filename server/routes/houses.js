var express = require('express');
var router = express.Router();
var controllerHouse = require('../controllers/controller.house')

/* GET users listing. */
router.get('/', controllerHouse.getAllDataHouse);
router.post('/', controllerHouse.addNewHouse);
router.get('/:id', controllerHouse.getOneDataHouse);


module.exports = router;
