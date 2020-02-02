const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uploadRouter = require('./routes/upload');
const foodRouter = require('./routes/food');
const userRouter = require('./routes/user');
const contactRouter= require('./routes/contact');

const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((db) => {
    console.log("Successfully connected to MongodB server");
  }, (err) => console.log(err));

app.use('/upload', uploadRouter);
app.use('/', foodRouter);
app.use('/', userRouter);
app.use('/', contactRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({
    status: err.message
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running at localhost:${process.env.PORT}`);
});