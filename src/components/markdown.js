import React from "react";
import Modal from "react-bootstrap/Modal";

const Markdown = ({ markdown }) => {
    console.log(markdown)
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Preview
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="bg-light pl-1 pr-1 border border-dark rounded">
                {markdown.split("\n").map((i, key) => {
                    return <p key={key}>{i}</p>;
                })}
                </div>
            </Modal.Body>
        </>
    );
};

export default Markdown;
