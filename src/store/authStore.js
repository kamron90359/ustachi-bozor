import { create } from 'zustand';
import { authService } from '@/services/authService';
export const useAuthStore = create(set => ({
  user: null,
  loading: true,
  init: () => {
    const user = authService.getCurrentUser();
    set({
      user,
      loading: false
    });
  },
  login: async (identifier, password) => {
    const user = await authService.login(identifier, password);
    set({
      user
    });
    return user;
  },
  logout: () => {
    authService.logout();
    set({
      user: null
    });
  },
  setUser: u => set({
    user: u
  })
}));
