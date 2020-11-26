import React, { useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import axios from "axios";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const App = ({ user, signOut }) => {
    var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("repo");

    const [accessToken, setAccessToken] = useState("");
    const [data, setData] = useState("");

    console.log("OUT", accessToken);
    const signInWithGithub = () => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                var token = result.credential.accessToken;
                setAccessToken(token);
                console.log(token);
                // The signed-in user info.
                var user = result.user;
                // ...
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    };

    const updateReadMe = async (token) => {
        try {
            let response = await await axios.get(
                "https://api.github.com/repos/forbesmiyasato/CodingQuestion/contents/README.md"
            );
            let sha = response.data.sha;
            console.log(response);
            axios.put(
                "https://api.github.com/repos/forbesmiyasato/CodingQuestion/contents/README.md",
                {
                    message: "message",
                    content: btoa(data),
                    sha: sha,
                },
                {
                    headers: {
                        Authorization: `token ${token}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                }
            );
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        // const getAccessToken = async (refreshToken) => {
        //     let response = await axios.post(
        //         "https://github.com/login/oauth/access_token",
        //         {
        //             refreshToken: refreshToken,
        //             grant_type: "refresh_token",
        //             client_id: firebaseConfig.clientID,
        //             client_secret: firebaseConfig.clientSecret,
        //         }
        //     );
        //     return response;
        // };
        // if (user) {
        //     console.log(getAccessToken(user.refreshToken));
        // }
        console.log(data);
    }, [data]);

    return (
        <div className="App">
            <header className="App-header">
                {user ? (
                    <p>Hello, {user.displayName}</p>
                ) : (
                    <p>Please sign in.</p>
                )}

                {user ? (
                    <>
                        <img
                            src={user.photoURL}
                            style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "50%",
                            }}
                        />
                        <br />
                        <textarea
                            value={data}
                            onChange={(event) => setData(event.target.value)}
                        />
                        <button onClick={signOut}>Sign out</button>
                        <button onClick={updateReadMe.bind(this, accessToken)}>
                            Update ReadMe
                        </button>
                    </>
                ) : (
                    <button onClick={signInWithGithub}>
                        Sign in with Github
                    </button>
                )}
            </header>
        </div>
    );
};

const firebaseAppAuth = firebaseApp.auth();

const providers = {
    githubProvider: new firebase.auth.GithubAuthProvider(),
    scope: "repo",
};

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(App);
