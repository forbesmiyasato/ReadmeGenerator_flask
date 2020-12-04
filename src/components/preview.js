import React from 'react'
import Modal from 'react-bootstrap/Modal'
import MarkdownPreview from "@uiw/react-markdown-preview";

const Preview = ({markdown}) => {
    return (
        <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <MarkdownPreview source={markdown} />
        </Modal.Body>
        </>
    )
}

export default Preview;