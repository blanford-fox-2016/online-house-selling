const Houses = require('../models/Houses');

let getAll = (req, res, next) => {
  Houses.find({},
  (err, questions) => {
    if (err) {
      console.log(err);
    } else {
      res.json(questions);
    }
  })
}

let getOneById = (req, res, next) => {
  Houses.findOne({
    _id: req.params.id
  },
  (err, question) => {
    if (err) {
      console.log(err);
    } else {
      res.json(question);
    }
  })
}

let addNew = (req, res, next) => {
  Houses.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    owner: req.body.owner,
    phone: req.body.phone,
    address: req.body.address,
    lat: req.body.lat,
    long: req.body.long
  }, (err, question) => {
    if (err) {
      console.log(err);
    } else{
      res.json(question);
    }
  })
}

let updateById = (req, res, next) => {
  Houses.update({
    _id: req.params.id
  }, req.body, (err, updated) => {
    if (err) {
      console.log(err);
    } else {
      res.json(updated);
    }
  })
}

let deleteById = (req, res, next) => {
  Houses.remove({
    _id: req.params.id
  }, (err, deleted) => {
    if (err) {
      console.log(err);
    } else {
      res.json(deleted);
    }
  })
}

module.exports = {
  getAll: getAll,
  getOneById: getOneById,
  addNew: addNew,
  updateById: updateById,
  deleteById: deleteById
}
