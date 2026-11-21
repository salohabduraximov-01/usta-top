// Usta-Top.uz - Haqiqiy ma'lumotlar bazasi (Toshkent ustalari va xizmat narxlari)

const CATEGORIES = [
  { 
    id: 'barchasi', 
    name: 'Barchasi', 
    icon: 'grid',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    description: 'Barcha mutaxassisliklar va xizmatlar ro‘yxati',
    mastersCount: '30+ usta',
    startingPrice: "35 000 so'mdan"
  },
  { 
    id: 'santexnik', 
    name: 'Santexnik', 
    icon: 'wrench',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
    description: 'Kran, unitaz, quvurlar, vanna va isitish tizimlari ta’miri',
    mastersCount: '10+ usta',
    startingPrice: "60 000 so'mdan"
  },
  { 
    id: 'elektrik', 
    name: 'Elektrik', 
    icon: 'zap',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
    description: 'Rozetka, lyustra, shit montaji, qisqa tutashuv va simlar',
    mastersCount: '8+ usta',
    startingPrice: "35 000 so'mdan"
  },
  { 
    id: 'konditsioner', 
    name: 'Konditsioner ustasi', 
    icon: 'wind',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    description: 'Freon quyish, chuqur tozalash, montaj va ta’mirlash',
    mastersCount: '6+ usta',
    startingPrice: "100 000 so'mdan"
  },
  { 
    id: 'maishiy', 
    name: 'Maishiy texnika', 
    icon: 'cpu',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80',
    description: 'Kir yuvish mashinasi, muzlatgich, gaz plita, changyutgich',
    mastersCount: '6+ usta',
    startingPrice: "50 000 so'mdan"
  },
  { 
    id: 'mebel', 
    name: 'Mebel yig‘uvchi', 
    icon: 'hammer',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    description: 'Shkaf-kupe, oshxona garnituri, krovat yig‘ish va sozlash',
    mastersCount: '5+ usta',
    startingPrice: "50 000 so'mdan"
  },
  { 
    id: 'universal', 
    name: 'Bir soatlik usta', 
    icon: 'tool',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80',
    description: 'Televizor ilish, korniz, qulf almashtirish, mayda ta’mir',
    mastersCount: '6+ usta',
    startingPrice: "40 000 so'mdan"
  }
];

const DISTRICTS = [
  'Barcha tumanlar',
  'Chilonzor',
  'Yunusobod',
  'Mirzo Ulug‘bek',
  'Yakkasaroy',
  'Shayxontohur',
  'Sergeli',
  'Olmazor',
  'Uchtepa',
  'Mirobod',
  'Yashnobod'
];

