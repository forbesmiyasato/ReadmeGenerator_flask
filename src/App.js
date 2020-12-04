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
import { useAlert, types } from "react-alert";
import {
    CodeSlash,
    CloudUpload,
    Eye,
    BootstrapReboot,
    ArrowBarLeft,
} from "react-bootstrap-icons";

const App = () => {
    // const [gitHubUsername, setGitHubUsername] = useState("");
    // const [accessToken, setAccessToken] = useState("");
    // const [userRepoUrl, setUserRepoUrl] = useState("");
    // const [repos, setRepos] = useState([]);
    const [gitHubInfo, setGitHubInfo] = useState({
        username: "",
        accessToken: "",
        userRepoUrl: "",
    });
    const [repos, setRepos] = useState([]);
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
    const alert = useAlert();

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
                setGitHubInfo({
                    username: "",
                    accessToken: "",
                    userRepoUrl: "",
                    repos: [],
                });
                alert.show("Signed out of Github successfully!", {
                    type: types.SUCCESS,
                });
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
        if (!gitHubInfo.username) {
            firebase
                .auth()
                .signInWithPopup(provider)
                .then(async function (result) {
                    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var username = result.additionalUserInfo.username;
                    // The url to fetch all users public repositories
                    var url = result.additionalUserInfo.profile.repos_url;
                    // We want the repo list modal to show up next
                    setGitHubInfo({
                        ...gitHubInfo,
                        accessToken: token,
                        username: username,
                        userRepoUrl: url,
                    });
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
                    alert.show(errorMessage, {
                        type: types.ERROR,
                    });
                });
        } else {
            setModalShow(true);
            setModalType("github");
        }
    };

    const uploadReadMeToGithub = async (repoName) => {
        let success = true;
        try {
            let response = await axios.get(
                `https://api.github.com/repos/forbesmiyasato/${repoName}/contents/README.md`
            );
            let sha = response.data.sha;
            console.log(response);
            axios.put(
                `https://api.github.com/repos/${gitHubInfo.username}/${repoName}/contents/README.md`,
                {
                    message: "Update README.md from Forbes' README Generator",
                    content: btoa(unescape(encodeURIComponent(markdown))),
                    sha: sha,
                },
                {
                    headers: {
                        Authorization: `token ${gitHubInfo.accessToken}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                }
            );
        } catch (err) {
            try {
                axios.put(
                    `https://api.github.com/repos/${gitHubInfo.username}/${repoName}/contents/README.md`,
                    {
                        message:
                            "Updated README.md with Forbes's README Generator",
                        content: btoa(unescape(encodeURIComponent(markdown))),
                    },
                    {
                        headers: {
                            Authorization: `token ${gitHubInfo.accessToken}`,
                            Accept: "application/vnd.github.v3+json",
                        },
                    }
                );
            } catch (err) {
                success = false;
                alert(err);
            }
        }
        setModalShow(false);
        if (success) {
            alert.show(
                <div>
                    Uploaded to GitHub successfully!{" "}
                    <a
                        href={`https://github.com/${gitHubInfo.username}/${repoName}`}
                        rel="noreferrer"
                        target="_blank"
                    >
                        Click Here
                    </a>{" "}
                    to check it out.
                </div>,
                {
                    type: types.SUCCESS,
                }
            );
        }
    };

    const resetInputs = () => {
        setMarkdown("");
        setTitle("");
        setDescription("");
        setIntro("");
        setInstallation("");
        setUsage("");
        setContribute("");
        setAcknowledgements("");
    };

    //Fetch user repo, whenever user repo url changes (happens once user is authenticated)
    useEffect(() => {
        console.log(gitHubInfo);
        // Fetch users repositories to display
        const fetchUserRepo = async () => {
            let response = await axios.get(gitHubInfo.userRepoUrl);

            //Create a list with just the name and id attribute
            let repos = [];

            response.data.forEach(({ id, name }) => {
                if (name) {
                    let repo = {};
                    repo["id"] = id;
                    repo["name"] = name;
                    repos.push(repo);
                }
            });

            console.log(repos);
            setRepos(repos);
            setModalShow(true);
            setModalType("github");
        };

        if (gitHubInfo.userRepoUrl) {
            fetchUserRepo();
        }
    }, [gitHubInfo]);

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
                        text="All inputs are currently optional"
                        value={title}
                        onChange={handleTitleChange}
                    ></TextForm>
                    <TextForm
                        id="form-description"
                        label="Description"
                        as="textarea"
                        placeholder="Brief Description..."
                        value={description}
                        onChange={handleDescriptionChange}
                    ></TextForm>
                    <TextForm
                        id="form-intro"
                        label="Introduction"
                        as="textarea"
                        placeholder="Why did you create this project..."
                        value={intro}
                        onChange={handleIntroChange}
                    ></TextForm>
                    <TextForm
                        id="form-installation "
                        label="Get Started"
                        placeholder="Installation instructions..."
                        as="textarea"
                        value={installation}
                        onChange={handleInstallationChange}
                    ></TextForm>
                    <TextForm
                        id="form-usage"
                        label="Usage"
                        placeholder="Explain how to use this project..."
                        as="textarea"
                        value={usage}
                        onChange={handleUsageChange}
                    ></TextForm>
                    <TextForm
                        id="form-contribute"
                        label="Contribute"
                        placeholder="Explain how people can contribute to this project..."
                        as="textarea"
                        value={contribute}
                        onChange={handleContributeChange}
                    ></TextForm>
                    <TextForm
                        id="form-acknowledgement"
                        label="Acknowledgements"
                        placeholder="Anybody you wish to thank for helping or collaborating with you on this project..."
                        as="textarea"
                        value={acknowledgements}
                        onChange={handleAcknowledgementsChange}
                    ></TextForm>
                </Form>
                <div className="mb-5">
                    <Button
                        variant="outline-primary mr-2"
                        onClick={handleMarkdownClick}
                    >
                        <CodeSlash /> Get Markdown
                    </Button>
                    <Button
                        variant="outline-success mr-2"
                        onClick={HandleUploadToGitHubClicked}
                    >
                        <CloudUpload /> Upload To Github
                    </Button>
                    <Button
                        variant="outline-info mr-2"
                        onClick={handlePreviewClick}
                    >
                        <Eye /> Preview
                    </Button>
                    {gitHubInfo.username && (
                        <Button
                            variant="outline-warning mr-2"
                            onClick={signOut}
                        >
                            <ArrowBarLeft /> Sign out of Github
                        </Button>
                    )}
                    <Button variant="outline-danger" onClick={resetInputs}>
                        <BootstrapReboot /> Reset All Inputs
                    </Button>
                </div>
            </Container>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                markdown={markdown}
                repos={repos}
                type={modalType}
                onRepoSelect={uploadReadMeToGithub}
            />
        </div>
    );
};

export default App;
