import { read, write, KEYS } from './storage';

function getAll() {
  return read(KEYS.PROFILES, {});
}

export function get(userId) {
  return getAll()[userId] || null;
}

export function save(userId, profile) {
  const all = getAll();
  all[userId] = { ...profile, updatedAt: new Date().toISOString() };
  write(KEYS.PROFILES, all);
}

export function remove(userId) {
  const all = getAll();
  delete all[userId];
  write(KEYS.PROFILES, all);
}
