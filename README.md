# Usta-Top.uz - Toshkentdagi ishonchli ustalar portali

Toshkent shahri uchun maishiy xizmatlar, ta'mirlash va professional ustalarni topishga mo‘ljallangan zamonaviy, ko‘p sahifali (multi-page), Dark Mode (tungi rejim) qo‘llab-quvvatlovchi, sayt ichidagi to‘g‘ridan-to‘g‘ri Chat, 5 yulduzli sharh tizimi, autentifikatsiya, buyurtmalar birjasi va interaktiv xaritaga ega to‘liq veb-platforma.

Sayt to‘liq statik frontend bo‘lib, barcha ma’lumotlar brauzerning `localStorage` xotirasida xavfsiz boshqariladi (`try/catch` bilan o‘ralgan `safeStorage`).

---

## 🧭 Yangi Navbar Tartibi (Barcha sahifalarda bir xil)

1. **🏠 Bosh sahifa** (`index.html`)
2. **📢 E’lon berish** (`elon-berish.html`)
3. **🔧 Ustalar** (`ustalar.html`)
4. **🧮 Kalkulyator** (`kalkulyator.html`)
5. **🗺️ Xarita** (`xarita.html`)

---

## 🌟 Asosiy Imkoniyatlar va Funksiyalar

### 1. Interaktiv Narx Kalkulyatori (`kalkulyator.html`)
- **Xizmatlar toifalari:** Santexnika, Elektr montaj, Konditsioner va iqlim, Maishiy texnika, Mebel yig‘ish, Bir soatlik usta.
- **Tezkor hisoblash:** Har bir ish bo‘yicha `+` va `-` tugmalari orqali xizmatlar tanlanadi (masalan: *Kran almashtirish + Tiqilishni ochish*).
- **Taxminiy byudjet:** Kalkulyator darhol Toshkentning o‘rtacha narxlari asosida umumiy oraliq narxni hisoblab beradi (masalan: `140 000 – 220 000 so‘m`).
- **Ustalar katalogiga o‘tish:** Tanlangan tuman bo‘yicha darhol mos ustalarni ko‘rsatuvchi dinamik tugma (masalan: *"Chilonzordagi 4+ ustalarni ko‘rish →"*).

### 2. E’lon berish va Buyurtmalar Birjasi (`elon-berish.html`)
- **Mijoz e’loni:** Buyurtmachi 1 daqiqada o‘z muammosini, kerakli xizmat turini, tumanni, manzilni, qulay vaqtni (masalan: *"Bugun soat 18:00 ga"*), byudjetni va kerak bo‘lsa nosozlik rasmini yuklaydi.
- **Tender mexanizmi:** Saytdagi ustalar o‘z profillari yoki e’lonlar doskasi orqali buyurtmalarni ko‘rib, o‘zlarining narxi, borish vaqti va izohini taklif qilishadi.
- **Mijoz tanlovi:** Buyurtmachi o‘z e’loniga kelgan barcha usta takliflarini ko‘rib, eng ma’qul narx va reytingdagi usta bilan sayt ichidagi Chat orqali bog‘lanadi.

### 3. Toshkent Ustalar Xaritasi (`xarita.html`)
- **Interaktiv xarita:** Leaflet.js va OpenStreetMap orqali Toshkent shahri bo‘ylab ustalar joylashuvi.
- **Holat markerlari:**
  * 🟢 **Bo‘sh usta** — Yashil rangli, to‘lqinlanuvchi (pulsing) marker.
  * ⚪ **Band usta** — Kulrang marker.
- **Tezkor tuman bo‘yicha uchish:** Chilonzor, Yunusobod, Mirzo Ulug‘bek va boshqa barcha 10 ta tumanga bir bosishda silliq o‘tish (`flyTo`).
- **Marker popuplari:** Usta avatari, ismi, mutaxassisligi, reytingi, narxi hamda **"Chat"** va **"Profil"** tugmalari.

