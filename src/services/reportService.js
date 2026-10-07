import { db, delay, uid } from './db';
export const reportService = {
  async getAll() {
    await delay(150);
    return db.getReports().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async updateStatus(id, status) {
    await delay(200);
    const list = db.getReports().map(r => r.id === id ? {
      ...r,
      status
    } : r);
    db.setReports(list);
  },
  async create(input) {
    await delay(200);
    const report = {
      ...input,
      id: uid('rep'),
      status: 'Yangi',
      createdAt: new Date().toISOString()
    };
    db.setReports([report, ...db.getReports()]);
    return report;
  }
};
