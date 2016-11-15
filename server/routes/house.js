var express = require('express');
var router = express.Router();
const HouseController = require('../controllers/controller.api.house')

router.get('/seed', HouseController.seedHouse)
router.get('/', HouseController.getHouse)
router.get('/:houseId', HouseController.getHouseByHouseId)
router.post('/', HouseController.createHouse)
router.delete('/', HouseController.deleteAllHouses)
router.delete('/:houseId', HouseController.deleteHouseByHouseId)
router.put('/:houseId', HouseController.updateHouse)

module.exports = router;
