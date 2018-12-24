const express = require('express');
const router = express.Router();
const Restaurant = require("../models/restaurantModel");
const verifyToken = require('../middleware/verifytoken')
router.post('/saverestaurant',(req,res) => {
    console.log(req.body.data)
    console.log(req.decode)
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
        step: 2
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
module.exports = router;