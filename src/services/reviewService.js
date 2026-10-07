import { db, delay, uid } from './db';
import { masterService } from './masterService';
import { notificationService } from './notificationService';
export const reviewService = {
  async getForMaster(masterId) {
    await delay(150);
    return db.getReviews().filter(r => r.masterId === masterId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async create(input) {
    await delay(300);
    const review = {
      id: uid('rv'),
      createdAt: new Date().toISOString(),
      ...input
    };
    db.setReviews([review, ...db.getReviews()]);
    const all = db.getReviews().filter(r => r.masterId === input.masterId);
    const avg = all.reduce((s, r) => s + r.rating, 0) / all.length;
    const master = await masterService.updateMaster(input.masterId, {
      rating: +avg.toFixed(1),
      reviewCount: all.length
    });
    if (master) notificationService.push(master.userId, "Yangi sharh qoldirildi", 'review', `${input.customerName}: ${input.rating}/5`);
    return review;
  },
  async getAll() {
    await delay(150);
    return db.getReviews().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
};
