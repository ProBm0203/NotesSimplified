const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
   phone : {
        type: String,
        required: true,
        unique: true
   },
   age : {
        type: Number,
        requierd: true,

   },
   email : {
        type: String,
        required: true,
        unique: true
   },
   password : {
        type: String,
        required: true
   }

});


var register = mongoose.model('Register', registerSchema);

module.exports = register;