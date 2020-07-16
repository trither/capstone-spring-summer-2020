import React, {useState, useContext} from "react";
import withFirebaseAuth from 'react-with-firebase-auth';
//import * as firbase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';

/*
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
	googleProvider: new firebase.auth.GoogleAuthProvider(),
	//facebookProvider: new firebase.auth.FacebookAuthProvider(),
};
*/

import * as firebase from 'firebase'
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const handleForm = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        setErrors(e.message);
      });
  };

  return (
	  <h1>hi there</h1>
/*
    <div>
      //<h1><text>Join</text></h1>
      <form onSubmit={e => handleForm(e)}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <hr />
        <button class="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
       //   <text>Join With Google</text>
        </button>
	<hr />
        <button class="facebookBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
        //  <text>Join With Facebook</text>
        </button>

        <button type="submit">Login</button>

        <span>{error}</span>

      </form>
    </div>
    */
  );
};

export default SignIn;
