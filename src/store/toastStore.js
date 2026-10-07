import { create } from 'zustand';
export const useToastStore = create(set => ({
  toasts: [],
  show: (type, message) => {
    const id = Math.random().toString(36).slice(2);
    set(s => ({
      toasts: [...s.toasts, {
        id,
        type,
        message
      }]
    }));
    setTimeout(() => set(s => ({
      toasts: s.toasts.filter(t => t.id !== id)
    })), 3500);
  },
  dismiss: id => set(s => ({
    toasts: s.toasts.filter(t => t.id !== id)
  }))
}));