// Toshkent tumanlari haqida ma'lumot va har birida kamida 3-4 usta
const MASTERS_DATA = [
  // --- CHILONZOR TUMANI ---
  {
    id: 1,
    status: 'free',
    name: 'Akmal Karimov',
    initials: 'AK',
    profession: 'Santexnik va isitish mutaxassisi',
    categoryId: 'santexnik',
    district: 'Chilonzor',
    districtsServed: ['Chilonzor', 'Uchtepa', 'Yakkasaroy'],
    experience: 8,
    rating: 4.9,
    reviewsCount: 142,
    completedOrders: 530,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
    bio: "8 yillik tajribaga ega professional santexnik. Har qanday murakkablikdagi quvur, smesitel, unitaz, dush kabinalari va isitish batareyalarini ta'mirlayman. 6 oylik rasmiy kafolat beraman.",
    popularServices: [
      { name: 'Kran va smesitel almashtirish', price: "80 000 so'm" },
      { name: 'Unitaz o‘rnatish yoki ta’mirlash', price: "150 000 so'm" },
      { name: 'Diagnostika (ish bajarilsa)', price: 'Bepul' }
    ],
    fullPriceList: [
      { service: 'Kran va smesitel almashtirish', time: '30-45 daqiqa', price: "80 000 so'm" },
      { service: 'Unitaz montaji va sozlash', time: '1-1.5 soat', price: "150 000 so'm" },
      { service: 'Tiqilib qolgan quvurni ochish (prochistka)', time: '30 daqiqa', price: "100 000 so'm" },
      { service: 'Suv sizib chiqishini bartaraf qilish', time: '40 daqiqa', price: "120 000 so'm" }
    ],
    reviews: [
      { author: 'Nodirbek Sobirov', date: '12-noyabr, 2026', rating: 5, district: 'Chilonzor', text: 'Chaqiruvdan so‘ng 25 daqiqada yetib keldi. Quvurni sifatli almashtirdi, juda toza ishlaydi.' },
      { author: 'Madina Umarova', date: '5-noyabr, 2026', rating: 5, district: 'Chilonzor', text: 'Unitaz va dush smesitelini almashtirib berdilar. Ishidan juda mamnunman.' }
    ]
  },
  {
    id: 2,
    status: 'busy',
    name: 'Jamshid Bekmirzayev',
    initials: 'JB',
    profession: 'Elektrik va LED tizimlari ustasi',
    categoryId: 'elektrik',
    district: 'Chilonzor',
    districtsServed: ['Chilonzor', 'Uchtepa', 'Yakkasaroy'],
    experience: 7,
    rating: 4.9,
    reviewsCount: 110,
    completedOrders: 430,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    bio: "Interyer yoritish tizimlari: shift va mebellar uchun yashirin LED profillar, kuchlanish releylari (Zubr) va elektr shitlarini estetik tartibga keltirish.",
    popularServices: [
      { name: 'LED lenta va podsvetka montaji', price: "45 000 so'm/m" },
      { name: 'Kuchlanish relesi (Zubr) montaji', price: "90 000 so'm" },
      { name: 'Avtomat uzgichni almashtirish', price: "50 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Shift va mebellarga LED lenta montaji', time: '1-2 soat', price: "45 000 so'm/metr" },
      { service: 'Kuchlanish relesi (Zubr / Tomzn)', time: '30 daqiqa', price: "90 000 so'm" },
      { service: 'Avtomat uzgich (avtomat) yangilash', time: '20 daqiqa', price: "50 000 so'm" }
    ],
    reviews: [
      { author: 'Sanjar Mahmudov', date: '6-noyabr, 2026', rating: 5, district: 'Chilonzor', text: 'Mehmonxonaga yashirin LED profil va lenta o‘rnatib berdi. Natijadan mamnunmiz.' }
    ]
  },
  {
    id: 3,
    status: 'free',
    name: 'Baxtiyor Saidov',
    initials: 'BS',
    profession: 'Konditsioner montaji va xizmati',
    categoryId: 'konditsioner',
    district: 'Chilonzor',
    districtsServed: ['Chilonzor', 'Yakkasaroy', 'Uchtepa'],
    experience: 9,
    rating: 4.8,
    reviewsCount: 94,
    completedOrders: 380,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    bio: "Konditsionerlarni qishki va yozgi mavsumga tayyorlash, freon gaz quyish, kimyoviy dori bilan yuvish va platalarni sozlash mutaxassisi.",
    popularServices: [
      { name: 'Antibakterial yuvish', price: "110 000 so'm" },
      { name: 'Freon to‘ldirish (R410A)', price: "170 000 so'm" },
      { name: 'Konditsioner montaji', price: "340 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Konditsioner yuvish', time: '40 daqiqa', price: "110 000 so'm" },
      { service: 'Freon gaz quyish', time: '30 daqiqa', price: "170 000 so'm" }
    ],
    reviews: [
      { author: 'Lobar Karimova', date: '1-noyabr, 2026', rating: 5, district: 'Chilonzor', text: 'Konditsionerni zo‘r qilib yuvib berdi, hamma hidi ketdi.' }
    ]
  },
  {
    id: 4,
    status: 'free',
    name: 'Sherzod Rahimov',
    initials: 'SR',
    profession: 'Mebel ustasi va yig‘uvchi',
    categoryId: 'mebel',
    district: 'Chilonzor',
    districtsServed: ['Chilonzor', 'Uchtepa', 'Yakkasaroy'],
    experience: 6,
    rating: 4.8,
    reviewsCount: 76,
    completedOrders: 290,
    urgent: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: "Oshxona mebellari, shkaf-kupe, bolalar mebellarini yig‘ish va o‘rnatish. Mebel eshiklari ilmoqlarini sozlash.",
    popularServices: [
      { name: 'Shkaf-kupe montaji', price: "190 000 so'm" },
      { name: 'Oshxona mebeli ilish', price: "240 000 so'm/m" },
      { name: 'Eshik ilmoqlarini sozlash', price: "50 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Shkaf-kupe yig‘ish', time: '3 soat', price: "190 000 so'm" }
    ],
    reviews: [
      { author: 'Anvar Zokirov', date: '25-oktyabr, 2026', rating: 5, district: 'Chilonzor', text: 'Yangi mebelni juda aniq va tekis yig‘ib berdi.' }
    ]
  },

  // --- YUNUSOBOD TUMANI ---
  {
    id: 5,
    status: 'free',
    name: 'Bobur Alimov',
    initials: 'BA',
    profession: 'Konditsioner ustasi (Iqlim mutaxassisi)',
    categoryId: 'konditsioner',
    district: 'Yunusobod',
    districtsServed: ['Yunusobod', 'Mirzo Ulug‘bek', 'Olmazor'],
    experience: 7,
    rating: 4.9,
    reviewsCount: 115,
    completedOrders: 420,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=400&q=80',
    bio: "Konditsionerlarni ta'mirlash, montaj va demontaj qilish, R410A / R22 freon quyish hamda maxsus dori bilan yuvish.",
    popularServices: [
      { name: 'Freon quyish (R410A)', price: "180 000 so'm" },
      { name: 'Antibakterial tozalash', price: "120 000 so'm" },
      { name: 'Konditsioner montaji', price: "350 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Freon to‘ldirish', time: '30 daqiqa', price: "180 000 so'm" }
    ],
    reviews: [
      { author: 'Jamoliddin Sh', date: '14-oktyabr, 2026', rating: 5, district: 'Yunusobod', text: 'Konditsioner muzday sovutyapti, noxush hidlar ham yo‘qoldi.' }
    ]
  },
  {
    id: 6,
    status: 'busy',
    name: 'Mansur Qosimov',
    initials: 'MQ',
    profession: 'Professional usta elektrik',
    categoryId: 'elektrik',
    district: 'Yunusobod',
    districtsServed: ['Yunusobod', 'Mirzo Ulug‘bek', 'Olmazor'],
    experience: 10,
    rating: 5.0,
    reviewsCount: 160,
    completedOrders: 620,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    bio: "Yunusobod tumanida 10 yillik tajribali elektrik. Elektr shitlari, lyustra montaji, kuchlanish o‘zgarishidan himoya vositalari montaji.",
    popularServices: [
      { name: 'Elektr shiti yig‘ish', price: "240 000 so'm" },
      { name: 'Rozetka montaji', price: "35 000 so'm" },
      { name: 'Qisqa tutashuvni tuzatish', price: "110 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Elektr shiti montaji', time: '2 soat', price: "240 000 so'm" }
    ],
    reviews: [
      { author: 'Dilshod B', date: '9-noyabr, 2026', rating: 5, district: 'Yunusobod', text: 'Avtomatlarni tezda almashtirib, tokni tikladi.' }
    ]
  },
  {
    id: 7,
    status: 'free',
    name: 'Alisher Nurmatov',
    initials: 'AN',
    profession: 'Santexnik va quvurlar ustasi',
    categoryId: 'santexnik',
    district: 'Yunusobod',
    districtsServed: ['Yunusobod', 'Olmazor', 'Shayxontohur'],
    experience: 8,
    rating: 4.8,
    reviewsCount: 102,
    completedOrders: 410,
    urgent: false,
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    bio: "Quvur yorilishi, tiqilishlar, vanna, unitaz va isitish batareyalarini almashtirish bo‘yicha ishonchli mutaxassis.",
    popularServices: [
      { name: 'Tiqilishni ochish', price: "95 000 so'm" },
      { name: 'Smesitel o‘rnatish', price: "75 000 so'm" },
      { name: 'Suv filtri o‘rnatish', price: "120 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Kran almashtirish', time: '30 daqiqa', price: "75 000 so'm" }
    ],
    reviews: [
      { author: 'Sirojiddin M', date: '3-noyabr, 2026', rating: 5, district: 'Yunusobod', text: 'Oshxona kranini 20 daqiqada sifatli yangilab berdi.' }
    ]
  },
  {
    id: 8,
    status: 'free',
    name: 'Rustam Mirzayev',
    initials: 'RM',
    profession: 'Maishiy texnika (kir yuvish/muzlatgich)',
    categoryId: 'maishiy',
    district: 'Yunusobod',
    districtsServed: ['Yunusobod', 'Mirzo Ulug‘bek'],
    experience: 11,
    rating: 4.9,
    reviewsCount: 145,
    completedOrders: 580,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: "Avtomat kir yuvish mashinalari (Samsung, LG, Artel) va muzlatgichlarni joyida kafolat bilan ta'mirlash.",
    popularServices: [
      { name: 'Kir yuvish nasosi almashtirish', price: "135 000 so'm" },
      { name: 'TEN isitgich yangilash', price: "140 000 so'm" },
      { name: 'Muzlatgich freon quyish', price: "160 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Diagnostika', time: '20 daqiqa', price: "Bepul" }
    ],
    reviews: [
      { author: 'Nigora A', date: '11-noyabr, 2026', rating: 5, district: 'Yunusobod', text: 'Kir yuvish mashinasi suv to‘kmayotgandi, nasosini tezda tuzatdi.' }
    ]
  },

  // --- MIRZO ULUG‘BEK TUMANI ---
  {
    id: 9,
    status: 'free',
    name: 'Sardor Toshmatov',
    initials: 'ST',
    profession: 'Elektrik va avtomatika muhandisi',
    categoryId: 'elektrik',
    district: 'Mirzo Ulug‘bek',
    districtsServed: ['Mirzo Ulug‘bek', 'Yunusobod', 'Yashnobod'],
    experience: 11,
    rating: 5.0,
    reviewsCount: 198,
    completedOrders: 780,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80',
    bio: "11 yillik tajribaga ega 4-darajali professional elektrik. Elektr shitlari, kuchlanish releylari va qisqa tutashuvlarni tezkor bartaraf qilish.",
    popularServices: [
      { name: 'Rozetka va vikluchatel montaji', price: "40 000 so'm" },
      { name: 'Katta lyustra o‘rnatish', price: "90 000 so'm" },
      { name: 'Elektr shiti va avtomatlar', price: "250 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Rozetka montaji', time: '15 daqiqa', price: "40 000 so'm" }
    ],
    reviews: [
      { author: 'Rustam Karimov', date: '10-noyabr, 2026', rating: 5, district: 'Mirzo Ulug‘bek', text: 'Kuygan simlarni maxsus asbob bilan topib to‘g‘riladi. Haqiqiy usta!' }
    ]
  },
  {
    id: 10,
    status: 'free',
    name: 'Farhod Fayzullayev',
    initials: 'FF',
    profession: 'Santexnik va isitish batareyalari',
    categoryId: 'santexnik',
    district: 'Mirzo Ulug‘bek',
    districtsServed: ['Mirzo Ulug‘bek', 'Yashnobod', 'Mirobod'],
    experience: 9,
    rating: 4.9,
    reviewsCount: 130,
    completedOrders: 490,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    bio: "Suv sizib chiqishini aniqlash, smesitel, kran, dush trap va quvurlar almashtirish.",
    popularServices: [
      { name: 'Kran almashtirish', price: "80 000 so'm" },
      { name: 'Unitaz o‘rnatish', price: "160 000 so'm" },
      { name: 'Quvur kavsharlash (payka)', price: "120 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Unitaz montaji', time: '1 soat', price: "160 000 so'm" }
    ],
    reviews: [
      { author: 'Otabek T', date: '7-noyabr, 2026', rating: 5, district: 'Mirzo Ulug‘bek', text: 'Vanna kranini sifatli o‘rnatib berdi.' }
    ]
  },
  {
    id: 11,
    status: 'busy',
    name: 'Umidjon Vohidov',
    initials: 'UV',
    profession: 'Konditsioner montaji va ta’miri',
    categoryId: 'konditsioner',
    district: 'Mirzo Ulug‘bek',
    districtsServed: ['Mirzo Ulug‘bek', 'Yunusobod'],
    experience: 7,
    rating: 4.8,
    reviewsCount: 88,
    completedOrders: 320,
    urgent: false,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bio: "Konditsionerlarni devorga ilish, truba tortish, freon to‘ldirish va dori bilan yuvish.",
    popularServices: [
      { name: 'Freon R410A quyish', price: "175 000 so'm" },
      { name: 'Konditsionerni yuvish', price: "115 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Konditsioner yuvish', time: '45 daqiqa', price: "115 000 so'm" }
    ],
    reviews: [
      { author: 'Malika R', date: '29-oktyabr, 2026', rating: 5, district: 'Mirzo Ulug‘bek', text: 'Konditsionerni toza qilib yuvdi, juda yaxshi usta.' }
    ]
  },
  {
    id: 12,
    status: 'free',
    name: 'Nodir Karimov',
    initials: 'NK',
    profession: 'Universal bir soatlik usta',
    categoryId: 'universal',
    district: 'Mirzo Ulug‘bek',
    districtsServed: ['Mirzo Ulug‘bek', 'Yashnobod'],
    experience: 5,
    rating: 4.7,
    reviewsCount: 92,
    completedOrders: 360,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=400&q=80',
    bio: "Televizor ilish, korniz montaji, qulf almashtirish, polkalar osish kabi barcha mayda xonadon ta'mirlari.",
    popularServices: [
      { name: 'Televizor kronshteyni', price: "70 000 so'm" },
      { name: 'Parda kornizi ilish', price: "80 000 so'm" },
      { name: 'Eshik qulfini yangilash', price: "90 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Televizor montaji', time: '30 daqiqa', price: "70 000 so'm" }
    ],
    reviews: [
      { author: 'Farhod B', date: '4-noyabr, 2026', rating: 5, district: 'Mirzo Ulug‘bek', text: 'Katta televizorni devorga juda mustahkam ilib berdi.' }
    ]
  },

  // --- YAKKASAROY TUMANI ---
  {
    id: 13,
    status: 'free',
    name: 'Jasur Qodirov',
    initials: 'JQ',
    profession: 'Maishiy texnika mutaxassisi',
    categoryId: 'maishiy',
    district: 'Yakkasaroy',
    districtsServed: ['Yakkasaroy', 'Mirobod', 'Chilonzor'],
    experience: 9,
    rating: 4.8,
    reviewsCount: 167,
    completedOrders: 610,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: "Avtomat kir yuvish mashinalari, quritgichlar va muzlatgichlarni uyingizda tezkor ta'mirlash. Original ehtiyot qismlar.",
    popularServices: [
      { name: 'Kir yuvish nasosini yangilash', price: "130 000 so'm" },
      { name: 'Isitgich (TEN) almashtirish', price: "140 000 so'm" },
      { name: 'Muzlatgich termostati', price: "150 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Nasos montaji', time: '40 daqiqa', price: "130 000 so'm" }
    ],
    reviews: [
      { author: 'Dilorom Rahimova', date: '8-noyabr, 2026', rating: 5, district: 'Yakkasaroy', text: 'Kir yuvish mashinamni tezda tuzatib berdi.' }
    ]
  },
  {
    id: 14,
    status: 'free',
    name: 'Elyor Jo‘rayev',
    initials: 'EJ',
    profession: 'Santexnik va kanalizatsiya ustasi',
    categoryId: 'santexnik',
    district: 'Yakkasaroy',
    districtsServed: ['Yakkasaroy', 'Mirobod', 'Chilonzor'],
    experience: 8,
    rating: 4.9,
    reviewsCount: 114,
    completedOrders: 430,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
    bio: "Kanalizatsiya tiqilishlarini ochish, quvurlarni almashtirish va vanna montaji.",
    popularServices: [
      { name: 'Quvurdagi tiqilishni ochish', price: "90 000 so'm" },
      { name: 'Kran ta’mirlash', price: "70 000 so'm" },
      { name: 'Dush smesiteli montaji', price: "80 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Tiqilishni ochish', time: '30 daqiqa', price: "90 000 so'm" }
    ],
    reviews: [
      { author: 'Aziz Q', date: '2-noyabr, 2026', rating: 5, district: 'Yakkasaroy', text: 'Tiqilib qolgan quvurni maxsus uskunada 15 daqiqada ochdi.' }
    ]
  },
  {
    id: 15,
    status: 'busy',
    name: 'Doniyor Sobirov',
    initials: 'DS',
    profession: 'Elektrik va yoritish montaji',
    categoryId: 'elektrik',
    district: 'Yakkasaroy',
    districtsServed: ['Yakkasaroy', 'Mirobod'],
    experience: 7,
    rating: 4.8,
    reviewsCount: 85,
    completedOrders: 310,
    urgent: false,
    avatar: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=400&q=80',
    bio: "Kvartiralarda sim tortish, rozetkalar, lyustralar va bra chiroqlarini o‘rnatish.",
    popularServices: [
      { name: 'Rozetka o‘rnatish', price: "35 000 so'm" },
      { name: 'Lyustra montaji', price: "85 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Lyustra montaji', time: '40 daqiqa', price: "85 000 so'm" }
    ],
    reviews: [
      { author: 'Shaxnoza K', date: '1-noyabr, 2026', rating: 5, district: 'Yakkasaroy', text: 'Chiroqlarni chiroyli qilib o‘rnatib berdilar.' }
    ]
  },
  {
    id: 16,
    status: 'free',
    name: 'Azizbek Shukurov',
    initials: 'AS',
    profession: 'Mebel yig‘ish va o‘rnatish',
    categoryId: 'mebel',
    district: 'Yakkasaroy',
    districtsServed: ['Yakkasaroy', 'Chilonzor'],
    experience: 6,
    rating: 4.7,
    reviewsCount: 65,
    completedOrders: 250,
    urgent: false,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: "Shkaf-kupe, oshxona, stol-stul yig‘ish. Furnituralarni sozlash.",
    popularServices: [
      { name: 'Shkaf yig‘ish', price: "180 000 so'm" },
      { name: 'Kravat yig‘ish', price: "120 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Shkaf yig‘ish', time: '2 soat', price: "180 000 so'm" }
    ],
    reviews: [
      { author: 'Javohir E', date: '28-oktyabr, 2026', rating: 5, district: 'Yakkasaroy', text: 'Yotoqxona mebelini sifatli yig‘di.' }
    ]
  },

  // --- SHAYXONTOHUR TUMANI ---
  {
    id: 17,
    status: 'free',
    name: 'Dilshodbek Rahimov',
    initials: 'DR',
    profession: 'Mebel yig‘uvchi professional usta',
    categoryId: 'mebel',
    district: 'Shayxontohur',
    districtsServed: ['Shayxontohur', 'Olmazor', 'Chilonzor'],
    experience: 6,
    rating: 4.9,
    reviewsCount: 89,
    completedOrders: 310,
    urgent: false,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bio: "Har qanday turdagi mebellarni chizmasi bo‘yicha sifatli yig‘ish: shkaf-kupe, oshxona mebellari, ikki qavatli kravatlar.",
    popularServices: [
      { name: 'Shkaf-kupe yig‘ish', price: "180 000 so'm" },
      { name: 'Oshxona mebeli montaji', price: "250 000 so'm/m" },
      { name: 'Mebel eshiklarini sozlash', price: "60 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Shkaf montaji', time: '2 soat', price: "180 000 so'm" }
    ],
    reviews: [
      { author: 'Shaxboz Ergashov', date: '1-noyabr, 2026', rating: 5, district: 'Shayxontohur', text: 'Ehtiyotkorlik bilan chiroyli qilib yig‘ib berdilar.' }
    ]
  },
  {
    id: 18,
    status: 'free',
    name: 'Shavkat Ismoilov',
    initials: 'SI',
    profession: 'Santexnik va isitish qozoni ustasi',
    categoryId: 'santexnik',
    district: 'Shayxontohur',
    districtsServed: ['Shayxontohur', 'Olmazor', 'Uchtepa'],
    experience: 11,
    rating: 4.9,
    reviewsCount: 140,
    completedOrders: 540,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    bio: "Isitish qozonlari (kotyol) va quvurlar bo‘yicha 11 yillik tajriba. Avariya chaqiruvlariga tezkor yetib borish.",
    popularServices: [
      { name: 'Kotyol ta’miri', price: "200 000 so'm" },
      { name: 'Smesitel almashtirish', price: "80 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Kotyol profilaktikasi', time: '1.5 soat', price: "200 000 so'm" }
    ],
    reviews: [
      { author: 'Ravshan K', date: '10-noyabr, 2026', rating: 5, district: 'Shayxontohur', text: 'Kotyolimizni nosozligini tezda topib to‘g‘riladi.' }
    ]
  },
  {
    id: 19,
    status: 'free',
    name: 'Olimjon Hotamov',
    initials: 'OH',
    profession: 'Elektrik va montaj mutaxassisi',
    categoryId: 'elektrik',
    district: 'Shayxontohur',
    districtsServed: ['Shayxontohur', 'Chilonzor'],
    experience: 8,
    rating: 4.8,
    reviewsCount: 95,
    completedOrders: 370,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    bio: "Shit yig‘ish, avtomatlarni yangilash va qisqa tutashuvlarni bartaraf etish.",
    popularServices: [
      { name: 'Avtomat yangilash', price: "45 000 so'm" },
      { name: 'Lyustra montaji', price: "85 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Avtomat montaji', time: '20 daqiqa', price: "45 000 so'm" }
    ],
    reviews: [
      { author: 'Sobir T', date: '30-oktyabr, 2026', rating: 5, district: 'Shayxontohur', text: 'Avtomatlarni sozlab, xavfsiz holatga keltirdi.' }
    ]
  },
  {
    id: 20,
    status: 'busy',
    name: 'Javlon Yo‘ldoshev',
    initials: 'JY',
    profession: 'Bir soatlik usta va mayda ta’mir',
    categoryId: 'universal',
    district: 'Shayxontohur',
    districtsServed: ['Shayxontohur', 'Olmazor'],
    experience: 5,
    rating: 4.7,
    reviewsCount: 78,
    completedOrders: 280,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
    bio: "Televizor ilish, korniz montaji, qulf almashtirish va javonlar o‘rnatish.",
    popularServices: [
      { name: 'Televizor ilish', price: "70 000 so'm" },
      { name: 'Korniz o‘rnatish', price: "80 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Korniz montaji', time: '30 daqiqa', price: "80 000 so'm" }
    ],
    reviews: [
      { author: 'Mahliyo S', date: '5-noyabr, 2026', rating: 5, district: 'Shayxontohur', text: 'Parda kornizini mustahkam o‘rnatib berdi.' }
    ]
  },

  // --- SERGELI TUMANI ---
  {
    id: 21,
    status: 'free',
    name: 'Otabek Nazarov',
    initials: 'ON',
    profession: 'Universal bir soatlik usta',
    categoryId: 'universal',
    district: 'Sergeli',
    districtsServed: ['Sergeli', 'Yangi Hayot', 'Yakkasaroy'],
    experience: 5,
    rating: 4.8,
    reviewsCount: 134,
    completedOrders: 490,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    bio: "Televizorni devorga kronshteynda o‘rnatish, parda kornizlari, polkalar, rasmlar, ko‘zgular osish, eshik qulfini almashtirish.",
    popularServices: [
      { name: 'Televizor kronshteyni', price: "70 000 so'm" },
      { name: 'Eshik qulfini yangilash', price: "90 000 so'm" },
      { name: 'Parda kornizi montaji', price: "80 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Televizor ilish', time: '30 daqiqa', price: "70 000 so'm" }
    ],
    reviews: [
      { author: 'Kamola Karimova', date: '11-noyabr, 2026', rating: 5, district: 'Sergeli', text: 'Barcha korniz va televizorlarni tekis qilib bitirib berdi.' }
    ]
  },
  {
    id: 22,
    status: 'free',
    name: 'Sanjarbek Ergashev',
    initials: 'SE',
    profession: 'Santexnik mutaxassis',
    categoryId: 'santexnik',
    district: 'Sergeli',
    districtsServed: ['Sergeli', 'Yangi Hayot'],
    experience: 7,
    rating: 4.9,
    reviewsCount: 98,
    completedOrders: 360,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1519085186259-b131cd64d1f5?auto=format&fit=crop&w=400&q=80',
    bio: "Yangi uylarda santexnika montaji, kranlar, unitaz va vanna o‘rnatish.",
    popularServices: [
      { name: 'Kran o‘rnatish', price: "75 000 so'm" },
      { name: 'Unitaz montaji', price: "150 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Unitaz montaji', time: '1 soat', price: "150 000 so'm" }
    ],
    reviews: [
      { author: 'Umar B', date: '6-noyabr, 2026', rating: 5, district: 'Sergeli', text: 'Yangi uyimizdagi hamma kranlarni ulab berdi.' }
    ]
  },
  {
    id: 23,
    status: 'busy',
    name: 'Bexruz Davronov',
    initials: 'BD',
    profession: 'Elektrik va avtomatika',
    categoryId: 'elektrik',
    district: 'Sergeli',
    districtsServed: ['Sergeli', 'Yangi Hayot'],
    experience: 8,
    rating: 4.8,
    reviewsCount: 86,
    completedOrders: 330,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: "Elektr tarmog‘ini noldan tortish, lyustra va avtomatlarni montaj qilish.",
    popularServices: [
      { name: 'Rozetka montaji', price: "35 000 so'm" },
      { name: 'Lyustra ilish', price: "80 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Rozetka o‘rnatish', time: '15 daqiqa', price: "35 000 so'm" }
    ],
    reviews: [
      { author: 'Ziyoda M', date: '2-noyabr, 2026', rating: 5, district: 'Sergeli', text: 'Chiroqlarni chiroyli qilib o‘rnatdi.' }
    ]
  },
  {
    id: 24,
    status: 'free',
    name: 'Temur Meliyev',
    initials: 'TM',
    profession: 'Maishiy texnika ta’miri',
    categoryId: 'maishiy',
    district: 'Sergeli',
    districtsServed: ['Sergeli', 'Yakkasaroy'],
    experience: 9,
    rating: 4.8,
    reviewsCount: 110,
    completedOrders: 420,
    urgent: false,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    bio: "Kir yuvish mashinalari, muzlatgich va mikroto‘lqinli pechlar ta'miri.",
    popularServices: [
      { name: 'Kir yuvish mashinasi ta’miri', price: "120 000 so'm" },
      { name: 'Muzlatgich freon quyish', price: "160 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Nasos almashtirish', time: '40 daqiqa', price: "120 000 so'm" }
    ],
    reviews: [
      { author: 'Ilhom T', date: '27-oktyabr, 2026', rating: 5, district: 'Sergeli', text: 'Muzlatgichni freonini to‘ldirib berdi, yaxshi sovutyapti.' }
    ]
  },

  // --- OLMAZOR TUMANI ---
  {
    id: 25,
    status: 'free',
    name: 'Farrux Yusupov',
    initials: 'FY',
    profession: 'Kotyol va santexnika muhandisi',
    categoryId: 'santexnik',
    district: 'Olmazor',
    districtsServed: ['Olmazor', 'Shayxontohur', 'Yunusobod'],
    experience: 12,
    rating: 4.9,
    reviewsCount: 178,
    completedOrders: 650,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
    bio: "Ikki konturli isitish qozonlari (Navien, Baxi, Immergas) va issiq pol tizimlari ta'miri va montaji.",
    popularServices: [
      { name: 'Kotyol sozlash', price: "200 000 so'm" },
      { name: 'Suv filtri o‘rnatish', price: "120 000 so'm" },
      { name: 'Smesitel almashtirish', price: "75 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Kotyol profilaktikasi', time: '1.5 soat', price: "200 000 so'm" }
    ],
    reviews: [
      { author: 'Bekzod Tursunov', date: '9-noyabr, 2026', rating: 5, district: 'Olmazor', text: 'Kotyolimizni nosozligini tezda to‘g‘riladi, uylarimiz issiq.' }
    ]
  },
  {
    id: 26,
    status: 'free',
    name: 'Anvar To‘rayev',
    initials: 'AT',
    profession: 'Elektrik va montajchi',
    categoryId: 'elektrik',
    district: 'Olmazor',
    districtsServed: ['Olmazor', 'Shayxontohur'],
    experience: 8,
    rating: 4.8,
    reviewsCount: 104,
    completedOrders: 390,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80',
    bio: "Avtomatlar, lyustralar, rozetka va elektr shitlarini montaj qilish.",
    popularServices: [
      { name: 'Elektr shiti montaji', price: "220 000 so'm" },
      { name: 'Rozetka o‘rnatish', price: "35 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Rozetka montaji', time: '15 daqiqa', price: "35 000 so'm" }
    ],
    reviews: [
      { author: 'Sardor A', date: '4-noyabr, 2026', rating: 5, district: 'Olmazor', text: 'Juda tez va sifatli ishladi.' }
    ]
  },
  {
    id: 27,
    status: 'free',
    name: 'Ulug‘bek Shokirov',
    initials: 'US',
    profession: 'Konditsioner mutaxassisi',
    categoryId: 'konditsioner',
    district: 'Olmazor',
    districtsServed: ['Olmazor', 'Yunusobod'],
    experience: 7,
    rating: 4.8,
    reviewsCount: 82,
    completedOrders: 310,
    urgent: false,
    avatar: 'https://images.unsplash.com/photo-1517256673644-36ad11246d21?auto=format&fit=crop&w=400&q=80',
    bio: "Konditsionerni dori bilan yuvish, freon to‘ldirish va yangi konditsioner montaji.",
    popularServices: [
      { name: 'Freon quyish', price: "170 000 so'm" },
      { name: 'Konditsioner yuvish', price: "110 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Freon to‘ldirish', time: '30 daqiqa', price: "170 000 so'm" }
    ],
    reviews: [
      { author: 'Mirjalol H', date: '26-oktyabr, 2026', rating: 5, district: 'Olmazor', text: 'Konditsioner juda yaxshi ishlayapti.' }
    ]
  },
  {
    id: 28,
    status: 'busy',
    name: 'Bobir Haydarov',
    initials: 'BH',
    profession: 'Mebel yig‘uvchi usta',
    categoryId: 'mebel',
    district: 'Olmazor',
    districtsServed: ['Olmazor', 'Shayxontohur'],
    experience: 6,
    rating: 4.7,
    reviewsCount: 71,
    completedOrders: 270,
    urgent: false,
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80',
    bio: "Shkaf, stol, kravat yig‘ish va eshik petlyalarini yangilash.",
    popularServices: [
      { name: 'Shkaf yig‘ish', price: "170 000 so'm" },
      { name: 'Eshik ilmoqlarini sozlash', price: "50 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Shkaf yig‘ish', time: '2 soat', price: "170 000 so'm" }
    ],
    reviews: [
      { author: 'Botir Q', date: '21-oktyabr, 2026', rating: 5, district: 'Olmazor', text: 'Yangi mebelni ehtiyotkorlik bilan yig‘di.' }
    ]
  },

  // --- UCHTEPA TUMANI ---
  {
    id: 29,
    status: 'free',
    name: 'Davron Abdullayev',
    initials: 'DA',
    profession: 'Santexnik va quvur ustasi',
    categoryId: 'santexnik',
    district: 'Uchtepa',
    districtsServed: ['Uchtepa', 'Chilonzor'],
    experience: 9,
    rating: 4.9,
    reviewsCount: 125,
    completedOrders: 470,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=400&q=80',
    bio: "Kran, smesitel, unitaz va quvur tiqilishlarini ochish bo‘yicha tajribali usta.",
    popularServices: [
      { name: 'Kran almashtirish', price: "75 000 so'm" },
      { name: 'Unitaz ta’miri', price: "140 000 so'm" },
      { name: 'Tiqilishni ochish', price: "90 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Kran almashtirish', time: '30 daqiqa', price: "75 000 so'm" }
    ],
    reviews: [
      { author: 'Shahnoza I', date: '8-noyabr, 2026', rating: 5, district: 'Uchtepa', text: 'Suv oqayotgan kranni tezda almashtirdi.' }
    ]
  },
  {
    id: 30,
    status: 'free',
    name: 'Ilhom Zokirov',
    initials: 'IZ',
    profession: 'Elektrik va avtomat uzgichlar',
    categoryId: 'elektrik',
    district: 'Uchtepa',
    districtsServed: ['Uchtepa', 'Chilonzor'],
    experience: 8,
    rating: 4.8,
    reviewsCount: 92,
    completedOrders: 350,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
    bio: "Rozetkalar, avtomat uzgichlar, lyustralar va qisqa tutashuvlarni bartaraf etish.",
    popularServices: [
      { name: 'Avtomat almashtirish', price: "40 000 so'm" },
      { name: 'Lyustra montaji', price: "80 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Avtomat montaji', time: '20 daqiqa', price: "40 000 so'm" }
    ],
    reviews: [
      { author: 'Jahongir N', date: '3-noyabr, 2026', rating: 5, district: 'Uchtepa', text: 'Yaxshi usta, tezda keldi va tuzatdi.' }
    ]
  },
  {
    id: 31,
    status: 'free',
    name: 'Shuhrat Qobilov',
    initials: 'SQ',
    profession: 'Bir soatlik usta (Mayda ta’mirlar)',
    categoryId: 'universal',
    district: 'Uchtepa',
    districtsServed: ['Uchtepa', 'Chilonzor'],
    experience: 6,
    rating: 4.8,
    reviewsCount: 80,
    completedOrders: 310,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    bio: "Televizor ilish, korniz montaji, qulf almashtirish va oyna osish.",
    popularServices: [
      { name: 'Televizor ilish', price: "65 000 so'm" },
      { name: 'Qulf almashtirish', price: "85 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Televizor montaji', time: '30 daqiqa', price: "65 000 so'm" }
    ],
    reviews: [
      { author: 'Munisa K', date: '28-oktyabr, 2026', rating: 5, district: 'Uchtepa', text: 'Eshik qulfini sifatli yangilab berdi.' }
    ]
  },
  {
    id: 32,
    status: 'busy',
    name: 'Hasan Karimov',
    initials: 'HK',
    profession: 'Maishiy texnika ta’miri',
    categoryId: 'maishiy',
    district: 'Uchtepa',
    districtsServed: ['Uchtepa', 'Chilonzor'],
    experience: 7,
    rating: 4.7,
    reviewsCount: 75,
    completedOrders: 290,
    urgent: false,
    avatar: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=400&q=80',
    bio: "Kir yuvish mashinalari va muzlatgichlarni uyingizda ta'mirlash.",
    popularServices: [
      { name: 'Kir yuvish mashinasi ta’miri', price: "125 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Nasos montaji', time: '40 daqiqa', price: "125 000 so'm" }
    ],
    reviews: [
      { author: 'Qobil R', date: '22-oktyabr, 2026', rating: 5, district: 'Uchtepa', text: 'Kir yuvish mashinasi yaxshi ishlayapti.' }
    ]
  },

  // --- MIROBOD TUMANI ---
  {
    id: 33,
    status: 'free',
    name: 'Botir Normatov',
    initials: 'BN',
    profession: 'Santexnik va vanna xonalari montaji',
    categoryId: 'santexnik',
    district: 'Mirobod',
    districtsServed: ['Mirobod', 'Yakkasaroy', 'Yashnobod'],
    experience: 10,
    rating: 5.0,
    reviewsCount: 155,
    completedOrders: 600,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    bio: "Dush kabinalari, vanna, unitaz montaji va suv sizishlarini yo‘qotish.",
    popularServices: [
      { name: 'Dush smesiteli montaji', price: "80 000 so'm" },
      { name: 'Unitaz montaji', price: "150 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Smesitel montaji', time: '30 daqiqa', price: "80 000 so'm" }
    ],
    reviews: [
      { author: 'Alisher O', date: '10-noyabr, 2026', rating: 5, district: 'Mirobod', text: 'Vanna xonasidagi hamma jihozlarni sifatli o‘rnatdi.' }
    ]
  },
  {
    id: 34,
    status: 'free',
    name: 'Xurshid Aliyev',
    initials: 'XA',
    profession: 'Elektrik va yoritish tizimlari',
    categoryId: 'elektrik',
    district: 'Mirobod',
    districtsServed: ['Mirobod', 'Yakkasaroy'],
    experience: 9,
    rating: 4.9,
    reviewsCount: 130,
    completedOrders: 510,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=400&q=80',
    bio: "Elektr shitlari, LED tizimlar, stabilizator va kuchlanish relesi montaji.",
    popularServices: [
      { name: 'Kuchlanish relesi', price: "90 000 so'm" },
      { name: 'Lyustra montaji', price: "90 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Rele montaji', time: '30 daqiqa', price: "90 000 so'm" }
    ],
    reviews: [
      { author: 'Elena Kim', date: '2-noyabr, 2026', rating: 5, district: 'Mirobod', text: 'Lyustralarni juda chiroyli va toza qilib o‘rnatib berdilar.' }
    ]
  },
  {
    id: 35,
    status: 'free',
    name: 'Rustambek Usmonov',
    initials: 'RU',
    profession: 'Konditsioner montaji va freon',
    categoryId: 'konditsioner',
    district: 'Mirobod',
    districtsServed: ['Mirobod', 'Yakkasaroy'],
    experience: 8,
    rating: 4.8,
    reviewsCount: 90,
    completedOrders: 340,
    urgent: false,
    avatar: 'https://images.unsplash.com/photo-1519764622345-23439dd774f7?auto=format&fit=crop&w=400&q=80',
    bio: "Konditsioner yuvish, freon quyish va ta'mirlash.",
    popularServices: [
      { name: 'Freon to‘ldirish', price: "180 000 so'm" },
      { name: 'Konditsioner yuvish', price: "120 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Konditsioner yuvish', time: '40 daqiqa', price: "120 000 so'm" }
    ],
    reviews: [
      { author: 'Timur S', date: '29-oktyabr, 2026', rating: 5, district: 'Mirobod', text: 'Konditsionerni zo‘r qilib yuvib berdi.' }
    ]
  },
  {
    id: 36,
    status: 'busy',
    name: 'Sardorbek Ikromov',
    initials: 'SI',
    profession: 'Mebel yig‘ish mutaxassisi',
    categoryId: 'mebel',
    district: 'Mirobod',
    districtsServed: ['Mirobod', 'Yashnobod'],
    experience: 7,
    rating: 4.8,
    reviewsCount: 84,
    completedOrders: 320,
    urgent: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bio: "Oshxona garnituri va shkaf-kupe yig‘ish va sozlash.",
    popularServices: [
      { name: 'Shkaf-kupe montaji', price: "200 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Shkaf montaji', time: '2.5 soat', price: "200 000 so'm" }
    ],
    reviews: [
      { author: 'Madina X', date: '24-oktyabr, 2026', rating: 5, district: 'Mirobod', text: 'Shkafni chiroyli qilib yig‘di.' }
    ]
  },

  // --- YASHNOBOD TUMANI ---
  {
    id: 37,
    status: 'free',
    name: 'Kamoliddin Po‘latov',
    initials: 'KP',
    profession: 'Santexnik mutaxassis',
    categoryId: 'santexnik',
    district: 'Yashnobod',
    districtsServed: ['Yashnobod', 'Mirzo Ulug‘bek', 'Mirobod'],
    experience: 8,
    rating: 4.9,
    reviewsCount: 112,
    completedOrders: 440,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: "Kran, smesitel, unitaz va isitish batareyalari ta'miri va montaji.",
    popularServices: [
      { name: 'Kran almashtirish', price: "75 000 so'm" },
      { name: 'Unitaz montaji', price: "150 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Kran montaji', time: '30 daqiqa', price: "75 000 so'm" }
    ],
    reviews: [
      { author: 'Bobur K', date: '9-noyabr, 2026', rating: 5, district: 'Yashnobod', text: 'Suv sizayotgan joyni tezda tuzatdi.' }
    ]
  },
  {
    id: 38,
    status: 'free',
    name: 'Jahongir Mirzayev',
    initials: 'JM',
    profession: 'Elektrik va avtomat uzgichlar',
    categoryId: 'elektrik',
    district: 'Yashnobod',
    districtsServed: ['Yashnobod', 'Mirzo Ulug‘bek'],
    experience: 9,
    rating: 4.8,
    reviewsCount: 120,
    completedOrders: 460,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1562788869-4ed32648eb72?auto=format&fit=crop&w=400&q=80',
    bio: "Elektr shitlari, avtomatlar, rozetka va qisqa tutashuvlarni tuzatish.",
    popularServices: [
      { name: 'Rozetka montaji', price: "35 000 so'm" },
      { name: 'Lyustra montaji', price: "85 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Rozetka montaji', time: '15 daqiqa', price: "35 000 so'm" }
    ],
    reviews: [
      { author: 'Nodira F', date: '5-noyabr, 2026', rating: 5, district: 'Yashnobod', text: 'Katta lyustrani tekis va mustahkam ilib berdi.' }
    ]
  },
  {
    id: 39,
    status: 'free',
    name: 'Muzaffar Tojiyev',
    initials: 'MT',
    profession: 'Maishiy texnika ta’miri',
    categoryId: 'maishiy',
    district: 'Yashnobod',
    districtsServed: ['Yashnobod', 'Mirobod'],
    experience: 8,
    rating: 4.8,
    reviewsCount: 88,
    completedOrders: 330,
    urgent: false,
    avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&w=400&q=80',
    bio: "Kir yuvish mashinalari, muzlatgich va boshqa maishiy texnika ta'miri.",
    popularServices: [
      { name: 'Kir yuvish mashinasi ta’miri', price: "130 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Diagnostika', time: '20 daqiqa', price: "Bepul" }
    ],
    reviews: [
      { author: 'Sanjar T', date: '31-oktyabr, 2026', rating: 5, district: 'Yashnobod', text: 'Kir yuvish mashinasini tezda sozlab berdi.' }
    ]
  },
  {
    id: 40,
    status: 'free',
    name: 'Zafar Ahmedov',
    initials: 'ZA',
    profession: 'Universal bir soatlik usta',
    categoryId: 'universal',
    district: 'Yashnobod',
    districtsServed: ['Yashnobod', 'Mirobod'],
    experience: 6,
    rating: 4.7,
    reviewsCount: 79,
    completedOrders: 290,
    urgent: true,
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    bio: "Televizor ilish, korniz montaji, qulf almashtirish, oyna va rasmlar osish.",
    popularServices: [
      { name: 'Televizor kronshteyni', price: "70 000 so'm" },
      { name: 'Parda kornizi ilish', price: "80 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Televizor ilish', time: '30 daqiqa', price: "70 000 so'm" }
    ],
    reviews: [
      { author: 'Gulnoza M', date: '27-oktyabr, 2026', rating: 5, district: 'Yashnobod', text: 'Parda kornizini chiroyli o‘rnatib berdilar.' }
    ]
  }
];

const PRICING_BENCHMARK = [
  {
    category: 'Santexnika ishlari',
    icon: 'wrench',
    description: 'Barcha turdagi quvur, jo‘mrak va kanalizatsiya xizmatlari',
    items: [
      { name: 'Kran va smesitel almashtirish', range: '60 000 - 100 000 so‘m' },
      { name: 'Unitaz montaji va ulash', range: '130 000 - 200 000 so‘m' },
      { name: 'Kanalizatsiya tiqilishini ochish', range: '80 000 - 150 000 so‘m' },
      { name: 'Dush kabinasi yoki vanna montaji', range: '250 000 - 450 000 so‘m' },
      { name: 'Suv hisoblagich (schetchik) o‘rnatish', range: '70 000 - 120 000 so‘m' }
    ]
  },
  {
    category: 'Elektr montaj ishlari',
    icon: 'zap',
    description: 'Xavfsiz elektr tarmog‘i, shitlar va yoritish tizimlari',
    items: [
      { name: 'Rozetka va vikluchatel montaji', range: '35 000 - 55 000 so‘m' },
      { name: 'Lyustra va shift chiroqlari montaji', range: '70 000 - 150 000 so‘m' },
      { name: 'Elektr shiti va avtomatika yig‘ish', range: '200 000 - 400 000 so‘m' },
      { name: 'Qisqa tutashuvni aniqlash va tuzatish', range: '100 000 - 180 000 so‘m' },
      { name: 'Kuchlanish relesi (stabilizator)', range: '80 000 - 130 000 so‘m' }
    ]
  },
  {
    category: 'Iqlim va konditsioner',
    icon: 'wind',
    description: 'Yozgi va qishki mavsumga tayyorlash hamda montaj',
    items: [
      { name: 'Konditsionerni kimyoviy tozalash', range: '100 000 - 150 000 so‘m' },
      { name: 'Freon gaz quyish (R410/R22)', range: '150 000 - 250 000 so‘m' },
      { name: 'Standart konditsioner montaji', range: '300 000 - 450 000 so‘m' },
      { name: 'Konditsionerni xavfsiz demontaj qilish', range: '120 000 - 180 000 so‘m' }
    ]
  },
  {
    category: 'Maishiy texnika ta’miri',
    icon: 'cpu',
    description: 'Kir yuvish, muzlatgich va gaz plitalarini uyingizda ta’mirlash',
    items: [
      { name: 'Kir yuvish mashinasi diagnostikasi', range: 'Bepul / 50 000 so‘m' },
      { name: 'Suv nasosi (pompa) almashtirish', range: '120 000 - 180 000 so‘m' },
      { name: 'Kir yuvish mashinasi TEN almashtirish', range: '130 000 - 190 000 so‘m' },
      { name: 'Muzlatgich freon quyish', range: '150 000 - 250 000 so‘m' }
    ]
  },
  {
    category: 'Mebel yig‘ish va sozlash',
    icon: 'hammer',
    description: 'Yangi mebellarni chizma bo‘yicha toza yig‘ish va o‘rnatish',
    items: [
      { name: 'Shkaf-kupe yig‘ish', range: '150 000 - 250 000 so‘m' },
      { name: 'Oshxona garnituri montaji (metriga)', range: '200 000 - 300 000 so‘m' },
      { name: 'Krovat va divan yig‘ish', range: '100 000 - 160 000 so‘m' },
      { name: 'Eshik ilmoqlari va furniturani sozlash', range: '50 000 - 90 000 so‘m' }
    ]
  },
  {
    category: 'Bir soatlik usta xizmatlari',
    icon: 'tool',
    description: 'Devorga televizor, korniz, polkalar ilish va mayda ta’mir',
    items: [
      { name: 'Televizor kronshteyni montaji', range: '60 000 - 90 000 so‘m' },
      { name: 'Parda kornizi o‘rnatish', range: '70 000 - 100 000 so‘m' },
      { name: 'Eshik qulfi yoki tutqich almashtirish', range: '80 000 - 130 000 so‘m' },
      { name: 'Ko‘zgu, kartina, javonlar osish', range: '40 000 - 80 000 so‘m' }
    ]
  }
];

const TESTIMONIALS = [
  {
    name: 'Nodirbek Sobirov',
    role: 'Xonadon egasi, Chilonzor',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Oshxonada quvur yorilib ketganda juda vahima bo‘ldi. Usta-Top orqali Akmal ustani topdik, sayt orqali bog‘landik, 25 daqiqada yetib kelib muammoni 100% bartaraf qildi. Xizmat juda zo‘r!'
  },
  {
    name: 'Elena Kim',
    role: 'Toshkent sh., Mirobod',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Elektr shitidagi avtomatlar kuya boshlagandi. Sardor usta kelib zamonaviy kuchlanish relesi va avtomatlarni tartibli qilib yig‘ib berdi. Narxi ham saytda ko‘rsatilganidek bo‘ldi, ortiqcha so‘ramadi.'
  },
  {
    name: 'Dilnoza Alimova',
    role: 'Yunusobod tumani',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Konditsioner yuvish va freon to‘ldirish uchun usta qidirdim. Sayt juda qulay ekan: narxlar aniq yozilgan, ustaning sharhlari bor. Bobur usta aytilgan vaqtda keldi va toza qilib berdi.'
  }
];

// LocalStorage dan qo'shilgan sharhlarni yuklab, bazaga qo'shish
function syncReviewsFromStorage() {
  try {
    const raw = typeof safeStorage !== 'undefined' 
      ? safeStorage.getItem('user_reviews') 
      : localStorage.getItem('user_reviews');
    const storedReviews = JSON.parse(raw || '{}');
    Object.keys(storedReviews).forEach(masterId => {
      const allM = typeof getAllMasters === 'function' ? getAllMasters(false) : MASTERS_DATA;
      const master = allM.find(m => m.id === parseInt(masterId));
      if (master && storedReviews[masterId]) {
        storedReviews[masterId].forEach(rev => {
          if (!master.reviews.some(r => r.text === rev.text && r.author === rev.author)) {
            master.reviews.unshift(rev);
          }
        });
        // Reytingni qayta hisoblash
        const totalRating = master.reviews.reduce((sum, r) => sum + r.rating, 0);
        master.rating = (totalRating / master.reviews.length).toFixed(1);
        master.reviewsCount = master.reviews.length;
      }
    });
  } catch (e) {
    console.error('Sharhlarni sinxronlashda xatolik:', e);
  }
}

// Barcha ustalarni (data.js + LocalStorage dagi yangi ro'yxatdan o'tgan ustalar) birlashtirib olish
function getAllMasters(applyOverrides = true) {
  let combined = [...MASTERS_DATA];

  // LocalStorage dagi ro'yxatdan o'tgan ustalarni qo'shish
  try {
    const rawNewMasters = typeof safeStorage !== 'undefined'
      ? safeStorage.getItem('registered_masters')
      : localStorage.getItem('registered_masters');
    if (rawNewMasters) {
      const newMasters = JSON.parse(rawNewMasters);
      if (Array.isArray(newMasters)) {
        newMasters.forEach(newM => {
          if (!combined.some(m => m.id === newM.id)) {
            combined.unshift(newM);
          }
        });
      }
    }
  } catch (err) {
    console.warn('Yangi ustalarni yuklashda xatolik:', err);
  }

  // Har bir ustaga default status, verified va minimal narx berish
  if (applyOverrides) {
    try {
      const statusOverrides = JSON.parse(
        (typeof safeStorage !== 'undefined' ? safeStorage.getItem('master_status_overrides') : localStorage.getItem('master_status_overrides')) || '{}'
      );

      combined.forEach(m => {
        // Agar usta panelidan status o'zgartirilgan bo'lsa
        if (statusOverrides[m.id]) {
          m.status = statusOverrides[m.id];
        } else if (!m.status) {
          // Demo maqsadida bir nechta usta 'busy' (band), qolganlari 'free' (bo'sh)
          m.status = (m.id === 4 || m.id === 11 || m.id === 24 || m.id === 35) ? 'busy' : 'free';
        }

        m.verified = true;
      });
    } catch (_) {}
  }

  return combined;
}

// Usta uchun "dan ... so'm" boshlang'ich narxini hisoblash
function getMasterStartingPrice(master) {
  if (master.startingPrice) {
    return master.startingPrice.replace(/dan\s*/i, '').replace(/so['‘`]?m.*/i, "so'm").trim();
  }
  if (master.fullPriceList && master.fullPriceList.length > 0) {
    const prices = master.fullPriceList
      .map(p => parseInt(String(p.price).replace(/\D/g, ''), 10))
      .filter(n => !isNaN(n) && n > 0);
    if (prices.length > 0) {
      const min = Math.min(...prices);
      return min.toLocaleString('uz-UZ') + " so'm";
    }
  }
  if (master.popularServices && master.popularServices.length > 0) {
    const prices = master.popularServices
      .map(p => parseInt(String(p.price).replace(/\D/g, ''), 10))
      .filter(n => !isNaN(n) && n > 0);
    if (prices.length > 0) {
      const min = Math.min(...prices);
      return min.toLocaleString('uz-UZ') + " so'm";
    }
  }
  return "40 000 so'm";
}

// Toshkent tumanlarining markaziy koordinatalari (Xarita uchun)
const DISTRICT_COORDINATES = {
  'Chilonzor': [41.2721, 69.2045],
  'Yunusobod': [41.3644, 69.2872],
  'Mirzo Ulug‘bek': [41.3283, 69.3344],
  'Yakkasaroy': [41.2825, 69.2508],
  'Shayxontohur': [41.3175, 69.2311],
  'Sergeli': [41.2231, 69.2225],
  'Olmazor': [41.3506, 69.2208],
  'Uchtepa': [41.2942, 69.1764],
  'Mirobod': [41.2917, 69.2817],
  'Yashnobod': [41.2933, 69.3375]
};

// Har bir usta uchun deterministik xarita koordinatasi
function getMasterCoordinates(master) {
  const base = DISTRICT_COORDINATES[master.district] || [41.2995, 69.2401];
  // Ustaning id raqamiga qarab kichik siljish (jitter) beramiz, toki markerlar bir-birining ustiga tushib qolmasin
  const offsetLat = Math.sin(master.id * 1.7) * 0.012;
  const offsetLng = Math.cos(master.id * 2.3) * 0.014;
  return [base[0] + offsetLat, base[1] + offsetLng];
}

// Kalkulyator uchun xizmatlar bazasi
const CALCULATOR_SERVICES = [
  {
    categoryId: 'santexnik',
    categoryName: 'Santexnika ishlari',
    icon: 'wrench',
    items: [
      { id: 's1', name: 'Kran va smesitel almashtirish', unit: 'dona', minPrice: 60000, maxPrice: 90000 },
      { id: 's2', name: 'Unitaz montaji yoki ta’mirlash', unit: 'dona', minPrice: 130000, maxPrice: 180000 },
      { id: 's3', name: 'Tiqilib qolgan quvurni ochish (prochistka)', unit: 'nuqta', minPrice: 80000, maxPrice: 130000 },
      { id: 's4', name: 'Suv filtri o‘rnatish', unit: 'dona', minPrice: 90000, maxPrice: 140000 },
      { id: 's5', name: 'Dush kabinasi yoki vanna montaji', unit: 'dona', minPrice: 250000, maxPrice: 400000 },
      { id: 's6', name: 'Isitish batareyasi (radiator) montaji', unit: 'dona', minPrice: 120000, maxPrice: 180000 }
    ]
  },
  {
    categoryId: 'elektrik',
    categoryName: 'Elektr montaj ishlari',
    icon: 'zap',
    items: [
      { id: 'e1', name: 'Rozetka yoki vikluchatel montaji', unit: 'dona', minPrice: 35000, maxPrice: 50000 },
      { id: 'e2', name: 'Lyustra yoki shift chirog‘i ilish', unit: 'dona', minPrice: 70000, maxPrice: 120000 },
      { id: 'e3', name: 'Avtomat uzgich almashtirish', unit: 'dona', minPrice: 40000, maxPrice: 60000 },
      { id: 'e4', name: 'Kuchlanish relesi (Zubr / Tomzn) montaji', unit: 'dona', minPrice: 80000, maxPrice: 120000 },
      { id: 'e5', name: 'Elektr shiti va avtomatika yig‘ish', unit: 'shit', minPrice: 200000, maxPrice: 350000 },
      { id: 'e6', name: 'LED lenta va podsvetka montaji', unit: 'metr', minPrice: 35000, maxPrice: 55000 }
    ]
  },
  {
    categoryId: 'konditsioner',
    categoryName: 'Iqlim va konditsioner',
    icon: 'wind',
    items: [
      { id: 'k1', name: 'Konditsionerni dori bilan chuqur yuvish', unit: 'dona', minPrice: 100000, maxPrice: 140000 },
      { id: 'k2', name: 'Freon gaz quyish (R410A / R22)', unit: 'dona', minPrice: 160000, maxPrice: 220000 },
      { id: 'k3', name: 'Standart konditsioner montaji', unit: 'dona', minPrice: 300000, maxPrice: 420000 },
      { id: 'k4', name: 'Konditsionerni xavfsiz demontaj qilish', unit: 'dona', minPrice: 120000, maxPrice: 180000 }
    ]
  },
  {
    categoryId: 'maishiy',
    categoryName: 'Maishiy texnika ta’miri',
    icon: 'cpu',
    items: [
      { id: 'm1', name: 'Kir yuvish mashinasi diagnostikasi / nasosi', unit: 'dona', minPrice: 100000, maxPrice: 160000 },
      { id: 'm2', name: 'Kir yuvish mashinasi TEN (isitgich) yangilash', unit: 'dona', minPrice: 120000, maxPrice: 170000 },
      { id: 'm3', name: 'Muzlatgich freon quyish va ta’mirlash', unit: 'dona', minPrice: 150000, maxPrice: 240000 }
    ]
  },
  {
    categoryId: 'mebel',
    categoryName: 'Mebel yig‘ish va sozlash',
    icon: 'hammer',
    items: [
      { id: 'b1', name: 'Shkaf-kupe yig‘ish va montaji', unit: 'dona', minPrice: 160000, maxPrice: 250000 },
      { id: 'b2', name: 'Oshxona garnituri montaji', unit: 'metr', minPrice: 200000, maxPrice: 300000 },
      { id: 'b3', name: 'Krovat yoki divan yig‘ish', unit: 'dona', minPrice: 100000, maxPrice: 150000 },
      { id: 'b4', name: 'Eshik ilmoqlari (petlya) va tortmalarni sozlash', unit: 'dona', minPrice: 45000, maxPrice: 70000 }
    ]
  },
  {
    categoryId: 'universal',
    categoryName: 'Bir soatlik usta xizmatlari',
    icon: 'tool',
    items: [
      { id: 'u1', name: 'Televizor kronshteyni montaji', unit: 'dona', minPrice: 60000, maxPrice: 90000 },
      { id: 'u2', name: 'Parda kornizi ilish', unit: 'dona', minPrice: 70000, maxPrice: 100000 },
      { id: 'u3', name: 'Eshik qulfini almashtirish', unit: 'dona', minPrice: 80000, maxPrice: 120000 },
      { id: 'u4', name: 'Ko‘zgu, javon yoki kartina osish', unit: 'dona', minPrice: 40000, maxPrice: 70000 }
    ]
  }
];

syncReviewsFromStorage();
