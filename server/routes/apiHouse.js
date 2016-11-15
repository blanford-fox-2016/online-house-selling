'use strict'
const express = require('express');
const router = express.Router();
const house = require('../controllers/apiHousesController');

/* GET users listing. */
router.get('/', house.getAll);
router.post('/', house.addNew)
router.get('/:id', house.getOneById);
router.put('/:id', house.updateById);
router.delete('/:id', house.deleteById);


module.exports = router;
