import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebaseConfig';
import axios from 'axios';

const firebaseApp = firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GithubAuthProvider();
provider.addScope('repo');

const App = ({user, signOut, signInWithGithub}) => {

    console.log(user);
    return (
      <div className="App">
        <header className="App-header">
          {
            user
              ? <p>Hello, {user.displayName}</p>
              : <p>Please sign in.</p>
          }

          {
            user
              ? <button onClick={signOut}>Sign out</button>
              : <button onClick={signInWithGithub}>Sign in with Github</button>
          }
        </header>
      </div>
    );
  
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  githubProvider: new firebase.auth.GithubAuthProvider(),
  scope: 'repo',
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);