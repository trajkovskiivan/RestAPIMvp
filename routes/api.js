const express = require("express");
const {db, geoSearch} = require("../models/ninja");
const Ninja = require("../models/ninja");
const router = express.Router();


// get a list of ninjas from the db



router.get('/ninjas', (req, res, next) => {
  const {lng, lat} = req.query;
  console.log(lng);
  console.log(lat);
  Ninja.aggregate([
    {
      $geoNear:
      {
        near: {"type": 'Point', "coordinates": [lng, lat]},
        distanceField: "geometry",
        spherical: true
      }
    }
  ], (error, result) => {
    console.log(result)
  })
  // res.send('Ok')
})


/* 
({
    location: {
      $near: {
        $geometry: {type: "Point", coordinates: [},
        $maxDistance: 100000
      }
    }
  })
*/

// router.get('/ninjas', function (req, res, next) {
//   // Ninja.find({}).then(function(ninjas){
//   //  res.send(ninjas);
//   // });
//   Ninja.aggregate().near({
//     near:
//     {
//       'type': 'Point',
//       'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
//     },
//     maxDistance: 100000,
//     spherical: true,
//     distanceField: "dis"
//   }
//   ).then(function (ninjas) {
//     res.send(ninjas);
//   });
// });


// add a new ninja to the db
router.post('/ninjas', (req, res, next) => {
  console.log(req.body)
  let ninja = new Ninja(req.body);
  // ninja.save();
  Ninja.create(req.body).then((result) => {
    console.log(`Created`)
    res.send(result);
  }).catch(next);
  // res.send(req.body)
});

// update a ninja in the db
router.put('/ninjas/:id', (req, res, next) => {
  console.log(req.params)
  console.log(req.body)
  Ninja.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}).then((record) => {
    // Ninja.findOne({_id: req.params.id}).then(result => {
    //   res.send(result);
    // })
    res.send(record)
  }).catch((err) => {
    console.log(`There was an error`)
    res.send(err)
  })
  // Ninja.findByIdAndUpdate({_id: req.params.id}, req.body)
  //   .then((record) => {
  //     res.send(`Updated: ${record}`)
  //   })
});

// delete a ninja from the db
router.delete('/ninjas/:id', (req, res, next) => {
  Ninja.findByIdAndRemove({_id: req.params.id})
    .then((record) => {
      res.send(`Deleted ${record}`)
    });
});

module.exports = router;