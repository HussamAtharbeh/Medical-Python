import { read, write, remove, KEYS } from './storage';

export function get() {
  return read(KEYS.SESSION, null);
}

export function set(userId) {
  write(KEYS.SESSION, { userId });
}

export function clear() {
  remove(KEYS.SESSION);
}
