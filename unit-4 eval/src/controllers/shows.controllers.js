const express = require('express');
const mongoose = require('mongoose');


const Shows= require("../models/movie.model");


const router = express.Router()

router.post("/", async (req, res) => {
  try{
      const show = await Shows.create(req.body)
      return res.status(201).send(show)
  }catch(e) {
      return res.status(500).send({message : e.message})
  }
}); 

module.exports = router