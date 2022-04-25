const {req,res}=require('express');
const express=require('express');
const bodyparser=require('body-parser')
const app=express();
const api = require('./routes/Jobs.routes');
const cors = require("cors");
app.use(cors());
app.use(express.json())

app.listen(3000,(req,res)=>{
    console.log("Server Started");
});

//parse req data content type application/x-www-form
app.use(bodyparser.urlencoded({extended:false}));

//parse req data content type application/json
// app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.send("Hello Welcome to server");
})

//create employee routes
app.use('/Jobs', api);

