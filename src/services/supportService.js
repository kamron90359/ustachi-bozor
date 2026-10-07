import { db, delay, uid } from './db';
export const supportService = {
  async getForUser(userId) {
    await delay(150);
    return db.getTickets().filter(t => t.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async getAll() {
    await delay(150);
    return db.getTickets().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async create(userId, userName, subject, message) {
    await delay(300);
    const ticket = {
      id: uid('tkt'),
      userId,
      userName,
      subject,
      status: 'Yangi',
      createdAt: new Date().toISOString(),
      messages: [{
        id: uid('tm'),
        authorRole: 'customer',
        authorName: userName,
        text: message,
        createdAt: new Date().toISOString()
      }]
    };
    db.setTickets([ticket, ...db.getTickets()]);
    return ticket;
  },
  async reply(ticketId, authorRole, authorName, text) {
    await delay(250);
    const tickets = db.getTickets();
    const idx = tickets.findIndex(t => t.id === ticketId);
    if (idx === -1) return;
    tickets[idx] = {
      ...tickets[idx],
      messages: [...tickets[idx].messages, {
        id: uid('tm'),
        authorRole,
        authorName,
        text,
        createdAt: new Date().toISOString()
      }],
      status: authorRole === 'support' ? 'Jarayonda' : tickets[idx].status
    };
    db.setTickets(tickets);
  },
  async updateStatus(ticketId, status) {
    await delay(200);
    db.setTickets(db.getTickets().map(t => t.id === ticketId ? {
      ...t,
      status
    } : t));
  }
};
