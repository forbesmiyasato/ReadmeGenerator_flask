import React from "react";
import Form from 'react-bootstrap/Form'


const TextForm = ({id, label, placeholder, text, type, as = 'input'}) => {
    return (
        <Form.Group controlId={id}>
        <Form.Label>{label}</Form.Label>
        <Form.Control as={as} type={type} placeholder={placeholder} />
        <Form.Text className="text-muted">
          {text}
        </Form.Text>
      </Form.Group>
    );
};

export default TextForm;