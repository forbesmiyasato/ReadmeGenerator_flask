import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import axios from "axios";
import TextForm from "./components/textForm";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Download, CloudUpload, Eye } from 'react-bootstrap-icons';

const App = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("repo");

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState("");
    const [data, setData] = useState("");

    const signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(function () {
                window.location.reload();
            })
            .catch(function (error) {
                // An error happened.
            });
    };

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
                setUser(user);
                console.log(user);
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
        console.log(data);
    }, [data]);

    return (
        <div className="App">
            <Container>
                <h1 className="App-header mt-3">
                    GitHub README Generator by Forbes Miyasato
                </h1>

                <Form>
                    <TextForm
                        id="form-title"
                        label="Title"
                        type="text"
                    ></TextForm>
                    <TextForm
                        id="form-description"
                        label="Description"
                        as="textarea"
                        placeholder="Brief Description..."
                    ></TextForm>
                    <TextForm
                        id="form-intro"
                        label="Introduction"
                        as="textarea"
                        placeholder="Why did you create this project..."
                    ></TextForm>
                    <TextForm
                        id="form-installation "
                        label="Get Started"
                        placeholder="Installation instructions..."
                        as="textarea"
                    ></TextForm>
                    <TextForm
                        id="form-usage"
                        label="Usage"
                        placeholder="Explain how to use this project..."
                        as="textarea"
                    ></TextForm>
                    <TextForm
                        id="form-contribute"
                        label="Contribute"
                        placeholder="Explain how people can contribute to this project..."
                        as="textarea"
                    ></TextForm>
                    <TextForm
                        id="form-acknowledgement"
                        label="Acknowledgements"
                        placeholder="Anybody you wish to thank for helping or collaborating with you on this project..."
                        as="textarea"
                    ></TextForm>
                </Form>
                <Button variant="outline-primary mr-2"><Download /> Get Markdown</Button>
                <Button variant="outline-success mr-2"><CloudUpload /> Upload To Github</Button>
                <Button variant="outline-info"><Eye /> Preview</Button>
            </Container>
            {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}

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

                    <button onClick={signOut}>Sign out</button>
                    <button onClick={updateReadMe.bind(this, accessToken)}>
                        Update ReadMe
                    </button>
                </>
            ) : (
                <button onClick={signInWithGithub}>Sign in with Github</button>
            )}
        </div>
    );
};

export default App;
