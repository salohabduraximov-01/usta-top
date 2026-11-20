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
  const result = await hashPasswordWithSalt(inputPassword, storedSalt);
  return result.hash === storedHash;
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
    return { score: 3, label: 'O‘rtacha parol', color: 'bg-blue-500', width: '75%' };
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
  return safeStorage.getJSON('app_users', []);
}

function findUserByPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  const users = getAllUsers();
  return users.find(u => u.phone.replace(/\D/g, '') === cleaned);
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
  const navContainer = document.querySelector('header .hidden.md\\:flex.items-center.space-x-3\\.5');
  const mobileContainer = document.getElementById('mobileMenu');

  // Desktop Navbar
  if (navContainer) {
    // Mavjud theme toggle tugmasini saqlab qolish
    const themeBtnHTML = `
      <button 
        type="button" 
        onclick="toggleTheme()" 
        class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-sm cursor-pointer"
        title="Tungi / Kunduzgi rejim"
      >
        <span class="theme-toggle-icon flex items-center justify-center"></span>
      </button>
    `;

    if (user) {
      const profileLink = user.role === 'master' ? 'profil-usta.html' : 'profil-mijoz.html';
      const initials = typeof getInitials === 'function' ? getInitials(user.name) : 'U';
      const colorClass = typeof getAvatarColor === 'function' ? getAvatarColor(user.name) : 'bg-blue-600 text-white';

      navContainer.innerHTML = `
        ${themeBtnHTML}
        
        <!-- Foydalanuvchi profil tugmasi va menyusi -->
        <div class="relative group">
          <a 
            href="${profileLink}" 
            class="flex items-center space-x-2.5 p-1.5 pr-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:border-[#1E3A8A] transition cursor-pointer"
          >
            ${user.avatar ? `
              <img src="${escapeHtml(user.avatar)}" class="w-8 h-8 rounded-full object-cover">
            ` : `
              <div class="w-8 h-8 rounded-full ${colorClass} flex items-center justify-center font-bold text-xs select-none">
                ${initials}
              </div>
            `}
            <div class="text-left">
              <span class="block text-xs font-bold text-slate-900 dark:text-white truncate max-w-[120px]">
                ${escapeHtml(user.name)}
              </span>
              <span class="block text-[10px] text-slate-400 font-semibold uppercase">
                ${user.role === 'master' ? 'Usta kabineti' : 'Mijoz profili'}
              </span>
            </div>
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </a>

          <!-- Hover Dropdown -->
          <div class="absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 hidden group-hover:block animate-fade-in z-50">
            <a href="${profileLink}" class="flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              ${getSvgIcon('user', 'w-4 h-4 text-slate-400')}
              <span>Profilim</span>
            </a>
            <div class="my-1 border-t border-slate-100 dark:border-slate-800"></div>
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
          class="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-[#1E3A8A] dark:hover:text-blue-400 px-3 py-2 transition"
        >
          Kirish
        </a>

        <div class="flex items-center space-x-2">
          <a 
            href="royxat-mijoz.html" 
            class="text-xs font-bold text-[#1E3A8A] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 px-3.5 py-2.5 rounded-xl hover:bg-blue-100 transition"
          >
            Ro‘yxatdan o‘tish
          </a>

          <a 
            href="royxat-usta.html"
            class="bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-orange-500/20 active:scale-95 transition flex items-center space-x-1.5 cursor-pointer"
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
    const bottomDiv = mobileContainer.querySelector('.pt-2.border-t');
    if (bottomDiv) {
      if (user) {
        const profileLink = user.role === 'master' ? 'profil-usta.html' : 'profil-mijoz.html';
        bottomDiv.innerHTML = `
          <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
            <div class="flex items-center space-x-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span class="text-xs font-bold text-slate-900 dark:text-white">${escapeHtml(user.name)}</span>
            </div>
            <span class="text-[10px] text-slate-400 uppercase font-bold">${user.role === 'master' ? 'Usta' : 'Mijoz'}</span>
          </div>
          <a href="${profileLink}" class="block w-full text-center py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 font-bold text-sm mb-2">
            👤 Profilim
          </a>
          <button onclick="logoutUser()" class="block w-full text-center py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 font-bold text-sm">
            🚪 Chiqish
          </button>
        `;
      } else {
        bottomDiv.innerHTML = `
          <div class="flex gap-2">
            <a href="kirish.html" class="flex-1 text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-800 dark:text-slate-200">
              Kirish
            </a>
            <a href="royxat-mijoz.html" class="flex-1 text-center py-2.5 rounded-xl bg-[#1E3A8A] text-white font-bold text-sm shadow">
              Mijoz bo‘lish
            </a>
          </div>
          <a href="royxat-usta.html" class="block mt-2 w-full text-center py-2.5 rounded-xl bg-[#F97316] text-white font-bold text-sm shadow">
            + Usta bo‘lib qo‘shilish
          </a>
        `;
      }
    }
  }
}

// Boshlang'ich navbarni yangilash
document.addEventListener('DOMContentLoaded', () => {
  updateNavbarAuthUI();
});
