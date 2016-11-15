'use strict'
const Ad = require('../models/api.ads')

/*
  * @api {GET} /api/ads
  * @api purpose get all ads
  * @apiName allAds
  * @apiGroup ads
  *
  * @apiSuccess show all ad's title {String}
*/
let allAds = (req, res) => {
  Ad.find({}, (err, ads) => {
    if(err) res.status(400).json({'error': `Error: ${err}`})
    if(!ads) res.status(404).json({'message': 'Failed to get all ads'})
    res.status(200).json(ads)
  }).sort({_id: -1})
}

/*
  * @api {POST} /api/ads
  * @api purpose post new ad
  * @apiName addNewAd
  * @apiGroup ads
  *
  * @apiSuccess create new ad
*/
let addNewAd = (req, res) => {
  console.log(req.body);
  Ad.create({
    title : req.body.title,
    description: req.body.description,
    photo: req.body.photo,
    price: req.body.price,
    location: {
      address: req.body.address,
      addressCountry: req.body.addressCountry,
      postalCode: req.body.postalCode,
      long: 0,
      lat: 0
    }
  }, (err, new_ad) => {
    if(err) res.status(400).json({'error': `Error: ${err}`})
    if(!new_ad) res.status(404).json({'message': 'Failed to create new ad'})
    res.status(200).json(new_ad)
  })
}

/*
  * @api {PUT} /api/ads/:id
  * @api purpose put a ad
  * @apiName editAd
  * @apiGroup ads
  *
  * @apiSuccess edit a ad
*/
let editAd = (req, res) => {
  console.log(req.body.title);
  Ad.findOneAndUpdate({
    _id: req.params.id
  }, req.body,
  {
    new: true
  }, (err, updated_ad) => {
    if(err) res.status(400).json({'error': `Error: ${err}`})
    if(!updated_ad) res.status(404).json({'message': 'Failed to edit a ad'})
    res.status(200).json(updated_ad)
  })
}

/*
  * @api {DELETE} /api/ads/:id
  * @api purpose delete a ad
  * @apiName deleteAd
  * @apiGroup ads
  *
  * @apiSuccess delete a ad
*/
let deleteAd = (req, res) => {
  console.log(`delete`);
  Ad.findOneAndRemove({
    _id : req.params.id
  }, (err, deleted_ad) => {
    if(err) res.status(400).json({'error': `Error: ${err}`})
    if(!deleted_ad) res.status(404).json({'message': 'Failed to delete a ad'})
    res.status(200).json(deleted_ad)
  })
}

/*
  * @api {POST} /api/ads/seed
  * @api purpose seed data into ads
  * @apiName seedAds
  * @apiGroup ads
  *
  * @apiSuccess seed data into ads
*/
let seedAds = (req, res) => {
  Ad.create([{
    title: "Title 1",
    description: "Description 1",
    photo: "http://bit.ly/2eA9D8U",
    price : 123,
    location: {
      address: "Address 1",
      addressCountry: "USA",
      postalCode: 10750,
      long: "123123213",
      lat: "123213213"
    }
  },{
    title: "Title 2",
    description: "Description 2",
    photo: "http://bit.ly/2eA9D8U",
    price : 123,
    location: {
      address: "Address 2",
      addressCountry: "USA",
      postalCode: 10750,
      long: "123123213",
      lat: "123213213"
    }
  }, {
    title: "Title 3",
    description: "Description 3",
    photo: "http://bit.ly/2eA9D8U",
    price : 123,
    location: {
      address: "Address 3",
      addressCountry: "USA",
      postalCode: 10750,
      long: "123123213",
      lat: "123213213"
    }
  }], (err, seed_data) => {
    if(err) res.status(400).json({'error': `Error: ${err}`})
    if(!seed_data) res.status(404).json({'message': 'Failed to seed data to ads'})
    res.status(200).json(seed_data)
  })
}

/*
  * @api {POST} /api/ads/delete_all
  * @api purpose delete all ads
  * @apiName deleteAllAds
  * @apiGroup ads
  *
  * @apiSuccess delete all ads
*/
let deleteAllAds = (req, res) => {
  Ad.remove({}, (err, deleted_all) => {
    if(err) res.status(400).json({'error': `Error: ${err}`})
    if(!deleted_all) res.status(404).json({'message': 'Failed to delete all ads'})
    res.status(200).json(deleted_all)
  })
}

/*
  * @api {GET} /api/ads/:id
  * @api purpose get one ad
  * @apiName getOneAd
  * @apiGroup ads
  *
  * @apiSuccess get one ad
*/
let getOneAd = (req, res) => {
  console.log(`get one`);
  Ad.findOne({
    _id: req.params.id
  }, (err, one_ad) => {
    if(err) res.status(400).json({'error': `Error: ${err}`})
    if(!one_ad) res.status(404).json({'message': 'Failed to get one ad'})
    res.status(200).json(one_ad)
  })
}

module.exports = {
  allAds,
  addNewAd,
  editAd,
  deleteAd,
  seedAds,
  deleteAllAds,
  getOneAd
}
