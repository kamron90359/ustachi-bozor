const defaultHours = [{
  day: 'Dushanba',
  working: true,
  start: '09:00',
  end: '18:00'
}, {
  day: 'Seshanba',
  working: true,
  start: '09:00',
  end: '18:00'
}, {
  day: 'Chorshanba',
  working: true,
  start: '09:00',
  end: '18:00'
}, {
  day: 'Payshanba',
  working: true,
  start: '09:00',
  end: '18:00'
}, {
  day: 'Juma',
  working: true,
  start: '09:00',
  end: '18:00'
}, {
  day: 'Shanba',
  working: true,
  start: '10:00',
  end: '16:00'
}, {
  day: 'Yakshanba',
  working: false,
  start: '10:00',
  end: '16:00'
}];
const names = [['Abdulloh', 'Normatov', 'santexnik', 'c2'], ['Javlonbek', "To'xtayev", 'elektrik', 'c1'], ['Shahzod', 'Akramov', 'quruvchi', 'c3'], ['Jasur', 'Karimov', 'elektrik', 'c1'], ["Diyorbek", 'Valadashov', 'plitkachi', 'c5'], ['Rustam', 'Yuldashov', 'quruvchi', 'c3'], ['Sardor', 'Rashidov', 'malyarchik', 'c4'], ['Botir', 'Ergashev', 'duradgor', 'c7'], ['Aziz', 'Yusupov', 'gipsochik', 'c6'], ['Farrux', 'Islomov', 'konditsioner ustasi', 'c8'], ['Bekzod', 'Nazarov', 'mebel ustasi', 'c9'], ['Ulug\'bek', 'Sattorov', 'maishiy texnika ustasi', 'c10']];
const avatarSeeds = ['men/1', 'men/2', 'men/3', 'men/4', 'men/5', 'men/6', 'men/7', 'men/8', 'men/9', 'men/10', 'men/11', 'men/12'];
const serviceCatalog = {
  santexnik: [{
    title: "Kran o'rnatish",
    price: 80000
  }, {
    title: 'Unitaz o\'rnatish',
    price: 150000
  }, {
    title: 'Quvur almashtirish (1 nuqta)',
    price: 100000
  }, {
    title: 'Suv oqishlarni bartaraf etish',
    price: 70000
  }],
  elektrik: [{
    title: 'Rozetka o\'rnatish',
    price: 30000
  }, {
    title: 'Elektr simlarini almashtirish',
    price: 120000
  }, {
    title: 'Lyustra o\'rnatish',
    price: 60000
  }],
  quruvchi: [{
    title: 'Devor terish',
    price: 200000
  }, {
    title: 'Shpaklovka ishlari',
    price: 90000
  }, {
    title: 'Poydevor ta\'mirlash',
    price: 350000
  }],
  malyarchik: [{
    title: 'Devor bo\'yash',
    price: 40000
  }, {
    title: 'Shift bo\'yash',
    price: 50000
  }],
  plitkachi: [{
    title: 'Kafel yotqizish (m2)',
    price: 60000
  }, {
    title: 'Hammom plitka ishlari',
    price: 250000
  }],
  gipsochik: [{
    title: 'Gipsokarton devor',
    price: 130000
  }, {
    title: 'Shift konstruksiyasi',
    price: 180000
  }],
  duradgor: [{
    title: 'Eshik o\'rnatish',
    price: 100000
  }, {
    title: 'Yog\'och konstruksiya',
    price: 220000
  }],
  'konditsioner ustasi': [{
    title: 'Konditsioner o\'rnatish',
    price: 150000
  }, {
    title: 'Texnik xizmat',
    price: 60000
  }],
  'mebel ustasi': [{
    title: 'Mebel yig\'ish',
    price: 90000
  }, {
    title: 'Oshxona garniturasi',
    price: 400000
  }],
  'maishiy texnika ustasi': [{
    title: 'Muzlatgich ta\'mirlash',
    price: 100000
  }, {
    title: 'Kir yuvish mashinasi ta\'mirlash',
    price: 90000
  }]
};
const regionsCycle = ['Toshkent shahri', 'Toshkent shahri', 'Toshkent viloyati', 'Samarqand'];
const districtsCycle = ['Chilonzor tumani', 'Yunusobod tumani', 'Mirzo Ulug\'bek tumani', 'Shayxontohur tumani'];

