'use strict'

const House = require('../models/model.api.house')

let creating = (req, res) => {
    House
        .create({
            title: req.body.title,
            address: req.body.address,
            description: req.body.description,
            price: req.body.price,
            email: req.body.email,
            picture: req.body.picture,
            google_map:{
              lat: req.body.lat,
              lng: req.body.lng
            }
        })
        .then(houses => res.json(houses))
        .catch(err => res.status(400).json({ Error: `${err}` }))
}


let allHouse = function(req, res){
  House.find({}, function(err, result){
    if(err){
      res.json({message: "error", details: err})
    } else {
      res.json(result)
    }
  })
}

let searchHouse = function(req, res){
  House.find({$or: [{title: {$regex: `${query}*`,$options: 'i'}},
  {address: {$regex: `${query}*`,$options: 'i'}},
  {description: {$regex: `${query}*`,$options: 'i'}}]}, function(err, result){
    if(err){
      res.json({message: "error", details: err})
    } else {
      res.json(result)
    }
  })
}

module.exports ={
  creating:creating,
  allHouse:allHouse,
  searchHouse:searchHouse
}
