const express = require('express');
const mongoose = require('mongoose');


const Theatres= require("../models/movie.model");


const router = express.Router()

router.post("/", async (req, res) => {
  try{
      const theatres = await Theatres.create(req.body)
      return res.status(201).send(theatres)
  }catch(e) {
      return res.status(500).send({message : e.message})
  }
}); 

module.exports = router