const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        
    },
    phone : {
        type : String,
        required : true,
    },
    message : {
        type: String,
    }
});


var User = mongoose.model('User', userSchema);

module.exports = User;