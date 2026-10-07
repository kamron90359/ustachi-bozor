import { db, delay, uid } from './db';
import { masterService } from './masterService';
import { notificationService } from './notificationService';
export const orderService = {
  async getOrdersForCustomer(customerId) {
    await delay(200);
    return db.getOrders().filter(o => o.customerId === customerId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async getOrdersForMaster(masterId) {
    await delay(200);
    return db.getOrders().filter(o => o.masterId === masterId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async getAllOrders() {
    await delay(200);
    return db.getOrders().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async createOrder(input) {
    await delay(500);
    const order = {
      id: uid('ord'),
      status: 'Yangi',
      createdAt: new Date().toISOString(),
      ...input
    };
    db.setOrders([order, ...db.getOrders()]);
    const master = await masterService.getMasterById(input.masterId);
    if (master) {
      notificationService.push(master.userId, `Yangi so'rov keldi: ${input.service}`, 'request');
    }
    return order;
  },
  async updateStatus(orderId, status) {
    await delay(300);
    const orders = db.getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return null;
    orders[idx] = {
      ...orders[idx],
      status
    };
    db.setOrders(orders);
    const label = status === 'Qabul qilindi' ? "So'rovingiz qabul qilindi" : status === 'Yakunlandi' ? 'Buyurtma yakunlandi' : status === 'Rad etildi' ? "So'rovingiz rad etildi" : `Buyurtma holati: ${status}`;
    notificationService.push(orders[idx].customerId, label, 'order');
    return orders[idx];
  },
  async markReviewed(orderId) {
    const orders = db.getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return;
    orders[idx] = {
      ...orders[idx],
      reviewed: true
    };
    db.setOrders(orders);
  }
};
