const express = require('express');
const router = express.Router()
const path = require('path');

const firebaseAuth = require('./../auth/firebase.auth');

router.get('/', (req, res)=>{
  res.render('index');
})

// router.get("/firebase-messaging-sw.js", (req, res) => {
// 	res.writeHead(201, {
//     'Content-Type': 'application/javascript'
//   });
//   res.sendFile(path.resolve(__dirname, "client", "src/firebase-messaging-sw.js"));
// });

router.get('*', (req, res) => {
  res.render('index');
})

router.get('https://www.googleapis.com/auth/firebase.messaging', firebaseAuth.getAccessToken)

module.exports =router;