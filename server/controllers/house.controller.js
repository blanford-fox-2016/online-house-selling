'use strict'

const House = require('../models/house.model');

module.exports = {
  // showing all houses available inside database
  // this task is mongoose responsibility
  list(req, res) {
    House
      .find()
      .then((houses) => res.json(houses))
      .catch((err) => res.json(err))
  },

  generate(req, res) {
    console.log(req.body)
    // let houseData = {
    //   title: req.body.title,
    //   description: req.body.description,
    //   image: req.body.image,
    //   price: req.body.price,
    //   location: req.body.location
    // }

    // asking mongoose to create hose for us
    House
      .create(req.body)
      .then((house) => {
        console.log(house)
        res.json(house)
      })
      .catch((err) => res.json(err))
  },

  find(req, res) {
    House
      .find({house_id: req.params.house_id})
      .then((house) => res.json(house))
      .catch((err) => res.json(err))
  },

  update(req, res) {
    House
      .findOneAndUpdate({house_id: req.params.house_id}, req.body, {new: true})
      .then((house) => res.json(house))
      .catch((err) => res.json(err))
  },

  destroy(req, res) {
    House
      .findOneAndRemove({house_id: req.params.house_id})
      .then(() => res.json({message: 'the house has been deleted'}))
      .catch((err) => res.json(err))
  }

}
