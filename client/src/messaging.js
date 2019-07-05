import firebase from 'firebase';

import firebaseConfig from './firebaseConfig';
import request from 'utility/requestUtils';
import API_ENDPOINT from 'utility/api-endpoints';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const FIREBASE_MESSAGING = firebase.messaging();


/**
* Name : subscribeToNotifications()
* Description: This method will request permission to user to show notification on browser.
* If user allow to show push notifications then it will procide with rest of the steps.
**/

export function subscribeToNotifications() {
  FIREBASE_MESSAGING.requestPermission()
  .then(() => FIREBASE_MESSAGING.getToken())
  .then(token => { handleTokenRefresh(token)})
  .catch((err) => {
    console.log("error getting permission :(");
  });
}


/**
* Name : handleTokenRefresh()
* Description: This method passes token with firebase api to check if this token is already exist.
* We also get topic subscription details in this method so we can check if user is already subscribed  
* with the tpoic or we need to call api to get him subscribe for topic.
**/

function handleTokenRefresh(token) {
  window.firebaseToken = token;
  return request.doGetFirebase(API_ENDPOINT.formatUrl(API_ENDPOINT.firebaseTokenDetails,
   window.firebaseToken))
  .then((resp) => resp.json())
  .then((res) => {
    checkSubscription(res)
  })
  .catch(e => console.log("handleRefreshToken: "+e.message))
}


/**
* Name : checkSubscription()
* Description: If registration token is not added in FCM then we add it to firebase 
*  so we could send push notification to added tokens.
*  Here we are sendign topic "firebase-myWebApp" and unique registration token
*  of app to relate with each other.
**/

function checkSubscription(resp) {
  if(resp) {
    if(resp.status != 200 || !resp.authorizedEntity || !resp.rel) {
      var reqBody = {
        "to" : "/topics/firebase-myWebApp",
        "registration_tokens" : [`${window.firebaseToken}`]
      }
      return request.doPostFirebase(API_ENDPOINT.firebaseBatchAddApi, reqBody)
      .then((re) => relateAppInstanceWithTopic(re))
      .catch(e => console.log("checkSubscription: "+e.message))
    }
  }
}

/**
* Name : relateAppInstanceWithTopic()
* Description: This method create relationship mapping with registration token and topic. 
**/

function relateAppInstanceWithTopic(res) {
  if(res.status == 200 && !res.results) {
    let params = [  
          window.firebaseToken,
          'firebase-myWebApp'
        ]
    return request.doPostFirebase(API_ENDPOINT.formatUrl(API_ENDPOINT.mapTopicWithFirebaseInstance,
     ...params))
    .then((response) => {
      if(response.status == 200) {
        console.log('User is subscribed for push notification.')
      } else {
        console.log('User is not subscribed for push notification.')
      }
    })
    .catch(e => console.log(e.message))
  }
}

/**
* Name : logoutFirebase()
* Description: Delete current user token and also remove current token from firebase database (batch).
*/

export function logoutFirebase() {
  FIREBASE_MESSAGING.getToken().then((token) => {
     var fbToken = token;
      FIREBASE_MESSAGING.deleteToken(token)
      return fbToken;
  })
  .then((fbToken) => {
    var reqBody = {
        "to" : "/topics/firebase-firebase-myWebApp",
        "registration_tokens" : [`${fbToken}`]
      }
      return request.doPostFirebase(API_ENDPOINT.firebaseBatchRemove, reqBody)
      .then((res) => {
        if(res.status != 200) {
          console.log(resp.results.error)
        } 
      })
      .catch(e => console.log("checkSubscription: "+e.message))
  })
  .catch((err) => {
    console.log("error deleting token :(");
  });

}

/**
* Name : onTokenRefresh()
* Description: If token is deleted or expired , we need to create new token for current user 
* and need to add that token in the firebase database to get push notification.
**/

FIREBASE_MESSAGING.onTokenRefresh(function() {
  FIREBASE_MESSAGING.getToken()
    .then(function(refreshedToken) {
      handleTokenRefresh(refreshedToken)
      .then((resp) => { checkSubscription(resp)})
      .catch((err) => {
        console.log("error getting permission :(");
      });
     
    })
    .catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
    });
});


/**
* Name : onMessage()
* Description: When firebase receives push notification for current subscribed topic
* this listner will get execute. 
**/

// FIREBASE_MESSAGING.onMessage(function (payload) {
//   console.log("Message received. ", payload);

// });

