const express = require('express');
const router = express.Router();
const Restaurant = require("../models/restaurantModel");
const verifyToken = require('../middleware/verifytoken')
router.post('/saverestaurant',(req,res) => {
    const {
        restaurantName,
        address,
        county,
        city
    } = req.body.data.post
  
    const restaurant = new Restaurant({
        restaurantName,
        address,
        county,
        city,
        adminId : req.decode.id,
        step : 2
    });
    const promise = restaurant.save();
    promise.then((data) => {
        res.json({
          status: true
        })
      }).catch((err) => {
        res.json({ status: false, message: err.message})
      })
    
})
router.post('/checkstatus', (req,res) => {
    Restaurant.findOne({adminId : req.decode.id})
        .then(restaurant => {
            if (restaurant) {
                res.json({ step : restaurant.step })
            } else {
                res.json({ step: 1})
            }
        })
})
router.put('/updaterestaurant',(req,res) => {
    Restaurant.findOne({adminId : req.decode.id})
        .then(restaurant => {
            if (restaurant) {
                console.log(req.body.data)
                restaurant.tables = req.body.data.post
                restaurant.step = 3
                restaurant.save();
                res.json({ status: true })
            } 
        })
        .catch(err => res.json({ status: false, message: err.message }))
})
module.exports = router;