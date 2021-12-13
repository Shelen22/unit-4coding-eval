 const {app, start} = require('./server')
  
   const usercontroller = require("./controllers/user.controllers");
   const moviecontroller = require("./controllers/movie.controllers");
   const theatrescontroller = require("./controllers/theatres.controllers");
   const screencontroller = require("./controllers/screen.controllers");
   const showscontroller = require("./controllers/shows.controllers");




   app.use("/user",usercontroller)
   app.use("/movie",moviecontroller)
   app.use("/theatres",theatrescontroller)
   app.use("/screen",screencontroller)
   app.use("/shows", showscontroller)

  start();