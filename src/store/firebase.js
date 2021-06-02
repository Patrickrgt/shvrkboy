import firebase from "firebase";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCSGlfg70LG4XM-voDn8hmFv3C_6y16kwU",
  authDomain: "shvrk-cloud.firebaseapp.com",
  databaseURL: "https://shvrk-cloud.firebaseio.com",
  projectId: "shvrk-cloud",
  storageBucket: "shvrk-cloud.appspot.com",
  messagingSenderId: "492559860895",
  appId: "1:492559860895:web:b1dca3c43ebb66dd648eaa",
});

const db = firebaseApp.firestore();

export { db };
