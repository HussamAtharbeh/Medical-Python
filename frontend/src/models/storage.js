export const KEYS = {
  USERS: 'mz_users',
  SESSION: 'mz_session',
  PROFILES: 'mz_profiles',
  ASSESSMENTS: 'mz_assessments',
};

export function read(key, fallback = null) {
  const raw = localStorage.getItem(key);
  if (raw === null) return fallback;
  return JSON.parse(raw);
}

export function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function remove(key) {
  localStorage.removeItem(key);
}
