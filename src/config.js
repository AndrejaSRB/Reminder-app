import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBSC46MFR4gFD-IEcpSrakYXQz06LAbZ3g",
    authDomain: "reminder-app-548d7.firebaseapp.com",
    databaseURL: "https://reminder-app-548d7.firebaseio.com",
    projectId: "reminder-app-548d7",
    storageBucket: "reminder-app-548d7.appspot.com",
    messagingSenderId: "98843787938",
    appId: "1:98843787938:web:3e6e50f128950190"
  };


  const fire = firebase.initializeApp(config)
  export const storage = fire.storage().ref();
  export const database = fire.database();
  export default fire;
