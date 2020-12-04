import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Preview from "./preview";
import Markdown from "./markdown";
import RepoList from "./repoList";

const CustomModal = (props) => {
    const [selectedRepo, setSelectedRepo] = useState("");

    console.log(props);
    const handleRepoSelection = (repoName) => {
        setSelectedRepo(repoName);
        console.log(repoName);
    };

    return props.type === "github" ? (
        <Modal
            show={props.show}
            onHide={props.onHide}
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Pick the repository</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RepoList
                    repos={props.repos}
                    onRepoSelect={handleRepoSelection}
                    selectedRepo={selectedRepo}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={() => props.onRepoSelect(selectedRepo)}
                >
                    Confirm Repository
                </Button>
            </Modal.Footer>
        </Modal>
    ) : (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {props.type === "preview" && <Preview markdown={props.markdown} />}
            {props.type === "markdown" && (
                <Markdown markdown={props.markdown} />
            )}
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