### 4. Maxsus Ustun Ko‘rinishidagi Custom Dropdown (Brauzer standart `<select>` menyusi o‘rniga)
- Brauzerning standart noqulay oq/ko‘k `<select>` popoveri o‘rniga maxsus ishlab chiqilgan `.custom-select-wrapper` komponenti:
  * Dumaloq burchaklar (`rounded-2xl`), chiroyli soyalar, hover animatsiyalari.
  * Har bir variant uchun alohida ikonka, nom va usta hisoblagichi.
  * Dark mode uchun to‘liq moslashgan qora fon va chiroyli chegaralar.
  * Tashqariga bosilganda yoki `Escape` bosilganda avtomatik yopilish.

### 5. Zamonaviy Usta Kartochkalari va Skeleton Yuklanish
- **Katta dumaloq avatar:** Rasm yuklanmasa ism bosh harflari bilan deterministik rangli fonda fallback.
- **Holat belgisi:** 🟢 "Bo‘sh" (yashil pulse effekti) yoki ⚪ "Band" (kulrang).
- **Tasdiqlanganlik nishoni:** Ko‘k check belgisi.
- **Boshlang‘ich narx:** "dan ... so‘m" ko‘rinishida.
- **Sevimli ustalar:** Yurakcha tugmasi orqali profilga saqlash.
- **Skeleton Shimmer:** Katalog yuklanganda (650 ms) va filtrlar o‘zgarganda (350 ms) kulrang silliq shimmer animatsiyasi (`aria-busy="true"`).
- **Scroll Reveal & Sanagichlar:** `IntersectionObserver` yordamida ketma-ket ochilish va 0 dan o‘suvchi raqamlar (`40+`, `1200+`, `4.8★`, `10 ta`).

### 6. Xavfsiz Autentifikatsiya va Shaxsiy Kabinetlar
- **Xavfsiz parollar:** Web Crypto API (`crypto.subtle` SHA-256 + 16-baytli salt) xeshlash.
- **Telefon maskasi:** `+998 XX XXX XX XX` avto-formatlash.
- **Mijoz profili (`profil-mijoz.html`):** Shaxsiy ma’lumotlar, Sevimli ustalar ro‘yxati, Qoldirilgan sharhlar, Chatlar tarixi va Joylashtirilgan e’lonlar.
- **Usta profili (`profil-usta.html`):** Bo‘sh / Band tumbler switch (katalogdagi kartochkani real vaqtda o‘zgartiradi), ma’lumotlarni tahrirlash, mijozlar bilan chat, sharhlar, buyurtmalar birjasi va SVG statistika diagrammasi.

---

## 📁 Fayllar Strukturasi

```
usta-top/
├── index.html            # Bosh sahifa (Hero, maxsus custom dropdown qidiruv, statistika sanagichlari)
├── elon-berish.html      # E'lon berish va buyurtmalar birjasi (Mijoz buyurtmasi + Usta takliflari)
├── ustalar.html          # Ustalar katalogi (Skeleton, tuman chiplari, filtrlash, usta kartochkalari)
├── kalkulyator.html      # Xizmatlar narxi kalkulyatori (+/- hisoblagich, taxminiy byudjet)
├── xarita.html           # Toshkent interaktiv xaritasi (Leaflet.js, 🟢 Bo'sh / ⚪ Band nuqtalar)
├── kirish.html           # Tizimga kirish sahifasi
├── royxat-mijoz.html     # Mijoz bo'lib ro'yxatdan o'tish formasi
├── profil-mijoz.html     # Mijoz kabineti (Sevimli ustalar, sharhlar, chatlar, e'lonlarim)
├── royxat-usta.html      # 3 bosqichli usta ro'yxatdan o'tishi (5s tasdiqlash simulyatsiyasi)
├── profil-usta.html      # Usta boshqaruv paneli (Bo'sh/Band tumbleri, chat inboksi, statistika)
├── 404.html              # Maxsus 404 xatolik sahifasi
├── styles.css            # Shimmer skeleton, pulse, custom-select, Leaflet popup va Dark mode stillari
├── animations.js         # Scroll Reveal, Raqam sanagichlar va Skeleton moduli
├── auth.js               # Web Crypto SHA-256 xeshlash, telefon mask, sessiya va dinamik navbar
├── common.js             # safeStorage, avatar render, buyurtmalar/tender API, custom select va chat
├── data.js               # 40 ta usta bazasi, tuman koordinatalari, kalkulyator xizmatlari
├── app.js                # Ustalar katalogi filtrlari va skeleton render mantiqi
├── narxlar.html          # kalkulyator.html ga avtomatik yo'naltiruvchi fayl
├── qanday-ishlaydi.html  # elon-berish.html ga avtomatik yo'naltiruvchi fayl
└── README.md             # Loyiha hujjatlari
```

