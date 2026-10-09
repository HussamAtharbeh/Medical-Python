import { read, write, KEYS } from './storage';

function getAll() {
  return read(KEYS.USERS, []);
}

export function create({ fullName, phone, password }) {
  const users = getAll();
  const user = {
    id: crypto.randomUUID(),
    fullName,
    phone,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  write(KEYS.USERS, users);
  return user;
}

export function findByPhone(phone) {
  return getAll().find((u) => u.phone === phone) || null;
}

export function findById(id) {
  return getAll().find((u) => u.id === id) || null;
}
