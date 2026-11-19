// Usta-Top.uz - Haqiqiy ma'lumotlar bazasi (Toshkent ustalari va xizmat narxlari)

const CATEGORIES = [
  { id: 'barchasi', name: 'Barchasi', icon: 'grid' },
  { id: 'santexnik', name: 'Santexnik', icon: 'wrench' },
  { id: 'elektrik', name: 'Elektrik', icon: 'zap' },
  { id: 'konditsioner', name: 'Konditsioner ustasi', icon: 'wind' },
  { id: 'maishiy', name: 'Maishiy texnika', icon: 'cpu' },
  { id: 'mebel', name: 'Mebel yig‘uvchi', icon: 'hammer' },
  { id: 'universal', name: 'Bir soatlik usta', icon: 'tool' }
];

const DISTRICTS = [
  'Barcha tumanlar',
  'Yakkasaroy',
  'Chilonzor',
  'Yunusobod',
  'Mirzo Ulug‘bek',
  'Shayxontohur',
  'Sergeli',
  'Olmazor',
  'Uchtepa',
  'Mirobod',
  'Yashnobod'
];

const MASTERS_DATA = [
  {
    id: 1,
    name: 'Akmal Karimov',
    initials: 'AK',
    profession: 'Santexnik va isitish ustasi',
    categoryId: 'santexnik',
    district: 'Chilonzor',
    districtsServed: ['Chilonzor', 'Uchtepa', 'Yakkasaroy', 'Olmazor'],
    experience: 8,
    rating: 4.9,
    reviewsCount: 142,
    completedOrders: 530,
    urgent: true,
    phone: '+998 90 123 45 67',
    telegram: 'akmal_santexnik',
    avatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
    bio: "8 yillik tajribaga ega professional santexnik. Har qanday murakkablikdagi quvur, smesitel, unitaz, dush kabinalari va isitish batareyalarini o'rnatish hamda ta'mirlash. Ishimga 6 oylik kafolat beraman. Chilonzor va yaqin tumanlarga 25-30 daqiqada yetib boraman.",
    popularServices: [
      { name: 'Kran va smesitel almashtirish', price: "80 000 so'm" },
      { name: 'Unitaz o‘rnatish yoki ta’mirlash', price: "150 000 so'm" },
      { name: 'Chaqiruv (ish bajarilsa)', price: 'Bepul' }
    ],
    fullPriceList: [
      { service: 'Kran va smesitel almashtirish', time: '30-45 daqiqa', price: "80 000 so'm" },
      { service: 'Unitaz montaji va sozlash', time: '1-1.5 soat', price: "150 000 so'm" },
      { service: 'Tiqilib qolgan quvurni ochish (prochistka)', time: '30 daqiqa', price: "100 000 so'm" },
      { service: 'Suv sizib chiqishini bartaraf qilish', time: '40 daqiqa', price: "120 000 so'm" },
      { service: 'Vanna va dush kabinasi o‘rnatish', time: '2-3 soat', price: "300 000 so'm" },
      { service: 'Kanalizatsiya quvurlarini almashtirish', time: 'Kelishuv asosida', price: "250 000 so'mdan" },
      { service: 'Avariya holatida shoshilinch chaqiruv', time: '20-30 daqiqa', price: "Bepul" }
    ],
    reviews: [
      {
        author: 'Nodirbek Sobirov',
        date: '12-noyabr, 2026',
        rating: 5,
        district: 'Chilonzor',
        text: 'Akmal aka chaqiruvdan so‘ng 25 daqiqada yetib keldi. Oshxonadagi suv oqayotgan quvurni tezda sifatli yangisiga almashtirdi. Juda tartibli, toza ishlaydigan usta. Katta rahmat!'
      },
      {
        author: 'Madina Umarova',
        date: '5-noyabr, 2026',
        rating: 5,
        district: 'Uchtepa',
        text: 'Unitaz va dush smesitelini almashtirib berdilar. Ishidan juda mamnunman, narxi ham oldindan qancha aytilgan bo‘lsa shunday bo‘ldi.'
      },
      {
        author: 'Aziz Qobilov',
        date: '28-oktyabr, 2026',
        rating: 4.8,
        district: 'Yakkasaroy',
        text: 'Quvurdagi tiqilishni maxsus tros bilan ochib berdilar. Ishidan qoniqdik, tavsiya qilaman.'
      }
    ]
  },
  {
    id: 2,
    name: 'Sardor Toshmatov',
    initials: 'ST',
    profession: 'Elektrik va avtomatika ustasi',
    categoryId: 'elektrik',
    district: 'Mirzo Ulug‘bek',
    districtsServed: ['Mirzo Ulug‘bek', 'Yunusobod', 'Yashnobod', 'Mirobod'],
    experience: 11,
    rating: 5.0,
    reviewsCount: 198,
    completedOrders: 780,
    urgent: true,
    phone: '+998 93 987 65 43',
    telegram: 'sardor_elektrik',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    bio: "11 yillik tajribaga ega 4-darajali professional elektrik. Xonadonlar, kottejlar va ofislarda to‘liq elektr tarmog‘ini montaj qilish, elektr shitlari yig‘ish, kuchlanish releylari va qisqa tutashuvlarni aniqlash. Xavfsizlikka 100% kafolat.",
    popularServices: [
      { name: 'Rozetka va vikluchatel montaji', price: "40 000 so'm" },
      { name: 'Katta lyustra va bra o‘rnatish', price: "90 000 so'm" },
      { name: 'Elektr shiti va avtomatlar yig‘ish', price: "250 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Rozetka / vikluchatel almashtirish (1 dona)', time: '15 daqiqa', price: "40 000 so'm" },
      { service: 'Lyustra va zamonaviy shift chiroqlari montaji', time: '40 daqiqa', price: "90 000 so'm" },
      { service: 'Elektr shiti va avtomatika (UZO, Zubr)', time: '2 soat', price: "250 000 so'mdan" },
      { service: 'Qisqa tutashuv va nosozlikni aniqlash', time: '30-50 daqiqa', price: "120 000 so'm" },
      { service: 'Gipsokarton ichiga LED nuqta chiroqlar o‘rnatish', time: '1 soat', price: "35 000 so'm/dona" },
      { service: 'Xonadonni noldan to‘liq sim tortish', time: '3-5 kun', price: "Kelishuv asosida" },
      { service: 'Chaqiruv va maslahat', time: 'Tezkor', price: 'Bepul' }
    ],
    reviews: [
      {
        author: 'Shahzod Karimov',
        date: '14-noyabr, 2026',
        rating: 5,
        district: 'Mirzo Ulug‘bek',
        text: 'Uyimizda tok birdan o‘chib sim hidi chiqayotgan edi. Sardor akaga qo‘ng‘iroq qildik, yarim soatda kelib shikastlangan kabelni topib tuzatdi. Haqiqiy usta!'
      },
      {
        author: 'Dilorom Ergasheva',
        date: '8-noyabr, 2026',
        rating: 5,
        district: 'Yashnobod',
        text: 'Katta billur lyustrani baland shiftga juda mustahkam qilib osib berdi. O‘zi bilan barcha asboblari bor ekan.'
      }
    ]
  },
  {
    id: 3,
    name: 'Bobur Alimov',
    initials: 'BA',
    profession: 'Konditsioner va iqlim texnikasi',
    categoryId: 'konditsioner',
    district: 'Yunusobod',
    districtsServed: ['Yunusobod', 'Shayxontohur', 'Olmazor', 'Mirzo Ulug‘bek'],
    experience: 7,
    rating: 4.8,
    reviewsCount: 89,
    completedOrders: 410,
    urgent: false,
    phone: '+998 97 456 12 30',
    telegram: 'bobur_klimat',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: "Midea, Artel, Gree, LG, Samsung va boshqa barcha turdagi split konditsionerlarni o'rnatish, ta'mirlash, freon quyish va antibakterial tozalash. Har bir xizmatga sifat kafolati taqdim etiladi.",
    popularServices: [
      { name: 'Freon quyish (R410A / R22)', price: "180 000 so'm" },
      { name: 'Antibakterial chuqur tozalash', price: "120 000 so'm" },
      { name: 'Konditsioner montaji', price: "350 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Konditsionerni to‘liq kimyoviy va bug‘li yuvish', time: '1 soat', price: "120 000 so'm" },
      { service: 'Freon quyish va qochqinni tekshirish', time: '40 daqiqa', price: "180 000 so'm" },
      { service: 'Konditsioner o‘rnatish (standart montaj)', time: '2-3 soat', price: "350 000 so'm" },
      { service: 'Konditsionerni demontaj qilish (ko‘chirish)', time: '1 soat', price: "150 000 so'm" },
      { service: 'Elektron plata va datchiklarni sozlash', time: '1.5 soat', price: "200 000 so'm" },
      { service: 'Chaqiruv va diagnostika', time: 'Tezkor', price: "Bepul (ta'mir bilan)" }
    ],
    reviews: [
      {
        author: 'Umidjon Salimov',
        date: '10-noyabr, 2026',
        rating: 5,
        district: 'Yunusobod',
        text: 'Konditsioner sovuq bermay faqat shamol haydayotgan edi. Bobur usta kelib tekshirdi, freon sizib chiqishini bartaraf qilib to‘ldirib berdi. Rahmat!'
      },
      {
        author: 'Malika Rahimova',
        date: '2-noyabr, 2026',
        rating: 4.7,
        district: 'Olmazor',
        text: 'Konditsionerni yuvib, hidlarini yo‘qotib berdilar. Xizmat madaniyati yuqori ekan.'
      }
    ]
  },
  {
    id: 4,
    name: 'Jasur Qodirov',
    initials: 'JQ',
    profession: 'Maishiy texnika (Kir yuvish, muzlatgich)',
    categoryId: 'maishiy',
    district: 'Yakkasaroy',
    districtsServed: ['Yakkasaroy', 'Mirobod', 'Sergeli', 'Chilonzor'],
    experience: 9,
    rating: 4.9,
    reviewsCount: 115,
    completedOrders: 620,
    urgent: true,
    phone: '+998 91 333 44 55',
    telegram: 'jasur_servis',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: "LG, Samsung, Bosch, Indesit, Beko rusumidagi kir yuvish va idish yuvish mashinalari, quritgichlar hamda muzlatgichlarni uyingizning o‘zida ta'mirlayman. Ehtiyot qismlar original va 1 yil kafolat bilan.",
    popularServices: [
      { name: 'Kir yuvish mashinasi nasosini almashtirish', price: "130 000 so'm" },
      { name: 'TEN (isitgich) yangilash', price: "140 000 so'm" },
      { name: 'Muzlatgich freon quyish / termostat', price: "160 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Suv to‘kmaslik muammosi (nasos / filtr)', time: '40 daqiqa', price: "130 000 so'm" },
      { service: 'Suv isitmaslik muammosi (TEN almashtirish)', time: '45 daqiqa', price: "140 000 so'm" },
      { service: 'Podshipnik va krestovina almashtirish', time: '3-4 soat', price: "280 000 so'm" },
      { service: 'Elektron boshqaruv blokini (plata) ta’mirlash', time: '1 kun', price: "220 000 so'mdan" },
      { service: 'Muzlatgich termostati va datchiklari', time: '1 soat', price: "160 000 so'm" },
      { service: 'Diagnostika (ta’mirlash amalga oshirilsa)', time: '30 daqiqa', price: 'Bepul' }
    ],
    reviews: [
      {
        author: 'Nilufar Qosimova',
        date: '15-noyabr, 2026',
        rating: 5,
        district: 'Yakkasaroy',
        text: 'Kir yuvish mashinamiz siqish paytida qattiq gumburlab silkinayotgan edi. Jasur usta podshipniklarini bir kunda almashtirib, jim ishlaydigan qilib berdi.'
      },
      {
        author: 'Alisher Vohidov',
        date: '4-noyabr, 2026',
        rating: 5,
        district: 'Mirobod',
        text: 'Muzlatgichimiz sovuq bermay qolgandi. Freon quydi va filtrni yangiladi, yarim soatda muammo yechildi. Minnatdormiz!'
      }
    ]
  },
  {
    id: 5,
    name: 'Dilshodbek Rahimov',
    initials: 'DR',
    profession: 'Mebel yig‘uvchi va restavratsiya',
    categoryId: 'mebel',
    district: 'Shayxontohur',
    districtsServed: ['Shayxontohur', 'Olmazor', 'Chilonzor', 'Yunusobod'],
    experience: 6,
    rating: 4.8,
    reviewsCount: 76,
    completedOrders: 320,
    urgent: false,
    phone: '+998 94 777 88 99',
    telegram: 'dilshod_mebel',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bio: "Oshxona mebellari, shkaf-kupelar, krovatlar, ofis stollari va har qanday korpusli mebellarni ehtiyotkorlik bilan yig'ish va o'rnatish. Ilmoqlar, datchiklar va fasadlarni tekislash bo'yicha 6 yillik tajriba.",
    popularServices: [
      { name: 'Shkaf-kupe yig‘ish va o‘rnatish', price: "180 000 so'm" },
      { name: 'Oshxona mebeli montaji', price: "250 000 so'm/m" },
      { name: 'Mebel eshiklari va ilmoqlarini sozlash', price: "60 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Shkaf-kupe va garderob yig‘ish', time: '2-3 soat', price: "180 000 so'm" },
      { service: 'Oshxona garnituri montaji (navesnoy + pastki)', time: 'Kun bo‘yi', price: "250 000 so'm/metr" },
      { service: 'Ikki kishilik krovat va tumbalar', time: '1.5 soat', price: "120 000 so'm" },
      { service: 'Ofis stoli va kreslolarni yig‘ish', time: '40 daqiqa', price: "70 000 so'm" },
      { service: 'Eski mebellarni demontaj qilish (ko‘chirishga)', time: '2 soat', price: "130 000 so'm" },
      { service: 'Chaqiruv va o‘lchash', time: 'Kelishuv', price: 'Bepul' }
    ],
    reviews: [
      {
        author: 'Jamshid Yo‘ldoshev',
        date: '9-noyabr, 2026',
        rating: 5,
        district: 'Shayxontohur',
        text: 'Katta shkaf sotib olgandik, detallari juda ko‘p edi. Dilshodbek 3 soat ichida birorta tirnalishsiz tekis qilib yig‘ib berdi. Qoyil!'
      },
      {
        author: 'Lola Saidova',
        date: '30-oktyabr, 2026',
        rating: 4.8,
        district: 'Olmazor',
        text: 'Oshxona eshiklarining barcha ilmoqlarini yumshoq yopiladigan vakuumli ilmoqlarga almashtirib berdilar.'
      }
    ]
  },
  {
    id: 6,
    name: 'Otabek Nazarov',
    initials: 'ON',
    profession: 'Bir soatlik usta (Mayda maishiy ta’mirlar)',
    categoryId: 'universal',
    district: 'Sergeli',
    districtsServed: ['Sergeli', 'Yakkasaroy', 'Bektemir', 'Mirobod'],
    experience: 5,
    rating: 4.9,
    reviewsCount: 92,
    completedOrders: 490,
    urgent: true,
    phone: '+998 99 811 22 33',
    telegram: 'otabek_handyman',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    bio: "Xonadoningizdagi barcha mayda-chuyda ta'mirlash ishlari: televizor kronshteynlari, parda kornizlari, ko'zgular va kartinalarni osish, eshik qulflarini almashtirish, silikon tortish va plintus montaji. Soatbay yoki ish hajmiga qarab ishlayman.",
    popularServices: [
      { name: 'Televizor kronshteyni va polkalar ilish', price: "70 000 so'm" },
      { name: 'Eshik qulfi yoki tutqichini yangilash', price: "90 000 so'm" },
      { name: 'Parda kornizini o‘rnatish', price: "80 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Televizor devoriy kronshteyni montaji', time: '30 daqiqa', price: "70 000 so'm" },
      { service: 'Parda kornizi (alyumin / plastik) o‘rnatish', time: '40 daqiqa', price: "80 000 so'm" },
      { service: 'Eshik qulfi, lichinka yoki tutqichni almashtirish', time: '45 daqiqa', price: "90 000 so'm" },
      { service: 'Devorga ko‘zgu, kartina, soat ilish (1-3 dona)', time: '30 daqiqa', price: "50 000 so'm" },
      { service: 'Vanna va rakovina chetiga silikon tortish', time: '30 daqiqa', price: "60 000 so'm" },
      { service: 'Soatbay universal usta xizmati', time: '1 soat', price: "100 000 so'm" }
    ],
    reviews: [
      {
        author: 'Feruza Ahmedova',
        date: '11-noyabr, 2026',
        rating: 5,
        district: 'Sergeli',
        text: 'Yangi kvartiraga ko‘chganimizda 3 ta korniz, katta oyna va televizorni juda mustahkam qilib osib berdi. Changsiz va toza ishladi.'
      },
      {
        author: 'Bekzod Norov',
        date: '27-oktyabr, 2026',
        rating: 4.9,
        district: 'Bektemir',
        text: 'Temir eshik qulfimiz tiqilib qolayotgandi. Otabek aka qulfni yechib, tozalab, moylab sozlab berdi. Yangi qulfga pul sarflamadik.'
      }
    ]
  },
  {
    id: 7,
    name: 'Farrux Yusupov',
    initials: 'FY',
    profession: 'Santexnika va isitish qozonlari (Kotyol)',
    categoryId: 'santexnik',
    district: 'Olmazor',
    districtsServed: ['Olmazor', 'Shayxontohur', 'Yunusobod', 'Uchtepa'],
    experience: 12,
    rating: 5.0,
    reviewsCount: 210,
    completedOrders: 890,
    urgent: true,
    phone: '+998 90 555 11 22',
    telegram: 'farrux_plumbing',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: "12 yillik tajribaga ega usta. Xususiy hovlilar va ko'p qavatli uylarda 2 konturli isitish qozonlari (gazoviy kotyol), issiq pol, suv nasoslari va osmos toza suv filtrlarini o'rnatish hamda servis xizmati.",
    popularServices: [
      { name: 'Isitish qozonini (kotyol) sozlash', price: "200 000 so'm" },
      { name: 'Osmos suv filtri o‘rnatish', price: "120 000 so'm" },
      { name: 'Kran va mikser almashtirish', price: "75 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Gazoviy kotyol profilaktikasi va ta’miri', time: '1-2 soat', price: "200 000 so'mdan" },
      { service: 'Ichimlik suvi filtri (osmos) montaji', time: '1 soat', price: "120 000 so'm" },
      { service: 'Issiq pol va batareyalar montaji', time: 'Kelishuv', price: "150 000 so'm/nuqta" },
      { service: 'Avariya quvur yorilishini payvandlash', time: '40 daqiqa', price: "150 000 so'm" },
      { service: 'Smesitel, dush ustunini o‘rnatish', time: '30 daqiqa', price: "75 000 so'm" },
      { service: 'Chaqiruv va konsultatsiya', time: 'Tezkor', price: 'Bepul' }
    ],
    reviews: [
      {
        author: 'Davron Mirzayev',
        date: '13-noyabr, 2026',
        rating: 5,
        district: 'Olmazor',
        text: 'Qish oldidan kotyolimiz xato berib o‘chib qolayotgandi. Farrux aka kelib datchigini tozalab, bosimini to‘g‘rilab berdi. Uyimiz issiq, katta rahmat!'
      }
    ]
  },
  {
    id: 8,
    name: 'Jamshid Bekmirzayev',
    initials: 'JB',
    profession: 'Elektrik va zamonaviy LED tizimlari',
    categoryId: 'elektrik',
    district: 'Chilonzor',
    districtsServed: ['Chilonzor', 'Yakkasaroy', 'Uchtepa', 'Mirobod'],
    experience: 8,
    rating: 4.8,
    reviewsCount: 64,
    completedOrders: 310,
    urgent: false,
    phone: '+998 93 444 77 11',
    telegram: 'jamshid_elektro',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: "Zamonaviy yoritish, yashirin shift LED lentalari, smart-relelar, Wi-Fi o'chirgichlar va kuchlanishdan himoya qiluvchi avtomatlar o'rnatish bo'yicha mutaxassis. Har doim toza va aniq ishlayman.",
    popularServices: [
      { name: 'LED lenta va podsvetka montaji', price: "45 000 so'm/m" },
      { name: 'Kuchlanish relesi (Zubr) montaji', price: "90 000 so'm" },
      { name: 'Avtomat uzgichni almashtirish', price: "50 000 so'm" }
    ],
    fullPriceList: [
      { service: 'Shift va mebellarga LED lenta montaji', time: '1-2 soat', price: "45 000 so'm/metr" },
      { service: 'Kuchlanish relesi (Zubr / Tomzn)', time: '30 daqiqa', price: "90 000 so'm" },
      { service: 'Avtomat uzgich (avtomat) yangilash', time: '20 daqiqa', price: "50 000 so'm" },
      { service: 'Aqlli kalitlar va sensorlar o‘rnatish', time: '40 daqiqa', price: "70 000 so'm" },
      { service: 'Chaqiruv', time: '30 daqiqa', price: 'Bepul' }
    ],
    reviews: [
      {
        author: 'Sanjar Mahmudov',
        date: '6-noyabr, 2026',
        rating: 5,
        district: 'Chilonzor',
        text: 'Mehmonxonaga yashirin LED profil va lenta o‘rnatib berdi. Ranglari telefon orqali boshqariladigan bo‘ldi, natijadan juda mamnunmiz.'
      }
    ]
  }
];

const PRICING_BENCHMARK = [
  {
    category: 'Santexnika ishlari',
    icon: 'wrench',
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
    items: [
      { name: 'Konditsionerni kimyoviy tozalash', range: '100 000 - 150 000 so‘m' },
      { name: 'Freon gaz quyish (R410/R22)', range: '150 000 - 250 000 so‘m' },
      { name: 'Standart konditsioner montaji', range: '300 000 - 450 000 so‘m' },
      { name: 'Konditsionerni xavfsiz demontaj qilish', range: '120 000 - 180 000 so‘m' },
      { name: 'Konditsioner dori bilan dezinfeksiya', range: '80 000 - 120 000 so‘m' }
    ]
  },
  {
    category: 'Maishiy texnika ta’miri',
    icon: 'cpu',
    items: [
      { name: 'Kir yuvish mashinasi diagnostikasi', range: 'Bepul / 50 000 so‘m' },
      { name: 'Suv nasosi (pompa) almashtirish', range: '120 000 - 180 000 so‘m' },
      { name: 'Kir yuvish mashinasi TEN almashtirish', range: '130 000 - 190 000 so‘m' },
      { name: 'Muzlatgich freon quyish', range: '150 000 - 250 000 so‘m' },
      { name: 'Muzlatgich termostati / starteri', range: '120 000 - 180 000 so‘m' }
    ]
  },
  {
    category: 'Mebel yig‘ish va sozlash',
    icon: 'hammer',
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
    items: [
      { name: 'Televizor kronshteyni montaji', range: '60 000 - 90 000 so‘m' },
      { name: 'Parda kornizi o‘rnatish', range: '70 000 - 100 000 so‘m' },
      { name: 'Eshik qulfi yoki tutqich almashtirish', range: '80 000 - 130 000 so‘m' },
      { name: 'Ko‘zgu, kartina, javonlar osish', range: '40 000 - 80 000 so‘m' }
    ]
  }
];

const FAQS = [
  {
    question: "Ustalarni chaqirish qancha turadi?",
    answer: "Usta-Top platformasida chaqiruv ko'p hollarda bepul (agar ta'mirlash ishlari bajarilsa). Agar faqat diagnostika qilinib, ish keyinga qoldirilsa, Toshkent bo‘ylab o‘rtacha yo‘l haqi va ko‘rik uchun 40 000 - 50 000 so‘m to‘lanadi."
  },
  {
    question: "Usta narxni oshirib yubormasligiga qanday ishonch bor?",
    answer: "Har bir usta profilida aniq xizmatlar narxi (preyskurant) ko'rsatilgan. Usta ishni boshlashdan oldin muammoni ko‘rib, aniq narxni siz bilan kelishib oladi. Ish tugagach, faqat kelishilgan narx to‘lanadi."
  },
  {
    question: "Ustalar qanchalik tez yetib kelishadi?",
    answer: "Saytimizda o‘z tumaningizdagi ustalarni tanlash imkoniyati bor. Shuning uchun yaqin hududdagi usta 25-45 daqiqa ichida yetib boradi. Shoshilinch avariya holatlarida esa 'Shoshilinch buyurtma oladi' belgisi bor ustalarga bog‘lanishingiz mumkin."
  },
  {
    question: "Usta-Top orqali usta topish uchun vositachilik haqi bormi?",
    answer: "Yo‘q! Mijozlar uchun xizmat mutlaqo 100% bepul. Siz to‘g‘ridan-to‘g‘ri usta bilan telefon yoki Telegram orqali bog‘lanasiz va vositachilarsiz gaplashasiz."
  },
  {
    question: "Men ham usta sifatida ro‘yxatdan o‘tsam bo‘ladimi?",
    answer: "Albatta! Saytdagi 'Usta sifatida qo‘shilish' tugmasi orqali arizangizni yuboring. Moderatorimiz ma’lumotlaringiz va tajribangizni tekshirib, 24 soat ichida profilingizni faollashtiradi."
  }
];
