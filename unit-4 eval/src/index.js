 const {app, start} = require('./server')
  
   const usercontroller = require("./controllers/user.controllers");



   app.use("/user",usercontroller)
  

  start();