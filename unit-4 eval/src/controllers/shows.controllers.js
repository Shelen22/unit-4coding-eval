const express = require('express');
const mongoose = require('mongoose');


const Shows= require("../models/shows.model");


const router = express.Router()

router.post("/", async (req, res) => {
  try{
      const show = await Shows.create(req.body)
      return res.status(201).send(show)
  }catch(e) {
      return res.status(500).send({message : e.message})
  }
}); 

router.get("/:shows_id", async (req, res)=>{
  try{
       const show = await Shows.findOne({shows_id: req.params.shows_id}).populate("movie_id").populate("screen_id")
       .populate({path: "screen_id", populate: {path:"theatres_id"}}).lean().exec();

      return res.status(201).send(show)
  }catch(e){
    return res.status(500).send({message : e.message})

  }
})

router.get("/:shows_id/seats", async (req, res)=>{
  try{
       const show = await Shows.findOne({shows_id: req.params.shows_id}).lean().exec();

      return res.status(201).send(show)
  }catch(e){
    return res.status(500).send({message : e.message})
  }
});
 
router.get("/:shows_id/nearest", async (req, res)=>{
  try{
       const show = await Shows.findOne({shows_id: req.params.shows_id}).populate({path: "screen_id", populate: {path:"theatres_id"}}).lean().exec();

      return res.status(201).send(show)
  }catch(e){
    return res.status(500).send({message : e.message})
  }
});
 



module.exports = router