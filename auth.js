// Usta-Top.uz - Autentifikatsiya va Sessiya Moduli (auth.js)
// Xavfsizlik eslatmasi: Bu loyihada backend yo'qligi sababli barcha ma'lumotlar brauzerning localStorage'ida
// saqlanadi. Parollar Web Crypto API (SHA-256 + salt) yordamida xeshlanadi. 
// DIQQAT: Bu faqat demonstratsion va ta'limiy himoya! Haqiqiy production loyihada
// albatta xavfsiz backend, HTTPS, HTTP-only cookie'lar va bcrypt/Argon2 kabi server xesh algoritmlari zarur.

// 1. PAROLNI TUZ BILAN XESHLASH (SHA-256 + Salt)
async function hashPasswordWithSalt(password, salt = null) {
  if (!salt) {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    salt = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  const enc = new TextEncoder();
  const data = enc.encode(salt + password + 'usta_top_secure_pepper_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return { hash: hashHex, salt: salt };
}

async function verifyPassword(inputPassword, storedHash, storedSalt) {
  if (!storedHash) return false;

  // DEMO ONLY: demo hisoblar uchun oddiy matnli solishtirish
  if (storedHash === 'Mijoz1234' || storedHash === 'Usta1234') {
    if (inputPassword === storedHash) return true;
  }

  if (storedSalt) {
    const result = await hashPasswordWithSalt(inputPassword, storedSalt);
    if (result.hash === storedHash) return true;
  }

  // Zaxira tekshiruv (standart salt bilan)
  try {
    const fallback = await hashPasswordWithSalt(inputPassword, 'demo_salt_customer_2026');
    if (fallback.hash === storedHash) return true;
  } catch (_) {}

  return false;
}

// 2. PAROL KUCHINI BAHOLASH
function evaluatePasswordStrength(password) {
  if (!password || password.length === 0) {
    return { score: 0, label: '', color: 'bg-slate-200 dark:bg-slate-700', width: '0%' };
  }
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (password.length < 8) {
    return { score: 1, label: 'Juda qisqa (kamida 8 belgi)', color: 'bg-rose-500', width: '25%' };
  }
  if (score <= 2) {
    return { score: 2, label: 'Zaif parol', color: 'bg-amber-500', width: '50%' };
  }
  if (score === 3) {
    return { score: 3, label: 'O‘rtacha parol', color: 'bg-amber-600', width: '75%' };
  }
  return { score: 4, label: 'Kuchli parol', color: 'bg-emerald-500', width: '100%' };
}

// 3. PAROL TALABLARINI TEKSHIRISH
function validatePassword(password) {
  if (!password || password.length < 8) {
    return { valid: false, message: 'Parol kamida 8 ta belgidan iborat bo‘lishi kerak' };
  }
  if (!/[a-zA-Z]/.test(password)) {
    return { valid: false, message: 'Parolda kamida bitta harf bo‘lishi kerak' };
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: 'Parolda kamida bitta raqam bo‘lishi kerak' };
  }
  return { valid: true, message: '' };
}

// 4. TELEFON VA FOYDALANUVCHILARNI SAQLASH
function getAllUsers() {
  const users = safeStorage.getJSON('app_users', []);
  
  // registered_masters da ro'yxatdan o'tgan ustalar bo'lsa ularni ham birlashtirish
  const regMasters = safeStorage.getJSON('registered_masters', []);
  let changed = false;

  regMasters.forEach(rm => {
    if (rm && rm.phone) {
      const rmCleaned = String(rm.phone).replace(/\D/g, '').slice(-9);
      if (!users.some(u => u.phone && String(u.phone).replace(/\D/g, '').slice(-9) === rmCleaned)) {
        users.push(rm);
        changed = true;
      }
    }
  });

  // Standart qulay demo akkauntlar
  const defaultDemoAccounts = [
    {
      id: 999901,
      role: 'customer',
      name: 'Salohiddin Abduraximov',
      phone: '+998 90 123 45 67',
      district: 'Chilonzor',
      passwordHash: 'Mijoz1234',
      passwordSalt: 'demo_salt_customer_2026',
      createdAt: '1-noyabr, 2026'
    },
    {
      id: 999902,
      role: 'master',
      name: 'Akmal Karimov',
      phone: '+998 97 765 43 21',
      profession: 'Santexnik va isitish mutaxassisi',
      categoryId: 'santexnik',
      district: 'Chilonzor',
      districtsServed: ['Chilonzor', 'Uchtepa', 'Yakkasaroy'],
      experience: 8,
      startingPrice: "80 000 so'mdan",
      rating: 4.9,
      reviewsCount: 142,
      completedOrders: 530,
      status: 'free',
      verified: true,
      passwordHash: 'Usta1234',
      passwordSalt: 'demo_salt_customer_2026',
      createdAt: '1-noyabr, 2026'
    }
  ];

  defaultDemoAccounts.forEach(demo => {
    const demoCleaned = demo.phone.replace(/\D/g, '').slice(-9);
    if (!users.some(u => u.phone && String(u.phone).replace(/\D/g, '').slice(-9) === demoCleaned)) {
      users.push(demo);
      changed = true;
    }
  });

  if (changed) {
    safeStorage.setItem('app_users', users);
  }

  return users;
}

function findUserByPhone(phone) {
  if (!phone) return null;
  const cleaned = String(phone).replace(/\D/g, '');
  const last9 = cleaned.slice(-9); // Oxirgi 9 ta raqam (masalan: 901234567)
  const users = getAllUsers();
  
  return users.find(u => {
    if (!u || !u.phone) return false;
    const uCleaned = String(u.phone).replace(/\D/g, '');
    const uLast9 = uCleaned.slice(-9);
    return (cleaned.length >= 7 && uCleaned === cleaned) || (last9.length >= 7 && uLast9 === last9);
  }) || null;
}

function saveUser(userObj) {
  const users = getAllUsers();
  const existingIdx = users.findIndex(u => u.id === userObj.id);
  if (existingIdx >= 0) {
    users[existingIdx] = userObj;
  } else {
    users.push(userObj);
  }
  safeStorage.setItem('app_users', users);
}

// Eslab qolingan login va parolni boshqarish
function getRememberedLogin() {
  return safeStorage.getJSON('remembered_login', null);
}

function setRememberedLogin(phone) {
  if (phone) {
    safeStorage.setItem('remembered_login', {
      phone: String(phone).trim()
    });
  }
}

function clearRememberedLogin() {
  safeStorage.removeItem('remembered_login');
}

// 5. SESSIYA BOSHQARUVI
function getCurrentUser() {
  const session = safeStorage.getJSON('current_session', null);
  if (!session || !session.userId) return null;
  const users = getAllUsers();
  return users.find(u => u.id === session.userId) || null;
}

function setCurrentSession(user) {
  const sessionData = {
    userId: user.id,
    role: user.role, // 'customer' yoki 'master'
    name: user.name,
    phone: user.phone,
    loginTime: Date.now()
  };
  safeStorage.setItem('current_session', sessionData);
  updateNavbarAuthUI();
}

function logoutUser() {
  safeStorage.removeItem('current_session');
  showToast("👋 Tizimdan chiqdingiz", "info");
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 400);
}

