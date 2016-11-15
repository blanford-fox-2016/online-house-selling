const express = require('express');
const router = express.Router();
const controller = require('../controllers/house.controller');

// Get all houses
router.get('/houses', controller.list)

// POST a single house
router.post('/houses', controller.generate)

// GET a single house
router.get('/houses/:house_id', controller.find)

// PUT a single house
router.put('/houses/:house_id', controller.update)

// DELETE a single house
router.delete('/houses/:house_id', controller.destroy)

module.exports = router;
