import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Preview from "./preview";
import Markdown from "./markdown";
import RepoList from "./repoList";

const CustomModal = (props) => {
    const [selectedRepo, setSelectedRepo] = useState("");

    const handleRepoSelection = (repoName) => {
        setSelectedRepo(repoName);
        console.log(repoName);
    };

    const onHide = () => {
        setSelectedRepo("");
        props.onHide();
    };

    return props.type === "github" ? (
        <Modal
            show={props.show}
            onHide={onHide}
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
                <Button variant="secondary" onClick={onHide}>
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
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.type}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!props.markdown ? (
                    "You didn't input anything"
                ) : props.type === "Preview" ? (
                    <Preview markdown={props.markdown} />
                ) : props.type === "Markdown" ? (
                    <Markdown markdown={props.markdown} />
                ) : null}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
