const express = require('express');
const bodyParser = require('body-parser');

const uploadRouter = require('./routes/upload');
const foodRouter = require('./routes/food');
const userRouter = require('./routes/user');
const contactRouter= require('./routes/contact');
const orderRouter= require('./routes/order');
const connection = require('./connection/dbTest');
const cors = require('cors');
//swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.options('*', cors());
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
  app.use(allowCrossDomain);

//swagger start

var swaggerDefinition = {
  info: {
      title: 'CafeMandu API',
      description: 'Signup,Login and delete user using token and swagger documentation',
      version: '1.0.0'
  },
  securityDefinitions: {
      bearerAuth: {
          type: 'apiKey',
          name: 'authorization',
          in: 'header',
          scheme: 'bearer',
      }
  },
  host: 'localhost:3000',
  basePath: '/'
};

var swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

var swaggerSpecs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

//swagger end



app.use('/upload', uploadRouter);
app.use('/', foodRouter);
app.use('/', userRouter);
app.use('/', contactRouter);
app.use('/', orderRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({
    status: err.message
  });
});


connection.connect()
  .then(() =>{
    app.listen(process.env.PORT, () => {
      console.log(`App is running at localhost:${process.env.PORT}`);
    });
  })

  module.exports = app;