import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBJiUujB8aiGHXm8jxBAChHUWsnJqJERgM",
    authDomain: "capstone-spsu2020.firebaseapp.com",
    databaseURL: "https://capstone-spsu2020.firebaseio.com",
    projectId: "capstone-spsu2020",
    storageBucket: "capstone-spsu2020.appspot.com",
    messagingSenderId: "834378217953",
    appId: "1:834378217953:web:329c8b8dbbef0959d23aa0",
    measurementId: "G-V33QNYQNZL"

});

const db = firebaseApp.firestore();

export { db };