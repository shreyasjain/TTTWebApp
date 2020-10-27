import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyB3a9NuWDDDrGf1UJS7j5Hf3QjvCg358Eg",
    authDomain: "ttt-otp.firebaseapp.com",
    databaseURL: "https://ttt-otp.firebaseio.com",
    projectId: "ttt-otp",
    storageBucket: "ttt-otp.appspot.com",
    messagingSenderId: "1055868342062",
    appId: "1:1055868342062:web:972fde09822ea94312b4bf",
    measurementId: "G-LNPTBME1VW"
  };

firebase.initializeApp(firebaseConfig)
export default firebase