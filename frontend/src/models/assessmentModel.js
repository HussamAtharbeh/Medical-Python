import { read, write, KEYS } from './storage';

function getAll() {
  return read(KEYS.ASSESSMENTS, []);
}

function saveAll(list) {
  write(KEYS.ASSESSMENTS, list);
}

export function create(assessment) {
  const all = getAll();
  all.push(assessment);
  saveAll(all);
  return assessment;
}

export function update(id, patch) {
  const all = getAll();
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch };
  saveAll(all);
  return all[idx];
}

export function get(id) {
  return getAll().find((a) => a.id === id) || null;
}

export function listByUser(userId) {
  return getAll()
    .filter((a) => a.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function removeImages(id) {
  update(id, { images: [] });
}
