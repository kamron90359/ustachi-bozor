import { categories } from '@/data/categories';
import { generateMasters, generateUsers, generateReviews, generateOrders, generateReports, generateSupportTickets } from '@/data/seed';
const KEYS = {
  seeded: 'ustachi:seeded:v2',
  masters: 'ustachi:masters',
  users: 'ustachi:users',
  categories: 'ustachi:categories',
  orders: 'ustachi:orders',
  reviews: 'ustachi:reviews',
  favorites: 'ustachi:favorites',
  session: 'ustachi:session',
  conversations: 'ustachi:conversations',
  messages: 'ustachi:messages',
  notifications: 'ustachi:notifications',
  reports: 'ustachi:reports',
  tickets: 'ustachi:tickets',
  recentSearches: 'ustachi:recent-searches'
};
function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function ensureSeeded() {
  if (localStorage.getItem(KEYS.seeded)) return;
  const masters = generateMasters();
  write(KEYS.masters, masters);
  write(KEYS.users, generateUsers());
  write(KEYS.categories, categories);
  write(KEYS.orders, generateOrders(masters));
  write(KEYS.reviews, generateReviews(masters));
  write(KEYS.favorites, []);
  write(KEYS.conversations, []);
  write(KEYS.messages, []);
  write(KEYS.notifications, []);
  write(KEYS.reports, generateReports(masters));
  write(KEYS.tickets, generateSupportTickets());
  write(KEYS.recentSearches, []);
  localStorage.setItem(KEYS.seeded, '1');
}
export const db = {
  KEYS,
  getMasters: () => read(KEYS.masters, []),
  setMasters: v => write(KEYS.masters, v),
  getUsers: () => read(KEYS.users, []),
  setUsers: v => write(KEYS.users, v),
  getCategories: () => read(KEYS.categories, []),
  setCategories: v => write(KEYS.categories, v),
  getOrders: () => read(KEYS.orders, []),
  setOrders: v => write(KEYS.orders, v),
  getReviews: () => read(KEYS.reviews, []),
  setReviews: v => write(KEYS.reviews, v),
  getFavorites: () => read(KEYS.favorites, []),
  setFavorites: v => write(KEYS.favorites, v),
  getConversations: () => read(KEYS.conversations, []),
  setConversations: v => write(KEYS.conversations, v),
  getMessages: () => read(KEYS.messages, []),
  setMessages: v => write(KEYS.messages, v),
  getNotifications: () => read(KEYS.notifications, []),
  setNotifications: v => write(KEYS.notifications, v),
  getReports: () => read(KEYS.reports, []),
  setReports: v => write(KEYS.reports, v),
  getTickets: () => read(KEYS.tickets, []),
  setTickets: v => write(KEYS.tickets, v),
  getRecentSearches: () => read(KEYS.recentSearches, []),
  setRecentSearches: v => write(KEYS.recentSearches, v)
};
export function uid(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
const delay = (ms = 250) => new Promise(res => setTimeout(res, ms));
export { delay };
