
const {schema, model} = require('mongoose')

const userSchema = new schema({
   
    Name: {type: String, required: true}
})