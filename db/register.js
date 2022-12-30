const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

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

registerSchema.pre("save",async function(next){

     if(this.isModified("password")){
     this.password = await bcrypt.hash(this.password,10);
}
next();

})


var register = mongoose.model('Register', registerSchema);

module.exports = register;