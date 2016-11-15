'use strict'

const express = require('express');
const router = express.Router();
const House = require('../controller/controller.house');



/* GET home page. */

// show all ads

router.get('/', House.showAll);


// search user by area and price

router.get('/date/:date',House.showDate)

router.get('/area/:area',House.showArea)

router.get('/price/:price', House.showPrice)
// find by id
router.get('/:id', House.findById)
// update house by id

router.put('/:id', House.update);

// create new house

router.post('/', House.create);

// delete house

router.delete('/:id', House.deletehouse);

module.exports = router ;
