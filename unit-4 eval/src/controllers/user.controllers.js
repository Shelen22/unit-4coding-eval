const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');

const User = require("../models/user.model");
const upload = require("../middleware/uploads");
const fs = require("fs");

const router = express.Router()

router.post("/", upload.single("profile_pic"), async (req, res) => {
  try{
      const user = await User.create({
          name:req.body.name,
          email:req.body.email,
          password:req.body.password,
          profile_pic:req.body.path,
          roles: req.body.roles,
      })
      return res.status(201).send(user)
  }catch(e) {
      return res.status(500).send({message : e.message})
  }
}); 

module.exports = router