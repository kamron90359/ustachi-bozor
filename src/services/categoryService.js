import { db, delay, uid } from './db';
export const categoryService = {
  async getCategories() {
    await delay(150);
    const masters = db.getMasters();
    return db.getCategories().map(c => ({
      ...c,
      masterCount: masters.filter(m => m.categoryId === c.id && m.published).length
    }));
  },
  async getBySlug(slug) {
    await delay(100);
    return db.getCategories().find(c => c.slug === slug) ?? null;
  },
  async create(name) {
    await delay(200);
    const cat = {
      id: uid('c'),
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      icon: 'Wrench',
      active: true
    };
    db.setCategories([...db.getCategories(), cat]);
    return cat;
  },
  async update(id, patch) {
    await delay(200);
    const list = db.getCategories();
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1) return;
    list[idx] = {
      ...list[idx],
      ...patch
    };
    db.setCategories(list);
  },
  async remove(id) {
    await delay(200);
    db.setCategories(db.getCategories().filter(c => c.id !== id));
  }
};
