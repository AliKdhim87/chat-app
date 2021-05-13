import type {User} from '../types'

const users: User[] = []

export const addUser = ({ id, name, room }: User) => {

  if (!name || !room) return { error: 'Username and room are required.' }

  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );


  if (existingUser) return { error: 'Username is already exist!' };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

export const getUser = (id: string) => users.find((user) => user.id === id);

export const getUsersInRoom = (room: string) => users.filter((user) => user.room === room);
