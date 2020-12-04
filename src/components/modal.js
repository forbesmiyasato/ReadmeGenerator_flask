import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Preview from "./preview";
import Markdown from "./markdown";
import RepoList from "./repoList";
const modal = (props) => {
    return props.type === "github" ? (
        <Modal
            {...props}
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Pick the repository</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RepoList repos={props.repos}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={props.onRepoSelect}>Confirm Repository</Button>
            </Modal.Footer>
        </Modal>
    ) : (
        <Modal
            {...props}
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

export default modal;
