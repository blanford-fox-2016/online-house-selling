'use strict'

const express = require('express');
const mongoose = require('mongoose');
const House = require('../models/models.house');


//========================
// create house ======
//======================

let create = (req,res) => {

console.log(req.body);
    House.create({
      name : req.body.name,
      area  :req.body.area,
      price: req.body.price,
      image :req.body.image,
      location : req.body.location
    }, (err,data) => {
      if (err) {
        res.status(404)
      } else {
        console.log(data);
        res.status(200).json(data)
      }
    })

}
//===============
// find by id ===
//===============
let findById = (req,res) => {
  console.log(req.params.id);
  House.findById(req.params.id, (err,house) => {
    if (err) {
      res.status(404)
    }else {
      res.json(house)
    }
  })
}
//========================
// Show All house =======
//=======================

let showAll = (req,res) => {

  House.find({}, (err,data) => {
    if (err) {
      res.status(404)
    } else {
      res.json(data)
    }
  })

}

//========================
// Show by price ========
//=======================

let showPrice = (req,res) => {
console.log(req.body);
  House.find({price:req.params.price}, (err,data) => {
    if (err) {
      res.status(404)
    } else {
      res.json(data)
    }
  })

}

//========================
// Show by date =====
//=======================

let showDate = (req,res) => {
console.log(req.body);
  House.find({createdAt:req.params.date}, (err,data) => {
    if (err) {
      res.status(404)
    } else {
      res.json(data)
    }
  })

}

//========================
// Show by area =========
//=======================

let showArea = (req,res) => {
console.log(req.body);
  House.find({area:req.params.area}, (err,data) => {
    if (err) {
      res.status(404)
    } else {
      res.json(data)
    }
  })

}





//========================
// Delete house =========
//=======================

let deletehouse = (req,res) => {
console.log("ini delete");
console.log(req.params.id);
  House.findByIdAndRemove(req.params.id,(err,data) => {
    if (err) {
      res.status(404)
    } else {
      console.log(data);
      res.json(data)
    }
  })

}


//========================
// Update house =========
//=======================

let update = (req,res) => {

console.log("ini update");
console.log(req.body);

  House.findByIdAndUpdate(req.body.id,

    {
        name : req.body.name,
        area  :req.body.area,
        price: req.body.price,
        image :req.body.image,
        location : req.body.location

    },(err,house) => {
    if (err) {
      res.status(404)
    }else {
      console.log("nihh");
      console.log(house);
      res.json(house)
    }
  })

}



module.exports = ({

  create          : create,
  showAll         : showAll,
  showPrice       : showPrice,
  showDate        : showDate,
  showArea        : showArea,
  update          : update,
  deletehouse     : deletehouse,
  findById        : findById

})