// Akkauntni butunlay o'chirish (Mijoz va Usta uchun)
function deleteCurrentAccount() {
  const user = getCurrentUser();
  if (!user) return;

  const id = Number(user.id);

  // 1. Agar usta bo'lsa deleted_master_ids ga qo'shish
  if (user.role === 'master' || typeof deleteMasterAccountPermanently === 'function') {
    let deletedIds = safeStorage.getJSON('deleted_master_ids', []);
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      safeStorage.setItem('deleted_master_ids', deletedIds);
    }

    // registered_masters dan olib tashlash
    let regList = safeStorage.getJSON('registered_masters', []);
    regList = regList.filter(m => m.id !== id);
    safeStorage.setItem('registered_masters', regList);
  }

  // 2. app_users dan olib tashlash
  let usersList = safeStorage.getJSON('app_users', []);
  usersList = usersList.filter(u => u.id !== id);
  safeStorage.setItem('app_users', usersList);

  // 3. Eslab qolingan loginni ham o'chirish
  safeStorage.removeItem('remembered_login');

  // 4. Sessiyani tozalash
  safeStorage.removeItem('current_session');

  showToast("🗑️ Profilingiz va barcha ma’lumotlaringiz butunlay o‘chirildi", "info");
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 700);
}

// Himoyalangan sahifalar uchun yo'naltirish
function requireAuth(allowedRole = null) {
  const user = getCurrentUser();
  if (!user) {
    showToast("Iltimos, avval tizimga kiring", "warning");
    setTimeout(() => {
      window.location.href = 'kirish.html?redirect=' + encodeURIComponent(window.location.pathname);
    }, 300);
    return null;
  }
  if (allowedRole && user.role !== allowedRole) {
    showToast("Ushbu sahifaga kirish huquqingiz yo‘q", "error");
    setTimeout(() => {
      window.location.href = user.role === 'master' ? 'profil-usta.html' : 'profil-mijoz.html';
    }, 400);
    return null;
  }
  return user;
}


