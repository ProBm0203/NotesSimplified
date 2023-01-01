const express = require("express");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs")
require('./db/mongo')
const User = require('./db/user');
const Register = require('./db/register');
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
app.get('/login',(req, res)=>{
    const params = {};
    res.status(200).render('login.pug',  params);
})
app.get('/register',(req, res)=>{
    const params = {};
    res.status(200).render('register.pug',  params);
})

app.post('/',(req, res) =>{
    var myData = new User(req.body);
    myData.save().then(() =>{
    //   res.send("This item has been saved to the database")
    res.status(200).render('index.pug');
  }) .catch(()=>{
      res.status(400).send("Item was not saved to the database .")
  })
  })
app.post('/register',(req, res) =>{
    var registerData = new Register(req.body);


    registerData.save().then(() =>{
        res.status(200).render('login.pug');
  }) .catch(()=>{
      res.status(400).send("Item was not saved to the database .")
  })
  })

  app.post('/login',async (req, res)=>{
    try {
            const email = req.body.email;
            const password = req.body.password;

            const useremail = await  Register.findOne({email:email});
            const isMatch = bcrypt.compare(password, useremail.password);
            if(isMatch){
                res.status(200).render('notes.pug');
            }else{
                res.send("Invalid");
            }

    } catch (error) {
        res.status(400).send("Invalid login details");
    }
})

//START THE SERVER 

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})