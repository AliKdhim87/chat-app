import React, { useState } from 'react';
import { Jumbotron, Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Join = () => {
  const location = useHistory();
  const [input, setInput] = useState({
    name: '',
    room: '',
  });

  const { name, room } = input;
  const inputHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (name.trim() !== '' && room.trim() !== '') {
      location.push(`/chat?name=${name}&room=${room}`);
    }
  };
  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1 className='text-center'>Welcome to the chat app</h1>
        </Container>
      </Jumbotron>
      <Row className='justify-content-md-center'>
        <Col md='5'>
          <Container>
            <Form onSubmit={onSubmitHandler}>
              <Form.Group>
                <Form.Label>User name</Form.Label>
                <Form.Control
                  placeholder='Enter User name'
                  name='name'
                  onChange={inputHandler}
                  value={name}
                  autoComplete='off'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Room name</Form.Label>
                <Form.Control
                  placeholder='Enter room name'
                  name='room'
                  onChange={inputHandler}
                  value={room}
                  autoComplete='off'
                />
              </Form.Group>
              <Button variant='dark' type='submit' size='lg' block>
                Join
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default Join;
