import { db, delay, uid } from './db';
export const messageService = {
  async getConversations(userId, role) {
    await delay(150);
    const all = db.getConversations();
    return all.filter(c => role === 'customer' ? c.customerId === userId : c.masterId === userId);
  },
  async getOrCreateConversation(customerId, customerName, masterId, masterName, masterAvatar) {
    const all = db.getConversations();
    let convo = all.find(c => c.customerId === customerId && c.masterId === masterId);
    if (!convo) {
      convo = {
        id: uid('conv'),
        customerId,
        customerName,
        masterId,
        masterName,
        masterAvatar
      };
      db.setConversations([...all, convo]);
    }
    return convo;
  },
  async getMessages(conversationId) {
    await delay(120);
    return db.getMessages().filter(m => m.conversationId === conversationId).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  },
  async sendMessage(conversationId, senderId, senderRole, text) {
    await delay(200);
    const msg = {
      id: uid('msg'),
      conversationId,
      senderId,
      senderRole,
      text,
      createdAt: new Date().toISOString(),
      read: false
    };
    db.setMessages([...db.getMessages(), msg]);
    const convos = db.getConversations();
    const idx = convos.findIndex(c => c.id === conversationId);
    if (idx !== -1) {
      convos[idx] = {
        ...convos[idx],
        lastMessage: text,
        lastMessageAt: msg.createdAt
      };
      db.setConversations(convos);
    }
    return msg;
  }
};
