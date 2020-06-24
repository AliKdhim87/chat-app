import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Chat from './components/Chat';
import Join from './components/Join';
const App = () => {
  return (
    <Router>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='/'>Chat App</Navbar.Brand>
      </Navbar>
      <Route exact path='/' component={Join} />
      <Route exact path='/chat' component={Chat} />
    </Router>
  );
};

export default App;
