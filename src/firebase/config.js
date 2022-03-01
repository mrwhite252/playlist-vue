import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNHiMhHYSNYqRN9XuiBTd8xcynStWzl74",
  authDomain: "playlist-project-385d0.firebaseapp.com",
  projectId: "playlist-project-385d0",
  storageBucket: "playlist-project-385d0.appspot.com",
  messagingSenderId: "96148229783",
  appId: "1:96148229783:web:8ead5273fd097abb35e3d2",
};

// init firebase

firebase.initializeApp(firebaseConfig);

//   init services

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, timestamp };
