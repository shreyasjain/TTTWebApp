import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyB_x9AuXcRvDA9GEmx9XA7FYW29kk1xqdE",
  authDomain: "aurigatt.firebaseapp.com",
  databaseURL: "https://aurigatt.firebaseio.com",
  projectId: "aurigatt",
  storageBucket: "aurigatt.appspot.com",
  messagingSenderId: "1092695611524",
  appId: "1:1092695611524:web:2b0059e12055ac8ea14ad1"
};

firebase.initializeApp(firebaseConfig)
export default firebase