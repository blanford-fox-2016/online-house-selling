var houses = require('../models/model.house');

module.exports = {
  // get one data house
  getOneDataHouse : function(req, res, next){
    houses.find({ _id : req.body.id }, function(err, data){
      if (err) throw err;
      res.json(data);
    })
  },
  // get all data houses
  getAllDataHouse : function(req, res, next){
    houses.find({}, function(err, data){
      if (err) throw err;

      res.json(data);
    })
  },
  // create house
  addNewHouse : function(req, res, next){
    console.log(req.body)
    var newHouse = houses({
      name : req.body.name,
      location : req.body.location,
      desc : req.body.desc
    });
    // save the user
    newHouse.save(function(err, data) {
      if (err) throw err;
      res.json(data)
    });
  },
  // update house
  updteHouse : function(req, res, next){
    User.findOneAndUpdate({ _id: req.body.id }, { username: 'starlord88' }, function(err, data) {
      if (err) throw err;
      // we have the updated user returned to us
      res.json(data)
    });
  },
  // delete house
  deleteHouse : function(req, res, next){
    User.findOneAndRemove({ _id: req.body.id }, function(err, data) {
      if (err) throw err;
      // we have deleted the user
      res.json(data)
    });
  }

}  // end module
