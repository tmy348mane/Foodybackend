const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userSchema = require("./userSchema");
const userData = require("./userSchema");
const foodSchema = require("./foodSchema");
const USERORDERS = require("./userOrders");
const userOrder =require("./userOrders");
const foodData = require("./foodSchema");
const restrauntModel=require("./restrauntSchema");
const restrauntSchema=require("./restrauntSchema");


app.use(express.json());
app.use(cors());

const monogodbUrl = "mongodb://localhost:27017/TestFoody";

mongoose
  .connect(monogodbUrl, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false })
  .then(() => {
    console.log("Connection Established");
    app.listen(5000, () => {
      console.log("Server is started");
    });
  })
  .catch((err) => {
    console.log(err);
  });


//User Registration
app.post("/api", (req, res) => {
  res.send("Hello Inside Api");

  const user = new userSchema({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });
  user.save();
  userData.find({}, function (err, data) {
    console.log(data);
  });
});


//User Login
app.post("/login", (req,res) => {
  const email=req.body.email;
  const password=req.body.pass;
  
  userData.findOne({email:email,password:password}, function (err, data) {
    
      console.log(email +" Successfully logged In");
      
         console.log(data);
         res.json(data);
    
  })
});


//Send Reatraunt Menu
app.get("/RestroFood", (req, res) => {
  foodData.find({}, function (err, data) {
    res.json(data);
  });
});


//Send Reatraunts
app.get("/restraunts",(req,res) => {

restrauntSchema.find({}, function (err, data) {
  res.json(data);
 
});

});


//Send Restraunt Menu
app.post("/restraunts",(req,res) => {

  restrauntModel.find({restroShortName:req.body.restroShortName},function(err,data){
    if(err){
      console.log(err);
    }else{
      res.json(data[0].menu);
      console.log( data[0].menu);
      console.log("req.body.restroShortName : " + req.body.restroShortName);
    }
  })

})




//Save User Oreders
app.post("/saveOrders",(req,res) => {

  // const order=new userOrders({
  //   email: req.body.email,
  //   orders: req.body.orders,
  //   subTotal:req.body.subTotal,
  // });



USERORDERS.findOneAndUpdate({email: req.body.email},{orders:req.body.orders},{upsert:true},function(err,data){
 
  console.log(data);
  console.log(req.body.email);

});




});

