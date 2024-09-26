const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
app.use(cors());

const dbConfig = require('./db')

const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingsRoute =require('./routes/bookingsRoute')
const payRoute = require("./routes/paymentverifyRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/rooms' , roomsRoute)
app.use('/api/users' , usersRoute)
app.use('/api/bookings' , bookingsRoute)
app.use("/api/paymentverification", payRoute);



const port = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`node server started using nodemon`));



const key = process.env.RAZORPAY_API_KEY;
app.get("/api/getkey", (req, res) => res.status(200).json({ key: key }));