const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');

const Movie = require("../models/movie.model");
const upload = require("../middleware/uploads");
const fs = require("fs");

const router = express.Router()

router.post("/", upload.single("poster_url"), async (req, res) => {
  try{
      const movie = await Movie.create({
          name: req.body.name,
          actors: req.body.actors,
          languages: req.body.languages,
          directors: req.body.directors,
          poster_url: req.file.path,
      })
      return res.status(201).send(movie)
  }catch(e) {
      return res.status(500).send({message : e.message})
  }
}); 
module.exports = router