'use strict'
const Property = require('../models/property.model')


module.exports = {
    getAllProperty: function(req, res) {
        Property.find({}, function(err, data) {
            if (err) {
                console.log(err);
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    createProperty: function(req, res) {
        Property.create({
            title: req.body.title,
            property_type: req.body.property_type,
            location: {
                address: req.body.address,
                lat: req.body.lat,
                long: req.body.long
            },
            details: req.body.details,
            price: req.body.price,
            contact: {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email
            }
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    getPropertyById: function(req, res) {
        Property.findOne({
            property_id: req.params.id
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    updateProperty: function(req, res) {
        Property.findOneAndUpdate({
            property_id: req.params.id
        }, {
            title: req.body.title,
            property_type: req.body.property_type,
            location: {
                address: req.body.address,
                lat: req.body.lat,
                long: req.body.long
            },
            details: req.body.details,
            price: req.body.price,
            contact: {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email
            }
        }, { new: true }, function(err, data) {
            if (err) {
                console.log(err);
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    deleteProperty: function(req, res) {
        Property.remove({
            property_id: req.params.id
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    }
}
