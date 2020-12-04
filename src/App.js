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
import Modal from "./components/modal";
import RepoList from "./components/repoList";
import { Download, CloudUpload, Eye } from "react-bootstrap-icons";

const App = () => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [intro, setIntro] = useState("");
    const [installation, setInstallation] = useState("");
    const [usage, setUsage] = useState("");
    const [contribute, setContribute] = useState("");
    const [acknowledgements, setAcknowledgements] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [modalType, setModalType] = useState("");
    const [userRepoUrl, setUserRepoUrl] = useState("");
    const [repos, setRepos] = useState([]);

    //initialize firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    //set up the provider for firebase authentication
    var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("repo");

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

    //Prevent the form from being submitted when user presses enter
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    };

    //Methods to handle user data input
    const handleTitleChange = (element) => {
        setTitle(element.target.value);
    };

    const handleDescriptionChange = (element) => {
        setDescription(element.target.value);
    };

    const handleIntroChange = (element) => {
        setIntro(element.target.value);
    };

    const handleInstallationChange = (element) => {
        setInstallation(element.target.value);
    };

    const handleUsageChange = (element) => {
        setUsage(element.target.value);
    };

    const handleContributeChange = (element) => {
        setContribute(element.target.value);
    };

    const handleAcknowledgementsChange = (element) => {
        setAcknowledgements(element.target.value);
    };

    const handlePreviewClick = () => {
        setModalShow(true);
        setModalType("preview");
    };

    const handleMarkdownClick = () => {
        setModalShow(true);
        setModalType("markdown");
    };

    const HandleUploadToGitHubClicked = () => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(async function (result) {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                var token = result.credential.accessToken;
                setAccessToken(token);
                // The signed-in user info.
                var user = result.user;
                setUser(user);
                // Set state to be user authenticated
                setUserRepoUrl(result.additionalUserInfo.profile.repos_url);
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

    const uploadReadMeToGithub = async (repoName) => {
        try {
            let response = await axios.get(
                `https://api.github.com/repos/forbesmiyasato/${repoName}/contents/README.md`
            );
            let sha = response.data.sha;
            console.log(response);
            axios.put(
                `https://api.github.com/repos/forbesmiyasato/${repoName}/contents/README.md`,
                {
                    message: "Update README.md from Forbes's README Generator",
                    content: btoa(markdown),
                    sha: sha,
                },
                {
                    headers: {
                        Authorization: `token ${accessToken}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                }
            );
        } catch (err) {
            alert(err);
        }
    };

    //Fetch user repo, whenever user repo url changes (happens once user is authenticated)
    useEffect(() => {
        // Fetch users repositories to display
        const fetchUserRepo = async () => {
            let response = await axios.get(userRepoUrl);

            //Create a list with just the name and id attribute
            let repos = [];

            response.data.map(({ id, name }) => {
                if (name) {
                    let repo = {};
                    repo["id"] = id;
                    repo["name"] = name;
                    repos.push(repo);
                }
            });

            setRepos(repos);
            console.log(repos);
            setModalShow(true);
            setModalType("github");
        };

        if (userRepoUrl) {
            fetchUserRepo();
        }
    }, [userRepoUrl]);

    useEffect(() => {
        let markdown = `
# ${title.trim()}\n
${description.trim()}\n
<br />\n
### Welcome to ${title.trim()}!\n
<hr>\n
${intro.trim()}\n
<br />\n\n
### Get Started <g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji>\n
<hr>\n
${installation.trim()}\n
<br />\n
### Usage <g-emoji class="g-emoji" alias="gear" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2699.png">⚙</g-emoji>\n
<hr>\n
${usage.trim()}\n
<br />\n
### Contribute <g-emoji class="g-emoji" alias="toolbox" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f9f0.png">🧰</g-emoji>\n
<hr>\n
${contribute.trim()}\n
<br />\n
### Acknowledgements <g-emoji class="g-emoji" alias="blue_heart" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f499.png">💙</g-emoji>\n
<hr>\n
${acknowledgements.trim()}\n
<br />`;

        setMarkdown(markdown);
    }, [
        title,
        description,
        intro,
        installation,
        usage,
        contribute,
        acknowledgements,
    ]);

    return (
        <div className="App">
            <Container>
                <h1 className="App-header mt-3">
                    GitHub README Generator by Forbes Miyasato
                </h1>

                <Form onKeyDown={handleKeyDown}>
                    <TextForm
                        id="form-title"
                        label="Title"
                        type="text"
                        placeholder="Project name..."
                        text="All inputs are optional"
                        onChange={handleTitleChange}
                    ></TextForm>
                    <TextForm
                        id="form-description"
                        label="Description"
                        as="textarea"
                        placeholder="Brief Description..."
                        onChange={handleDescriptionChange}
                    ></TextForm>
                    <TextForm
                        id="form-intro"
                        label="Introduction"
                        as="textarea"
                        placeholder="Why did you create this project..."
                        onChange={handleIntroChange}
                    ></TextForm>
                    <TextForm
                        id="form-installation "
                        label="Get Started"
                        placeholder="Installation instructions..."
                        as="textarea"
                        onChange={handleInstallationChange}
                    ></TextForm>
                    <TextForm
                        id="form-usage"
                        label="Usage"
                        placeholder="Explain how to use this project..."
                        as="textarea"
                        onChange={handleUsageChange}
                    ></TextForm>
                    <TextForm
                        id="form-contribute"
                        label="Contribute"
                        placeholder="Explain how people can contribute to this project..."
                        as="textarea"
                        onChange={handleContributeChange}
                    ></TextForm>
                    <TextForm
                        id="form-acknowledgement"
                        label="Acknowledgements"
                        placeholder="Anybody you wish to thank for helping or collaborating with you on this project..."
                        as="textarea"
                        onChange={handleAcknowledgementsChange}
                    ></TextForm>
                </Form>
                <Button
                    variant="outline-primary mr-2"
                    onClick={handleMarkdownClick}
                >
                    <Download /> Get Markdown
                </Button>
                <Button
                    variant="outline-success mr-2"
                    onClick={HandleUploadToGitHubClicked}
                >
                    <CloudUpload /> Upload To Github
                </Button>
                <Button variant="outline-info" onClick={handlePreviewClick}>
                    <Eye /> Preview
                </Button>
            </Container>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                markdown={markdown}
                repos={repos}
                type={modalType}
                onRepoSelect={uploadReadMeToGithub}
            />

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
                </>
            ) : (
                <button onClick={HandleUploadToGitHubClicked}>
                    Sign in with Github
                </button>
            )}
        </div>
    );
};

export default App;
