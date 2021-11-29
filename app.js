 const express = require('express');
 const mongoose = require('mongoose');
 const app = express();

 app.use(express.json());

  const connect =  () =>{
      return mongoose.connect("mongodb://127.0.0.1:27017/eval")
   }
    
   const companySchema = new mongoose.Schema({
     
     company_name : { type: String, required: true, unique: true},
     company_info : { type: String, required: false}

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
    job_title : {type: String, required: true},
    job_rating : {type: Number, required: true},
    notice_period : {type: String, required: true},
    open_jobs : {type: String, required: true},
    workfrom_home : {type: String, required: false},
    joblocation_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'joblocation',
        required: true
    }
   
},
   {
       versionKey:false,
       timestamps:true
   });

   const Job = mongoose.model('job',jobSchema);
    
//    const jobskillSchema = new mongoose.Schema({    
//       job_skill : {type: String, required: true}
//   },
//   {
//       versionKey:false,
//       timestamps:true
//   });

//   const Jobskill = mongoose.model('jobskill',jobskillSchema);
 
  const joblocationSchema = new mongoose.Schema({
    job_location : {type: String, required: true}
  },
  {
    versionKey:false,
    timestamps:true
})
  const Joblocation = mongoose.model('joblocation',joblocationSchema);

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


app.post('/joblocation', async (req, res) => {
    try{
        const joblocation = await Joblocation.create(req.body);
         return res.status(201).send(joblocation);

    }catch(e){
        return res.status(500).send({message : e.message});
    }
});
// app.post('/jobskill', async (req, res) => {
//     try{
//         const jobskill = await Jobskill.create(req.body);
//          return res.status(201).send(jobskill);

//     }catch(e){
//         return res.status(500).send({message : e.message});
//     }
// });
   
 
   app.get("/job/workfrom_home", async (req, res) => {
       try{
           const job = await Job.find({workfrom_home : "yes"}).populate("company_id").populate("joblocation_id").lean().exec();
           res.status(200).send(job)
       }catch(e){
            res.status(500).send({message: e.message});
       }
   })
   app.get("/job/notice_period", async (req, res) => {
    try{
        const job = await Job.find({ notice_period : "2 month"}).populate("company_id").populate("joblocation_id").lean().exec();
        res.status(200).send(job)
    }catch(e){
         res.status(500).send({message: e.message});
    }
})
app.get("/job/htol", async (req, res) => {
    try{
        const job = await Job.find({}).sort({ job_rating : -1}).populate("company_id").populate("joblocation_id").lean().exec();
        res.status(200).send(job)
    }catch(e){
         res.status(500).send({message: e.message});
    }
})

  app.listen(2222, async ()=>{
      await connect();
  
      console.log('listening on port 2222');
  })