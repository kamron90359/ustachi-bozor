import { create } from 'zustand';
import { db } from '@/services/db';
export const useFavoritesStore = create((set, get) => ({
  favorites: [],
  init: () => set({
    favorites: db.getFavorites()
  }),
  toggle: masterId => {
    const current = get().favorites;
    const next = current.includes(masterId) ? current.filter(id => id !== masterId) : [...current, masterId];
    db.setFavorites(next);
    set({
      favorites: next
    });
  },
  isFavorite: masterId => get().favorites.includes(masterId)
}));
