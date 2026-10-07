import { db, delay, uid } from './db';
const TEST_ACCOUNTS = {
  'customer@test.uz': {
    userId: 'u-customer-1',
    password: 'test1234'
  },
  'master@test.uz': {
    userId: 'u-master-1',
    password: 'test1234'
  },
  'admin@test.uz': {
    userId: 'u-admin-1',
    password: 'test1234'
  }
};
export const authService = {
  async login(identifier, _password) {
    await delay(400);
    const users = db.getUsers();
    let user;
    const testAccount = TEST_ACCOUNTS[identifier.trim().toLowerCase()];
    if (testAccount) {
      user = users.find(u => u.id === testAccount.userId);
    }
    if (!user) {
      user = users.find(u => u.phone === identifier.trim() || u.email === identifier.trim().toLowerCase());
    }
    if (!user) throw new Error('Bunday foydalanuvchi topilmadi. Test hisoblardan foydalaning.');
    if (user.status === 'blocked') throw new Error('Sizning hisobingiz bloklangan.');
    localStorage.setItem(db.KEYS.session, JSON.stringify({
      userId: user.id
    }));
    return user;
  },
  async registerCustomer(data) {
    await delay(400);
    const users = db.getUsers();
    const newUser = {
      id: uid('u-customer'),
      role: 'customer',
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone ?? '',
      email: data.email,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    db.setUsers([...users, newUser]);
    localStorage.setItem(db.KEYS.session, JSON.stringify({
      userId: newUser.id
    }));
    return newUser;
  },
  async registerMaster(data) {
    await delay(400);
    const users = db.getUsers();
    const newUser = {
      id: uid('u-master'),
      role: 'master',
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone ?? '',
      email: data.email,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    db.setUsers([...users, newUser]);
    localStorage.setItem(db.KEYS.session, JSON.stringify({
      userId: newUser.id
    }));
    return newUser;
  },
  logout() {
    localStorage.removeItem(db.KEYS.session);
  },
  getSession() {
    try {
      const raw = localStorage.getItem(db.KEYS.session);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  getCurrentUser() {
    const session = authService.getSession();
    if (!session) return null;
    return db.getUsers().find(u => u.id === session.userId) ?? null;
  },
  updateUser(userId, patch) {
    const users = db.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return null;
    users[idx] = {
      ...users[idx],
      ...patch
    };
    db.setUsers(users);
    return users[idx];
  },
  testAccounts: Object.keys(TEST_ACCOUNTS)
};
