import { db, uid } from './db';
export const recentSearchService = {
  getAll() {
    return db.getRecentSearches().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6);
  },
  add(input) {
    const existing = db.getRecentSearches().filter(s => s.label !== input.label);
    const entry = {
      id: uid('rs'),
      createdAt: new Date().toISOString(),
      ...input
    };
    db.setRecentSearches([entry, ...existing].slice(0, 8));
  },
  clear() {
    db.setRecentSearches([]);
  }
};
