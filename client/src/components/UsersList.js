import React from 'react';
import { Card } from 'react-bootstrap';
const UsersList = ({ users }) => {
  return (
    <Card bg='dark' text='white'>
      <Card.Header>Users</Card.Header>
      <ul>
        {users !== null &&
          users.users.map((user) => (
            <li className='user-list-item' key={user.id}>
              {user.name}
            </li>
          ))}
      </ul>
    </Card>
  );
};

export default UsersList;
