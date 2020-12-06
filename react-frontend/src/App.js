import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "./config";
import axios from "axios";
import TextForm from "./components/textForm";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "./components/modal";
import Dropdown from "./components/dropdown";
import { useAlert, types } from "react-alert";
import {
    CodeSlash,
    CloudUpload,
    Eye,
    BootstrapReboot,
    ArrowBarLeft,
} from "react-bootstrap-icons";

const App = () => {
    const [gitHubInfo, setGitHubInfo] = useState({
        username: "",
        accessToken: "",
        userRepoUrl: "",
    });
    const [repos, setRepos] = useState([]);
    const [markdown, setMarkdown] = useState("");
    const [content, setContent] = useState("");
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
        firebase.initializeApp(config);
    }

    //set up the provider for firebase authentication
    var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("repo");

    //Sign out the user using firebase authentication
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
                alert.show(error, {
                    type: types.ERROR,
                });
            });
    };

    //Prevent the form from being submitted when user presses enter
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    };

    //The following 7 methods are to handle user data input.
    //Function names are descriptive to their use case.
    //Sets content for each section to the current input value.
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

    //Handles the preview button being clicked. Opens the modal in preview mode.
    const handlePreviewClick = () => {
        setModalShow(true);
        setModalType("Preview");
    };

    //Handles the markdown button being clicked. Opens the modal in markdown mode.
    const handleMarkdownClick = () => {
        setModalShow(true);
        setModalType("Markdown");
    };

    //If the user hasn't logged in yet, logs in the user using Firebase authentication. Else,
    //Opens the repository list modal.
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
                    var errorMessage = error.message;
                    alert.show(errorMessage, {
                        type: types.ERROR,
                    });
                });
        } else {
            setModalShow(true);
            setModalType("github");
        }
    };

    //Uploads the readme content to the Github repository.
    const uploadReadMeToGithub = async (repoName) => {
        let success = true;
        setModalShow(false);
        try {
            //In order to update the README content, a sha parameter is required in the request body.
            //The sha value is unique to each commit. In order to get the proper sha value, we need to make
            //a get request to fetch the latest sha.
            //This request will fail and redirect to the catch block below if the README.md file doesn't exist.
            //In this case we want to create the README file instead of updating it. Hence, the sha value isn't needed.
            let response = await axios.get(
                `https://api.github.com/repos/${gitHubInfo.username}/${repoName}/contents/README.md`
            );
            let sha = response.data.sha;

            //Now update the README content
            await axios.put(
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
            //Failed to get content of README.md because it doesn't exist. In this case, we want to create the README.md file.
            try {
                await axios.put(
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
                //Show alert if failed to upload to Github.
                success = false;
                alert.show("Failed to Upload to Github :(", {
                    type: types.ERROR,
                });
            }
        }
        //If didn't fail to upload to Github, show success alert that contains url to redirect user to the repository.
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

    //Resets all the README text inputs.
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

    //Makes post request to Flask backend to translate all the content into targetted language
    const translateContent = async (targetLanguage) => {
        let response = await axios.post(
            "https://cs530-final-yxqexgpoza-uw.a.run.app/translate",
            {
                content: content,
                targetLanguage: targetLanguage,
            }
        );

        let translatedContent = response.data;
        //Parse translated content into each individual input field. Using "@@" as the delimeter
        parseContentToInputs(translatedContent);
    };

    //Sets the state for each individual input based on the stored content
    const parseContentToInputs = (content) => {
        let splittedContent = content.split("@@");
        let splitIndex = 0;
        //Need these temp values to avoid updating state in loop
        let tempTitle = "";
        let tempDescription = "";
        let tempIntro = "";
        let tempInstallation = "";
        let tempUsage = "";
        let tempContribute = "";
        let tempAcknowledgements = "";
        console.log(content);
        console.log(splittedContent)
        console.log(splittedContent.length);
        for (let i = 0; i < 7; i++) {
            if (splitIndex > splittedContent.length) {
                break;
            }
            switch (i) {
                case 0:
                    if (title) {
                        tempTitle = splittedContent[splitIndex];
                        splitIndex++;
                    }
                    break;
                case 1:
                    if (description) {
                        tempDescription = splittedContent[splitIndex];
                        splitIndex++;
                    }
                    break;
                case 2:
                    if (intro) {
                        tempIntro = splittedContent[splitIndex];
                        splitIndex++;
                    }
                    break;
                case 3:
                    if (installation) {
                        tempInstallation = splittedContent[splitIndex];
                        splitIndex++;
                    }
                    break;
                case 4:
                    if (usage) {
                        tempUsage = splittedContent[splitIndex];
                        setUsage(splittedContent[splitIndex]);
                        splitIndex++;
                    }
                    break;
                case 5:
                    if (contribute) {
                        tempContribute = splittedContent[splitIndex];
                        setContribute(splittedContent[splitIndex]);
                        splitIndex++;
                    }
                    break;
                case 6:
                    if (acknowledgements) {
                        tempAcknowledgements = splittedContent[splitIndex];
                        setAcknowledgements(splittedContent[splitIndex]);
                        splitIndex++;
                    }
                    break;
                default:
                    break;
            }
        }

        console.log(tempTitle);
        setTitle(tempTitle);
        setDescription(tempDescription);
        setIntro(tempIntro);
        setInstallation(tempInstallation);
        setUsage(tempUsage);
        setContribute(tempContribute);
        setAcknowledgements(tempAcknowledgements);
    };

    //Fetch user repo, whenever user repo url changes (happens once user is authenticated)
    useEffect(() => {
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

            setRepos(repos);
            setModalShow(true);
            setModalType("github");
        };

        if (gitHubInfo.userRepoUrl) {
            fetchUserRepo();
        }
    }, [gitHubInfo]);

    //Update the markdown content everytime an input field is modified.
    useEffect(() => {
        let markdown = "";
        let content = "";
        if (title) {
            content += `${title}`;
            markdown += `# ${title.trim()}\n\n`;
            if (description) {
                content += `@@${description}`;
                markdown += `${description.trim()}\n\n<br />\n\n`;
            }
            markdown += "### Welcome to " + title.trim() + "!\n\n<hr>\n\n";
        }
        if (intro) {
            content += `@@${intro}`;
            markdown += `${intro.trim()}\n\n<br />\n\n\n`;
        }

        if (installation) {
            content += `@@${installation}`;
            markdown +=
                '### Get Started <g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji>\n\n<hr>\n\n' +
                installation.trim() +
                "\n\n<br />\n\n";
        }

        if (usage) {
            content += `@@${usage}`;
            markdown +=
                '### Usage <g-emoji class="g-emoji" alias="gear" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2699.png">⚙</g-emoji>\n\n<hr>\n\n' +
                usage.trim() +
                "\n\n<br />\n\n";
        }

        if (contribute) {
            content += `@@${contribute}`;
            markdown +=
                '### Contribute <g-emoji class="g-emoji" alias="toolbox" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f9f0.png">🧰</g-emoji>\n\n<hr>\n\n' +
                contribute.trim() +
                "\n\n<br />\n\n";
        }

        if (acknowledgements) {
            content += `@@${acknowledgements}`;
            markdown +=
                '### Acknowledgements <g-emoji class="g-emoji" alias="blue_heart" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f499.png">💙</g-emoji>\n\n<hr>\n\n' +
                acknowledgements.trim() +
                "\n\n<br />\n";
        }

        setContent(content);
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
                <h1 className="App-header mt-3 text-center">
                    GitHub README Generator
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
                        variant="outline-primary mr-2 mb-2"
                        onClick={handleMarkdownClick}
                    >
                        <CodeSlash /> Get Markdown
                    </Button>
                    <Button
                        variant="outline-success mr-2 mb-2"
                        onClick={HandleUploadToGitHubClicked}
                    >
                        <CloudUpload /> Upload To Github
                    </Button>
                    <Button
                        variant="outline-info mr-2 mb-2"
                        onClick={handlePreviewClick}
                    >
                        <Eye /> Preview
                    </Button>
                    {gitHubInfo.username && (
                        <Button
                            variant="outline-warning mr-2 mt-2 mb-2"
                            onClick={signOut}
                        >
                            <ArrowBarLeft /> Sign out of Github
                        </Button>
                    )}
                    <Dropdown onSelect={translateContent} />
                    <Button
                        variant="outline-danger mr-2 mb-2"
                        onClick={resetInputs}
                    >
                        <BootstrapReboot /> Reset All Inputs
                    </Button>
                </div>
                <footer className="text-center mb-5">
                    Made by Forbes Miyasato
                </footer>
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
