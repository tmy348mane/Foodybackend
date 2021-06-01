const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userSchema = require("./userSchema");
const userData = require("./userSchema");
const foodSchema = require("./foodSchema");
const USERORDERS = require("./userOrders");
const userOrder = require("./userOrders");
const foodData = require("./foodSchema");
const restrauntModel = require("./restrauntSchema");
const restrauntSchema = require("./restrauntSchema");
const stripe = require("stripe")(
  "pk_test_51Iae1bSDKl8GTPPMBASMWL68YHXFXhHrwmEWIGfDq4k51BpF1q6uX5FGjua0oAxHUkJeZV4FXqOKnPIbbD3dGsh500yPwIqif3"
);


app.use(express.json());
app.use(cors());

const monogodbUrl = "mongodb://localhost:27017/TestFoody";

mongoose
  .connect(monogodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
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

app.post("/editUser", (req, res) => {
  console.log(req.body);
  console.log(req.body.id);
  // if (req.body.firstName !== " ") {
  // }
  userData.findByIdAndUpdate(
    { _id: req.body.id },
    req.body,
    {
      useFindAndModify: false,
    },
    function (err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log("Updates Data " + data);
      }
    }
  );
});

//User Login
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.pass;

  const user = userData.findOne(
    { email: email, password: password },
    function (err, data) {
      console.log(email + " Successfully logged In");

      console.log(data);
      res.json(data);
    }
  );
});

app.get("/users", (req, res) => {
  userData.find({}, function (err, data) {
    res.json(data);
  });
});

//Send Reatraunt Menu
app.get("/RestroFood", (req, res) => {
  foodData.find({}, function (err, data) {
    res.json(data);
  });
});

//Send Reatraunts
app.get("/restraunts", (req, res) => {
  restrauntSchema.find({}, function (err, data) {
    res.json(data);
  });
});

//Delete Reatraunts
app.delete("/restraunts", (req, res) => {
  console.log("req body " + req.body.drestro);

  restrauntSchema.findOneAndDelete(
    { _id: req.body.drestro },
    function (err, data) {}
  );
});

//Send Restraunt Menu
app.post("/restraunts", (req, res) => {
  restrauntModel.find(
    { restroShortName: req.body.restroShortName },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
        // res.json(data[0].menu);
        console.log(data[0].menu);
        console.log("req.body.restroShortName : " + req.body.restroShortName);
      }
    }
  );
});

//Save User Oreders
app.post("/saveOrders", (req, res) => {
  USERORDERS.findOneAndUpdate(
    { email: req.body.email },
    { orders: req.body.orders },
    { upsert: true },
    function (err, data) {
      console.log(data);
      console.log(req.body.email);
    }
  );
});

//send user orders
app.post("/userOrders", (req, res) => {
  USERORDERS.findOne({ email: req.body.email }, function (err, data) {
    res.json(data);
  });
});

//send userorders to admin
app.get("/userOrders", (req, res) => {
  USERORDERS.find({}, function (err, data) {
    res.json(data);
  });
});

//Delete user
app.delete("/users", (req, res) => {
  console.log("req body " + req.body.dmail);

  userData.findOneAndDelete({ email: req.body.dmail }, function (err, data) {});
});

//Delete user Orders
app.delete("/userOrders", (req, res) => {
  console.log("req body " + req.body.dmail);

  USERORDERS.findOneAndDelete(
    { email: req.body.dmail },
    function (err, data) {}
  );
});

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});