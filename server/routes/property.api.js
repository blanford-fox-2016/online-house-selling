var express = require('express');
var router = express.Router();
const controller = require('../controller/property.controller');


router.get('/property', controller.getAllProperty);
router.post('/property', controller.createProperty);
router.get('/property/:id', controller.getPropertyById);
router.put('/property/:id', controller.updateProperty);
router.delete('/property/:id', controller.deleteProperty);





module.exports = router;