// 6. NAVBAR AUTH UI YANGILASH (Barcha sahifalar uchun mos)
function updateNavbarAuthUI() {
  const user = getCurrentUser();
  const navContainer = document.querySelector('header div.hidden.md\\:flex.items-center');
  const mobileContainer = document.getElementById('mobileMenu');

  // Desktop Navbar
  if (navContainer) {
    // Mavjud theme toggle tugmasini saqlab qolish
    const themeBtnHTML = `
      <button 
        type="button" 
        onclick="toggleTheme()" 
        class="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-subtle)] transition shadow-sm cursor-pointer"
        title="Tungi / Kunduzgi rejim"
      >
        <span class="theme-toggle-icon flex items-center justify-center"></span>
      </button>
    `;

    if (user) {
      const profileLink = user.role === 'master' ? 'profil-usta.html' : 'profil-mijoz.html';
      const initials = typeof getInitials === 'function' ? getInitials(user.name) : 'U';
      const colorClass = typeof getAvatarColor === 'function' ? getAvatarColor(user.name) : 'bg-[#0F172A] text-white';

      navContainer.innerHTML = `
        ${themeBtnHTML}
        
        <!-- Foydalanuvchi profil tugmasi va menyusi -->
        <div class="relative group">
          <a 
            href="${profileLink}" 
            class="flex items-center space-x-2.5 p-1.5 pr-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--accent)] transition cursor-pointer"
          >
            ${user.avatar ? `
              <img src="${escapeHtml(user.avatar)}" class="w-8 h-8 rounded-full object-cover">
            ` : `
              <div class="w-8 h-8 rounded-full ${colorClass} flex items-center justify-center font-bold text-xs select-none">
                ${initials}
              </div>
            `}
            <div class="text-left">
              <span class="block text-xs font-bold text-[var(--text-primary)] truncate max-w-[120px]">
                ${escapeHtml(user.name)}
              </span>
              <span class="block text-[10px] text-[var(--text-tertiary)] font-semibold uppercase">
                ${user.role === 'master' ? 'Usta kabineti' : 'Mijoz profili'}
              </span>
            </div>
            <svg class="w-4 h-4 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </a>

          <!-- Hover Dropdown -->
          <div class="absolute right-0 top-full mt-1.5 w-48 bg-[var(--surface)] rounded-2xl shadow-xl border border-[var(--border-subtle)] p-2 hidden group-hover:block animate-fade-in z-50">
            <a href="${profileLink}" class="flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] transition">
              ${getSvgIcon('user', 'w-4 h-4 text-[var(--text-tertiary)]')}
              <span>Profilim</span>
            </a>
            <div class="my-1 border-t border-[var(--border-subtle)]"></div>
            <button onclick="logoutUser()" class="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition text-left cursor-pointer">
              ${getSvgIcon('logout', 'w-4 h-4 text-rose-500')}
              <span>Chiqish</span>
            </button>
          </div>
        </div>
      `;
    } else {
      navContainer.innerHTML = `
        ${themeBtnHTML}
        
        <a 
          href="kirish.html" 
          class="text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2 transition"
        >
          Kirish
        </a>

        <div class="flex items-center space-x-2">
          <a 
            href="royxat-mijoz.html" 
            class="text-xs font-bold text-[var(--text-primary)] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] px-3.5 py-2.5 rounded-xl hover:bg-[var(--surface)] hover:border-[var(--border-strong)] transition"
          >
            Ro‘yxatdan o‘tish
          </a>

          <a 
            href="royxat-usta.html"
            class="bg-[#FF5512] hover:bg-[#EA4606] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-orange-500/20 active:scale-95 transition flex items-center space-x-1.5 cursor-pointer"
          >
            <span>+ Usta bo‘lish</span>
          </a>
        </div>
      `;
    }

    if (typeof updateThemeIcons === 'function') updateThemeIcons();
  }

  // Mobil menyu
  if (mobileContainer) {
    let bottomDiv = mobileContainer.querySelector('.pt-2.border-t, .border-t');
    if (!bottomDiv) {
      bottomDiv = document.createElement('div');
      bottomDiv.className = 'pt-2 border-t border-[var(--border-subtle)] mt-2';
      mobileContainer.appendChild(bottomDiv);
    }
    
    if (user) {
      const profileLink = user.role === 'master' ? 'profil-usta.html' : 'profil-mijoz.html';
      bottomDiv.innerHTML = `
        <div class="flex items-center justify-between py-2 border-b border-[var(--border-subtle)] mb-2">
          <div class="flex items-center space-x-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span class="text-xs font-bold text-[var(--text-primary)]">${escapeHtml(user.name)}</span>
          </div>
          <span class="text-[10px] text-[var(--text-tertiary)] uppercase font-bold">${user.role === 'master' ? 'Usta' : 'Mijoz'}</span>
        </div>
        <a href="${profileLink}" class="block w-full text-center py-2.5 rounded-xl bg-[var(--surface-subtle)] text-[var(--text-primary)] font-bold text-sm mb-2">
          👤 Profilim
        </a>
        <button onclick="logoutUser()" class="block w-full text-center py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 font-bold text-sm">
          🚪 Chiqish
        </button>
      `;
    } else {
      bottomDiv.innerHTML = `
        <div class="flex gap-2">
          <a href="kirish.html" class="flex-1 text-center py-2.5 rounded-xl border border-[var(--border-subtle)] font-bold text-sm text-[var(--text-primary)]">
            Kirish
          </a>
          <a href="royxat-mijoz.html" class="flex-1 text-center py-2.5 rounded-xl bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold text-sm shadow">
            Mijoz bo‘lish
          </a>
        </div>
        <a href="royxat-usta.html" class="block mt-2 w-full text-center py-2.5 rounded-xl bg-[#FF5512] text-white font-bold text-sm shadow">
          + Usta bo‘lib qo‘shilish
        </a>
      `;
    }
  }
}

// Boshlang'ich navbarni yangilash
document.addEventListener('DOMContentLoaded', () => {
  updateNavbarAuthUI();
});