// Roughly spread around central Tashkent for the demo map
const TASHKENT_CENTER = {
  lat: 41.2995,
  lng: 69.2401
};
export function generateMasters() {
  return names.map(([firstName, lastName, profession, categoryId], i) => {
    const services = (serviceCatalog[profession] || serviceCatalog['santexnik']).map((s, si) => ({
      id: `svc-${i}-${si}`,
      title: s.title,
      price: s.price,
      priceFrom: true,
      active: true
    }));
    const availabilityStatus = i % 4 === 0 ? 'busy' : i % 7 === 0 ? 'offline' : 'available';
    return {
      id: `m${i + 1}`,
      userId: `u-master-${i + 1}`,
      slug: `${firstName.toLowerCase()}-${lastName.toLowerCase()}`.replace(/[^a-z-]/g, ''),
      firstName,
      lastName,
      avatar: `https://i.pravatar.cc/300?img=${i % 70 + 1}`,
      profession: profession.charAt(0).toUpperCase() + profession.slice(1),
      categoryId,
      experience: 2 + i % 8,
      rating: +(4.3 + i % 6 * 0.1).toFixed(1),
      reviewCount: 20 + i * 11,
      region: regionsCycle[i % regionsCycle.length],
      district: districtsCycle[i % districtsCycle.length],
      address: `${districtsCycle[i % districtsCycle.length]}, ${5 + i}-uy`,
      available: availabilityStatus === 'available',
      availabilityStatus,
      verified: i % 3 !== 2,
      topMaster: i % 5 === 0,
      fastResponder: i % 3 === 0,
      plan: i % 5 === 0 ? 'top' : i % 3 === 0 ? 'premium' : 'free',
      responseMinutes: 5 + i % 6 * 4,
      completionRate: 90 + i % 9,
      recommendRate: 88 + i % 11,
      orderCount: 30 + i * 9,
      lat: TASHKENT_CENTER.lat + (i * 37 % 100 / 100 - 0.5) * 0.09,
      lng: TASHKENT_CENTER.lng + (i * 53 % 100 / 100 - 0.5) * 0.12,
      about: `Salom! Men ${2 + i % 8} yildan beri ${profession} xizmatlarini bajarib kelaman. Har qanday murakkablikdagi ishlarni sifatli va tez bajaraman.`,
      services,
      portfolio: [1, 2, 3, 4].map(p => ({
        id: `pf-${i}-${p}`,
        image: `https://picsum.photos/seed/ustachi-${i}-${p}/500/400`
      })),
      workingHours: defaultHours,
      priceFrom: services[0]?.price ?? 50000,
      published: true,
      createdAt: new Date(Date.now() - i * 86400000).toISOString()
    };
  });
}
export function generateUsers() {
  const base = [{
    id: 'u-customer-1',
    role: 'customer',
    firstName: 'Aziz',
    lastName: 'Bekov',
    phone: '+998901234567',
    email: 'customer@test.uz',
    createdAt: new Date().toISOString(),
    status: 'active'
  }, {
    id: 'u-admin-1',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'Ustachi',
    phone: '+998900000000',
    email: 'admin@test.uz',
    createdAt: new Date().toISOString(),
    status: 'active'
  }];
  const masterUsers = names.map(([firstName, lastName], i) => ({
    id: `u-master-${i + 1}`,
    role: 'master',
    firstName,
    lastName,
    phone: `+99890111${(1000 + i).toString().slice(-4)}`,
    email: i === 0 ? 'master@test.uz' : undefined,
    createdAt: new Date().toISOString(),
    status: 'active'
  }));
  return [...base, ...masterUsers];
}
export function generateReviews(masters) {
  const comments = ['Juda tez va sifatli ishladi, tavsiya qilaman!', 'Vaqtida keldi, hammasi puxta bajarildi.', 'Narxi mos, ishi ham a\'lo darajada.', 'Muloyim va professional yondashuv.'];
  const reviews = [];
  masters.slice(0, 6).forEach((m, mi) => {
    for (let i = 0; i < 3; i++) {
      reviews.push({
        id: `rv-${mi}-${i}`,
        masterId: m.id,
        customerId: 'u-customer-1',
        customerName: ['Dilnoza R.', 'Otabek Q.', 'Malika S.'][i],
        rating: 4 + i % 2,
        comment: comments[(mi + i) % comments.length],
        createdAt: new Date(Date.now() - i * 3 * 86400000).toISOString()
      });
    }
  });
  return reviews;
}
export function generateOrders(masters) {
  const statuses = ['Yangi', 'Qabul qilindi', 'Jarayonda', 'Yakunlandi', 'Bekor qilindi'];
  return masters.slice(0, 5).map((m, i) => ({
    id: `ord-${100 + i}`,
    customerId: 'u-customer-1',
    customerName: 'Aziz Bekov',
    customerPhone: '+998901234567',
    masterId: m.id,
    masterName: `${m.firstName} ${m.lastName}`,
    service: m.services[0]?.title ?? 'Xizmat',
    description: 'Kran suv oqiyapti, iltimos tezroq ko\'ring.',
    address: `${m.district}, Toshkent shahri`,
    date: new Date(Date.now() + (i - 2) * 86400000).toISOString().slice(0, 10),
    time: '14:00',
    price: m.priceFrom,
    status: statuses[i % statuses.length],
    createdAt: new Date(Date.now() - i * 43200000).toISOString(),
    reviewed: statuses[i % statuses.length] === 'Yakunlandi' ? false : undefined
  }));
}
export function generateReports(masters) {
  const reasons = ['Soxta profil', 'Sifatsiz xizmat', "Noto'g'ri ma'lumot", 'Nomaqbul xulq-atvor', 'Boshqa'];
  const statuses = ['Yangi', "Ko'rib chiqilmoqda", 'Hal qilindi'];
  const descriptions = ["Usta belgilangan vaqtda kelmadi va aloqaga chiqmadi.", "Profilida ko'rsatilgan narx bilan haqiqiy narx mos kelmadi.", "Ish sifati kutilganidan past bo'ldi.", "Muloqot davomida qo'pol munosabatda bo'ldi."];
  return masters.slice(0, 4).map((m, i) => ({
    id: `rep-${i + 1}`,
    reason: reasons[i % reasons.length],
    description: descriptions[i % descriptions.length],
    reporterId: 'u-customer-1',
    reporterName: 'Aziz Bekov',
    targetType: 'master',
    targetId: m.id,
    targetLabel: `${m.firstName} ${m.lastName}`,
    status: statuses[i % statuses.length],
    createdAt: new Date(Date.now() - i * 2 * 86400000).toISOString()
  }));
}
export function generateSupportTickets() {
  const subjects = ["To'lov bo'yicha savol", "Profilni tasdiqlash muddati", "Buyurtmani bekor qilish"];
  const statuses = ['Yangi', 'Ochiq', 'Hal qilindi'];
  return subjects.map((subject, i) => ({
    id: `tkt-${i + 1}`,
    userId: 'u-customer-1',
    userName: 'Aziz Bekov',
    subject,
    status: statuses[i % statuses.length],
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    messages: [{
      id: `tm-${i}-1`,
      authorRole: 'customer',
      authorName: 'Aziz Bekov',
      text: 'Assalomu alaykum, ' + subject.toLowerCase() + ' bo\'yicha yordam kerak edi.',
      createdAt: new Date(Date.now() - i * 86400000).toISOString()
    }]
  }));
}
