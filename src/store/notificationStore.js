import { create } from 'zustand';
import { notificationService } from '@/services/notificationService';
export const useNotificationStore = create(set => ({
  items: [],
  refresh: userId => set({
    items: notificationService.getForUser(userId)
  }),
  markAllRead: userId => {
    notificationService.markAllRead(userId);
    set({
      items: notificationService.getForUser(userId)
    });
  }
}));
