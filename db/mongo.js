const mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost/CONTACT',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then (() =>{
    console.log("Connected successfully");

}).catch((e) =>{
    console.log("Unable to connect");
})