---

## 🚀 Qanday sinab ko‘rish mumkin?

1. **Bosh sahifa va Yangi Custom Dropdownlar:**
   - `index.html` ni brauzerda oching.
   - "Xizmat turi" yoki "Toshkent tumani" ustiga bosing — brauzerning eski oq/ko‘k menyusi o‘rniga qulay, yumaloq burchakli, har bir bandida ikonka va usta hisoblagichi bo‘lgan zamonaviy vertikal ustun menyu ochilishini ko‘ring.
   - Statistika blokidagi raqamlarning 0 dan ravon o‘sib borishini kuzating.

2. **Kalkulyator (`kalkulyator.html`):**
   - Navbardagi **🧮 Kalkulyator** tugmasini bosing.
   - Santexnika yoki Elektr ishlaridagi xizmatlarning `+` tugmasini bosing (masalan: Kran almashtirish 1 dona + Tiqilishni ochish 1 dona).
   - O‘ng tomonda umumiy narx `140 000 – 220 000 so‘m` bo‘lib yangilanishini va pastdagi tugmada `"Chilonzordagi 4+ ustalarni ko‘rish →"` chiqishini ko‘ring. Bosganda filtrlar bilan katalogga o‘tadi.

3. **E’lon Berish va Buyurtmalar Birjasi (`elon-berish.html`):**
   - Navbardagi **📢 E’lon berish** tugmasini bosing.
   - Chapdagi forma orqali buyurtma qoldiring (masalan: *"Chilonzorda kran almashtirish kerak, bugun soat 18:00 ga"*), ixtiyoriy rasm tanlang.
   - E’lon darhol o‘ng tarafdagi faol e’lonlar lentasida paydo bo‘ladi.
   - E’londagi "Taklif berish" tugmasini bosib usta sifatida narx va vaqt taklif qiling, "Takliflarni ko‘rish" orqali ustalarning takliflarini ko‘ring.

4. **Toshkent Ustalar Xaritasi (`xarita.html`):**
   - Navbardagi **🗺️ Xarita** tugmasini bosing.
   - Toshkent xaritasida yashil 🟢 (Bo‘sh) va kulrang ⚪ (Band) nuqtalar chiqadi.
   - Chilonzor, Yunusobod tugmalarini bosing — xarita silliq o‘sha tumanga uchib boradi (`flyTo`).
   - Yashil nuqtani bosing — usta mini-kartochkasi ochiladi va to‘g‘ridan-to‘g‘ri "Chat" tugmasi orqali suhbat boshlash mumkin!

5. **Usta Kabineti va Bo‘sh/Band Holati:**
   - `profil-usta.html` sahifasiga kiring (yoki `kirish.html` orqali usta hisobiga kiring).
   - Yuqoridagi **Bo‘sh / Band** tumblerini o‘zgartiring. `ustalar.html` yoki `xarita.html` ga o‘tib qarasangiz, usta holati real vaqtda sinxronlashganini ko‘rasiz.
   - "Buyurtmalar birjasi" tabida mijozlarning eng yangi e’lonlarini ko‘ring.

6. **Tungi Rejim (Dark Mode):**
   - Navbardagi **☀️ / 🌙** tugmasini bosing — xarita, kalkulyator, e’lonlar va barcha forma komponentlari qora fonga chiroyli moslashadi.
