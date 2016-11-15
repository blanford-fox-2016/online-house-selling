'use strict'

const express = require('express')
const router = express.Router();
const controller = require('../controllers/controller.api.house')

/* GET All Cards */
router.get('/houses', controller.allHouse)

/* POST one ads only */
router.post('/houses', controller.creating)

/* GET one card only */
router.get('/houses/:title', controller.searchHouse)

// /* PUT a card */
// router.put('/houses/:title', controller.update)
//
// /* DELETE one card only */
// router.delete('/houses/:title', controller.hapus)

module.exports = router
