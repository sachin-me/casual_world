const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const passport = require('passport');
const soketIo = require('socket.io');
const http = require('http');
const bt = require('big-time');
const notify = require('./server/util');
var logger = require('morgan');
var env = require('dotenv').config();

const port = process.env.PORT;

mongoose.connect(
 process.env.MONGODB_URI,
 { useNewUrlParser: true },
 function(err, connection) {
  if (err) throw err;
  else console.log("connected to mongodb");
 }
)

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "./server/views"));
app.set("view engine", "ejs");

app.use(
 session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: process.env.SESSION_URI })
 })
);

if (process.env.NODE_ENV === "development") {
 var webpack = require("webpack");
 var webpackConfig = require("./webpack.config");
 var compiler = webpack(webpackConfig);

 app.use(
  require("webpack-dev-middleware")(compiler, {
   noInfo: true,
   publicPath: webpackConfig.output.publicPath
  })
 );

 app.use(require("webpack-hot-middleware")(compiler));
 app.use(logger('dev'));
}

app.use(cors());

// import passport config
require('./server/auth/passport')(passport);

// Importing Notification Schema
const Notification = require('./server/models/Notification');

app.use("/api/v1", require("./server/routes/api/v1"));
app.use(require("./server/routes/index"));

// Creating http server
const server = http.createServer(app);
const io = soketIo(server);

io.on('connection', (socket) => {
	console.log('User connected');

	socket.on('notifications', (notification) => {
		const { cardName, dueDate, userId, boardId, listId } = notification;
		const crtTS = +new Date(dueDate);
		console.log(notification, 'checking notification');
		// On connection start pushing notifications to database
		const pushNotification = setTimeout(() => {

			const notifi = notify.notifyMe
			console.log(notifi, 'checking notifi function');
			io.emit('notifications', notification)
		}, Math.abs(crtTS - (+new Date())))	
	})
	socket.on('disconnect', () => {
		console.log('User disconnected');
	})
})

server.listen(port, () => {
 console.log(`server is running on http://localhost:${port}`);
});