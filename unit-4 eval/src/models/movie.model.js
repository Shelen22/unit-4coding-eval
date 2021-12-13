
const {Schema, model} = require('mongoose')

const movieSchema = new Schema({
   
    name: {type: String, required: true},
    actors : [{type: String, required: true,unique: true}],
    languages : [{type: String, required: true, unique: true}],
    directors: [{type:String, required: true}],
    poster_ulr: {type:String, required: true}
},
{
  versionKey:false,
  timestamps: true
});

module.exports = model("movie", movieSchema);