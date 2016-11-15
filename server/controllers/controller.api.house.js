const House = require('../models/house')
const passport = require('passport')

module.exports = {
    seedHouse: function (req, res) {
        const dataHouse = [
            {
                title: 'title a',
                price: 1000,
                'location.address': 'address a',
                'location.long': '345',
                'location.lat': '123',
                photoPath: 'https://i.ytimg.com/vi/Xx6t0gmQ_Tw/maxresdefault.jpg',
            },
            {
                title: 'title b',
                price: 1000,
                'location.address': 'address b',
                'location.long': '345',
                'location.lat': '123',
                photoPath: 'http://wendypatton.com/wp-content/uploads/2014/07/house-siding.jpg',
            },
            {
                title: 'title c',
                price: 1000,
                'location.address': 'address c',
                'location.long': '345',
                'location.lat': '123',
                photoPath: 'https://nwhm.com/sites/default/files/styles/renderings-2x/public/renderings/garden-hosue_0002_Layer-12.jpg?itok=i69UXy2v',
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
            price: req.body.price,
            'location.address': req.body.address,
            'location.long': '',
            'location.lat': '',
            photoPath: '',
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
            price: req.body.price,
            'location.address': req.body.address,
            'location.long': req.body.long,
            'location.lat': req.body.lang,
        }, {
            new: true,
            upsert: false
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    }
}