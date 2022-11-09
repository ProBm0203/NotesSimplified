const express = require("express");
const path = require("path");
const fs = require("fs");
const User = require('./db/user');
require('./db/mongo')
const app = express();
const port = 8000;
//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))//for serving static files
app.use(express.urlencoded());


//PUG SPECIFIC STUFF
app.set('view engine', 'pug')//set the template engine as pug
app.set('views',path.join(__dirname, 'views'))//set the views directory

//ENDPOINTS

app.get('/',(req, res)=>{
    const params = {};
    res.status(200).render('index.pug',  params);
})
app.get('/notes',(req, res)=>{
    const params = {};
    res.status(200).render('notes.pug',  params);
})

app.post('/',(req, res) =>{
    var myData = new User(req.body);
    myData.save().then(() =>{
      res.send("This item has been saved to the database")
  }) .catch(()=>{
      res.status(400).send("Item was not saved to the database .")
  })
  })

//START THE SERVER 

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})