const express = require('express');
const router = express.Router();

const controller = require('../controllers/api.ads')

/*
  * show all ads
*/
router.get('/', controller.allAds)

/*
  * process new ad
*/
router.post('/', controller.addNewAd)

/*
  * edit one ad
*/
router.put('/:id', controller.editAd)

/*
  * delete one ad
*/
router.delete('/:id', controller.deleteAd)

/*
  * seed ad data
*/
router.post('/seed', controller.seedDataAds)

/*
  * delete all ads
*/
router.delete('/', controller.deleteAllAds)

/*
  * get one ad
*/
router.get('/:id', controller.getOneAd)

module.exports = router;
