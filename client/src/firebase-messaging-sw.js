import firebase from 'firebase';

import firebaseConfig from './firebaseConfig';
	
const firebaseMessagingSw = () => {
	firebase.initializeApp(firebaseConfig);

	const messaging = firebase.messaging();
	messaging.usePublicVapidKey("BOfSCDe0OZFhEBzwNunuy6eFDmF6SakXXnVJQ4tsfA9Wvp6uQI2w_pg_jOHmloul__5K58_7gxxaBjrBTtC5CGc");
	console.log('called', messaging)
	Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
  } else {
    console.log('Unable to get permission to notify.');
  }
});
	messaging.onMessage((payload) => {
	  console.log('Message received. ', payload);
	  // ...
	});

	// messaging.setBackgroundMessageHandler(function (payload) {
	// 	console.log('set Background Message Handler called')
	//   const notificationTitle = ﻿payload.data.title;
	//   const notificationOptions = {
	//     body: payload.data.body,
	//     icon: payload.data.icon
	//   };
	//   return self.registration.showNotification(notificationTitle,
	//     notificationOptions);
	// });
}

export default firebaseMessagingSw;