import { db, uid } from './db';
export const notificationService = {
  push(userId, title, type = 'system', body) {
    const n = {
      id: uid('ntf'),
      userId,
      title,
      body,
      type,
      read: false,
      createdAt: new Date().toISOString()
    };
    db.setNotifications([n, ...db.getNotifications()]);
  },
  getForUser(userId) {
    return db.getNotifications().filter(n => n.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  markRead(id) {
    db.setNotifications(db.getNotifications().map(n => n.id === id ? {
      ...n,
      read: true
    } : n));
  },
  markAllRead(userId) {
    const list = db.getNotifications().map(n => n.userId === userId ? {
      ...n,
      read: true
    } : n);
    db.setNotifications(list);
  },
  create(input) {
    notificationService.push(input.userId, input.title, input.type, input.body);
  },
  broadcast(userIds, title, body, type = 'promotion') {
    userIds.forEach(id => notificationService.push(id, title, type, body));
  }
};
