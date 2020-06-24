import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import Alert from './Alert';

import UsersList from './UsersList';
let socket;
const ChatRoom = (props) => {
  const { name, room } = queryString.parse(props.location.search);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    socket = io('http://localhost:5000');
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        return setError(error);
      }
    });
    socket.on('message', (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
    socket.on('onlineUsers', (onlineUsers) => {
      setUsers(onlineUsers);
    });
  }, [name, room]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <Container style={{ marginTop: '.7rem' }}>
      <Alert error={error} />
      <Row>
        <Col
          lg='10'
          sm='8'
          xs='8'
          style={{
            paddingLeft: '5px',
            paddingRight: '5px',
          }}
        >
          <Card bg='dark' text='white'>
            <Card.Header>
              <a className='leave-the-room' href='/'>
                <i className='fas fa-sign-out-alt '></i>
              </a>
              <Card.Title className='text-center'>
                {`Welcome in the ${
                  users !== null ? users.room : 'There is no room!'
                } room`}
              </Card.Title>
            </Card.Header>

            <ScrollToBottom className='chat_box'>
              {messages.map((message, index) => (
                <Message message={message} key={index} name={name} />
              ))}
            </ScrollToBottom>
          </Card>
        </Col>

        <Col
          lg='2'
          sm='4'
          xs='4'
          style={{
            paddingLeft: '0px',
            paddingRight: '5px',
          }}
        >
          <UsersList users={users} />
        </Col>
        <Col lg='12' style={{ paddingRight: '5px', paddingLeft: '5px' }}>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Control
                as='textarea'
                rows='3'
                placeholder='Type Your Message'
                name='message'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </Form.Group>

            <Button
              variant='dark'
              type='submit'
              size='lg'
              block
              disabled={Boolean(error)}
            >
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatRoom;
