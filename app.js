 const express = require('express');
 const mongoose = require('mongoose');
 const app = express();

 app.use(express.json());

  const connect =  () =>{
      return mongoose.connect("mongodb://127.0.0.1:27017/eval")
   }
    
   const companySchema = new mongoose.Schema({
     
     company_name : { type: String, required: true, unique: true},
     company_info : { type: String, required: true}

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
    job_rating : {type: Number, required: true},
    notice_period : {type: String, required: true},
    open_jobs : {type: String, required: true},
    workfrom_home : {type: Boolean, required: true},
   },
   {
       versionKey:false,
       timestamps:true
   });

   const Job = mongoose.model('job',jobSchema);
    
   const jobskillSchema = new mongoose.Schema({    
    company_id:{ 
       type : mongoose.Schema.Types.ObjectId,
       ref : 'company',
       required: true 
   },
    job_id:{ 
      type : mongoose.Schema.Types.ObjectId,
      ref : "job",
      required: true

    },
      job_skill : {type: String, required: true},
      job_location : {type: String, required: true},
  },
  {
      versionKey:false,
      timestamps:true
  });

  const Jobskill = mongoose.model('jobskill',jobskillSchema);

    

   app.post('/company', async (req, res) => {
       try{
           const company = await Company.create(req.body);
            return res.status(201).send(company);

       }catch(e){
           return res.status(500).send({message : e.message});
       }
   });

   app.post('/job', async (req, res) => {
    try{
        const job = await Job.create(req.body);
         return res.status(201).send(job);

    }catch(e){
        return res.status(500).send({message : e.message});
    }
});

app.post('/jobskill', async (req, res) => {
    try{
        const jobskill = await Jobskill.create(req.body);
         return res.status(201).send(jobskill);

    }catch(e){
        return res.status(500).send({message : e.message});
    }
});
   


  app.listen(2222, async ()=>{
      await connect();
  
      console.log('listening on port 2222');
  })