import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Preview from "./preview";
import Markdown from "./markdown";
import RepoList from "./repoList";

const CustomModal = (props) => {
    const [selectedRepo, setSelectedRepo] = useState("");
    const [preview, setPreview] = useState(false);
    const handleRepoSelection = (repoName) => {
        setSelectedRepo(repoName);
    };

    const onHide = () => {
        setSelectedRepo("");
        props.onHide();
        setPreview(false);
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
                {preview &&
                    (!props.markdown ? (
                        "You didn't input anything, are you sure you want to upload the README?"
                    ) : (
                        <Preview markdown={props.markdown} />
                    ))}
                {!preview && (
                    <RepoList
                        repos={props.repos}
                        onRepoSelect={handleRepoSelection}
                        selectedRepo={selectedRepo}
                    />
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                {!preview && (
                    <>
                        <Button
                            variant="primary"
                            onClick={() => setPreview(true)}
                        >
                            Preview Markdown
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => props.onRepoSelect(selectedRepo)}
                        >
                            Confirm Repository
                        </Button>
                    </>
                )}
                {preview && (
                    <Button variant="primary" onClick={() => setPreview(false)}>
                        Back to list
                    </Button>
                )}
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
