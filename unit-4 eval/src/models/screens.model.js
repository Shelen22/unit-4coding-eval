
const {Schema, model} = require('mongoose')

const screenSchema = new Schema({
   
    name: {type: String, required: true},
    theatres_id : {
        type: Schema.Types.ObjectId,
        ref: 'theatres',
        required: true
    }
},
{
  versionKey:false,
  timestamps: true
});

module.exports = model("screen", screenSchema);