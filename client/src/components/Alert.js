import React from 'react';
import { Modal, Button } from 'react-bootstrap';
const Alert = (props) => {
  return (
    <Modal
      show={Boolean(props.error)}
      {...props}
      size='lg'
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Error message
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.error}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button href='/' variant='dark'>
          Go Home page
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Alert;
