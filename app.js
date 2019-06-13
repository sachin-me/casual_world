const express = require('express');
const path = require('path'); 
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require("cors");
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const app = express();

// Connecting to database
mongoose.connect('mongodb://localhost/casualworld', { useNewUrlParser: true }, function (error) {
  if (error) return console.log(`Could not connect to mongodb: ${error}`);
  else return console.log('Connected to mongodb');
})

app.use(
  session({
    secret: "casualworld",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ url: "mongodb://localhost/casualworld-session" })
  })
);

// Webpack config
if (process.env.NODE_ENV === 'development') {
  console.log('in webpack hot middleware');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
}

// setting view
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './server/views'));

// setting routes
app.use(require('./server/routes/index'));
app.use('/api/v1', require('./server/routes/api/v1.js'));

app.listen(8001, () => {
  console.log('server is running on 8001');
})