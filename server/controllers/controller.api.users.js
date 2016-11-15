const User = require('../models/user')
const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = {
    seedUser: function (req, res) {
        const dataUser = [
            {
                name: 'admin',
                username: 'admin',
                password: 'admin',
                email: 'admin@gmail.com',
            }
        ]

        User.create(dataUser, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    getUser: function (req, res) {
        User.find(function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    getUserByUserId: function (req, res) {
        User.findOne({
            userId: req.params.userId
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    localRegisterUser: function (req, res) {
        console.log(req.body)
        User.register(new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email
        }), req.body.password, function (err, data) {
            if (err) res.json(err)
            else {
                passport.authenticate('local')(req, res, function () {
                    req.session.save(function (err) {
                        if (err) res.json(err)
                        else res.json(data)
                    })
                })
            }
        })
    },

    deleteUserByUserId: function (req, res) {
        User.findOneAndRemove({
            userId: req.params.userId
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    deleteAllUsers: function (req, res) {
        User.remove({}, function (err, data) {
            if (err) res.json(err)
            else res.json("All users deleted")
        })
    },

    updateUser: function (req, res) {
        User.findOneAndUpdate({
            userId: req.params.userId
        }, {
            name: req.body.name,
            email: req.body.email
        }, {
            new: true,
            upsert: false
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    loginUser: function (req, res, next) {

        passport.authenticate('local', {

        }, function (err, user, info) {
            console.log(user)
            if (err) return res.json(err)
            else res.json(user)


            // return res.status(200).json({
            //     token: jwt.sign({
            //         username: user.username,
            //         name: user.name
            //     }, process.env.SESSION_SECRET)
            // })
        })(req, res, next)
    }

}