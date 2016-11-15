const House = require('../models/house')
const passport = require('passport')

module.exports = {
    seedHouse: function (req, res) {
        const dataHouse = [
            {
                title: 'title a',
                address: 'address a',
                price: 1000,
                long: '1212',
                lat: '22222',
                photoPath: 'path a',
                email: 'admin@gmail.com',
            }
        ]

        House.create(dataHouse, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    getHouse: function (req, res) {
        House.find(function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    getHouseByHouseId: function (req, res) {
        House.findOne({
            _id: req.params.houseId
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    createHouse: function (req, res) {
        const house = {
            title: req.body.title,
            address: req.body.address,
            price: req.body.price,
            long: "",
            lat: "",
            photoPath: "",
        }

        // console.log(question)

        House.create(house, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    deleteHouseByHouseId: function (req, res) {
        House.findOneAndRemove({
            _id: req.params.houseId
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    deleteAllHouses: function (req, res) {
        House.remove({}, function (err, data) {
            if (err) res.json(err)
            else res.json("All Houses deleted")
        })
    },

    updateHouse: function (req, res) {
        House.findOneAndUpdate({
            _id: req.params.houseId
        }, {
            title: req.body.title,
            address: req.body.address,
            price: req.body.price,
        }, {
            new: true,
            upsert: false
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    }
}