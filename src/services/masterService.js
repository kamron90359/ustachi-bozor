import { db, delay, uid } from './db';
export const masterService = {
  async getMasters(filters = {}) {
    await delay(300);
    let items = db.getMasters().filter(m => m.published);
    if (filters.query) {
      const q = filters.query.toLowerCase();
      items = items.filter(m => `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) || m.profession.toLowerCase().includes(q) || m.services.some(s => s.title.toLowerCase().includes(q)));
    }
    if (filters.category) items = items.filter(m => m.categoryId === filters.category);
    if (filters.region) items = items.filter(m => m.region === filters.region);
    if (filters.district) items = items.filter(m => m.district === filters.district);
    if (filters.minPrice != null) items = items.filter(m => m.priceFrom >= filters.minPrice);
    if (filters.maxPrice != null) items = items.filter(m => m.priceFrom <= filters.maxPrice);
    if (filters.minRating != null) items = items.filter(m => m.rating >= filters.minRating);
    if (filters.verifiedOnly) items = items.filter(m => m.verified);
    if (filters.availableOnly) items = items.filter(m => m.available);
    if (filters.availabilityStatus) items = items.filter(m => m.availabilityStatus === filters.availabilityStatus);
    switch (filters.sort) {
      case 'price-asc':
        items = [...items].sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case 'price-desc':
        items = [...items].sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case 'experience':
        items = [...items].sort((a, b) => b.experience - a.experience);
        break;
      case 'new':
        items = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case 'response':
        items = [...items].sort((a, b) => a.responseMinutes - b.responseMinutes);
        break;
      case 'orders':
        items = [...items].sort((a, b) => b.orderCount - a.orderCount);
        break;
      default:
        items = [...items].sort((a, b) => (b.topMaster ? 1 : 0) - (a.topMaster ? 1 : 0) || b.rating - a.rating);
    }
    const total = items.length;
    const page = filters.page ?? 1;
    const pageSize = filters.pageSize ?? 9;
    const start = (page - 1) * pageSize;
    return {
      items: items.slice(start, start + pageSize),
      total
    };
  },
  async getMasterBySlug(slug) {
    await delay(200);
    return db.getMasters().find(m => m.slug === slug) ?? null;
  },
  async getMasterByUserId(userId) {
    await delay(150);
    return db.getMasters().find(m => m.userId === userId) ?? null;
  },
  async getMasterById(id) {
    await delay(100);
    return db.getMasters().find(m => m.id === id) ?? null;
  },
  async updateMaster(id, patch) {
    await delay(250);
    const masters = db.getMasters();
    const idx = masters.findIndex(m => m.id === id);
    if (idx === -1) return null;
    masters[idx] = {
      ...masters[idx],
      ...patch
    };
    db.setMasters(masters);
    return masters[idx];
  },
  async createMasterProfile(userId, data) {
    await delay(300);
    const masters = db.getMasters();
    const newMaster = {
      id: uid('m'),
      userId,
      slug: `${(data.firstName || 'usta').toLowerCase()}-${uid('s').slice(-6)}`,
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      avatar: data.avatar || `https://i.pravatar.cc/300?u=${userId}`,
      profession: data.profession ?? '',
      categoryId: data.categoryId ?? '',
      experience: data.experience ?? 0,
      rating: 0,
      reviewCount: 0,
      region: data.region ?? '',
      district: data.district ?? '',
      address: data.address ?? '',
      available: true,
      availabilityStatus: 'available',
      verified: false,
      topMaster: false,
      fastResponder: false,
      plan: 'free',
      responseMinutes: 30,
      completionRate: 100,
      recommendRate: 100,
      orderCount: 0,
      lat: data.lat ?? 41.2995,
      lng: data.lng ?? 69.2401,
      about: data.about ?? '',
      services: data.services ?? [],
      portfolio: data.portfolio ?? [],
      workingHours: data.workingHours ?? [],
      priceFrom: data.priceFrom ?? 0,
      published: false,
      createdAt: new Date().toISOString()
    };
    db.setMasters([...masters, newMaster]);
    return newMaster;
  }
};
