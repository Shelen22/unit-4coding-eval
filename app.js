 const express = require('express');
 const mongoose = require('mongoose');
 const app = express();

 app.use(express.json());

  const connect =  () =>{
      return mongoose.connect("mongodb://127.0.0.1:27017/eval")
   }
    
   const companySchema = new mongoose.Schema({
     
     company_name : { type: String, required: true, unique: true},

   },
   {
       versionKey:false, 
       timestamps:true
   });
   const Company = mongoose.model('company',companySchema);

   const jobSchema = new mongoose.Schema({
        
     company_id:{ 
         type : mongoose.Schema.Types.ObjectId,
        ref : 'company',
        required: true 
    },
    job_title : {type: String, required: true, unique: true},
    job_rating : {type: String, required: true},

   })
   


  app.listen(2222, async ()=>{
      await connect();
  
      console.log('listening on port 2222');
  })