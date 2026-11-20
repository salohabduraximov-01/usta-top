// Usta-Top.uz - Umumiy yordamchi, Xavfsiz Storage, Avatar generator, Chat va 5 Yulduzli Sharh tizimi

// 0. XAVFSIZ STORAGE (Private rejim va xatoliklar uchun try/catch himoyasi)
const safeStorage = {
  getItem(key, defaultVal = null) {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? item : defaultVal;
    } catch (e) {
      console.warn('LocalStorage o‘qishda xatolik (Private rejim bo‘lishi mumkin):', e);
      return defaultVal;
    }
  },
  getJSON(key, defaultVal = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultVal;
    } catch (e) {
      console.warn('LocalStorage JSON o‘qishda xatolik:', e);
      return defaultVal;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('LocalStorage ga saqlashda xatolik:', e);
      if (typeof showToast === 'function') {
        showToast("⚠️ Brauzer xotirasiga saqlab bo‘lmadi (Private rejim yoki xotira to‘lgan)", "warning");
      }
      return false;
    }
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn('LocalStorage elementini o‘chirishda xatolik:', e);
      return false;
    }
  }
};

// XSS himoyasi uchun matnlarni xavfsiz escape qilish
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Ismning bosh harflarini olish
function getInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

// Usta/Foydalanuvchi ismiga qarab deterministik chiroyli rang tanlash
function getAvatarColor(name) {
  const colors = [
    'bg-blue-600 text-white',
    'bg-emerald-600 text-white',
    'bg-indigo-600 text-white',
    'bg-amber-600 text-white',
    'bg-rose-600 text-white',
    'bg-teal-600 text-white',
    'bg-violet-600 text-white',
    'bg-sky-600 text-white',
    'bg-orange-600 text-white'
  ];
  if (!name) return colors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

// Katta dumaloq avatar render qilish (Rasm bo'lmasa ism harflari, onerror bo'lsa fallback)
function renderAvatar(person, sizeClass = "w-16 h-16 text-lg", extraClasses = "") {
  const initials = getInitials(person.name || person.fullName || 'Usta');
  const colorClass = getAvatarColor(person.name || person.fullName || '');
  const escapedName = escapeHtml(person.name || person.fullName || 'Foydalanuvchi');

  if (person.avatar && person.avatar.trim() !== '') {
    const escapedAvatar = escapeHtml(person.avatar);
    return `
      <div class="relative ${sizeClass} rounded-full overflow-hidden flex-shrink-0 shadow-sm border-2 border-white dark:border-slate-800 ${extraClasses}">
        <img 
          src="${escapedAvatar}" 
          alt="${escapedName}" 
          class="w-full h-full object-cover"
          onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'w-full h-full rounded-full ${colorClass} flex items-center justify-center font-extrabold select-none\\'>${initials}</div>';"
        >
      </div>
    `;
  }

  return `
    <div class="${sizeClass} rounded-full ${colorClass} flex items-center justify-center font-extrabold select-none flex-shrink-0 shadow-sm border-2 border-white dark:border-slate-800 ${extraClasses}">
      <span>${initials}</span>
    </div>
  `;
}

// Telefon raqamini avtomatik +998 XX XXX XX XX formatiga keltirish
function formatPhoneNumber(value) {
  let numbers = value.replace(/\D/g, '');
  if (!numbers.startsWith('998')) {
    if (numbers.startsWith('8')) numbers = '998' + numbers.slice(1);
    else numbers = '998' + numbers;
  }
  numbers = numbers.slice(0, 12); // 998 + 9 raqam

  let res = '+998';
  if (numbers.length > 3) res += ' ' + numbers.slice(3, 5);
  if (numbers.length > 5) res += ' ' + numbers.slice(5, 8);
  if (numbers.length > 8) res += ' ' + numbers.slice(8, 10);
  if (numbers.length > 10) res += ' ' + numbers.slice(10, 12);
  return res;
}

function attachPhoneFormatter(inputEl) {
  if (!inputEl) return;
  inputEl.addEventListener('input', (e) => {
    const start = inputEl.selectionStart;
    const oldLen = inputEl.value.length;
    inputEl.value = formatPhoneNumber(inputEl.value);
    const newLen = inputEl.value.length;
    const newPos = start + (newLen - oldLen);
    try {
      inputEl.setSelectionRange(newPos, newPos);
    } catch (_) {}
  });

  inputEl.addEventListener('focus', () => {
    if (!inputEl.value.trim()) {
      inputEl.value = '+998 ';
    }
  });
}


// 1. Dark Mode boshqaruvi
function initTheme() {
  const savedTheme = safeStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcons();
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  safeStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcons();
  showToast(isDark ? "🌙 Tungi rejim (Dark mode) yoqildi" : "☀️ Kunduzgi rejim (Light mode) yoqildi", "info");
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('.theme-toggle-icon').forEach(el => {
    el.innerHTML = isDark 
      ? `<svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/></svg>`
      : `<svg class="w-5 h-5 text-slate-600 dark:text-slate-300" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>`;
  });
}

// 2. SVG Ikonlar
function getSvgIcon(name, classes = "w-5 h-5") {
  const icons = {
    wrench: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    zap: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>`,
    wind: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>`,
    cpu: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2"/><rect x="9" y="9" width="6" height="6" stroke-width="2"/><line x1="9" y1="1" x2="9" y2="4" stroke-width="2"/><line x1="15" y1="1" x2="15" y2="4" stroke-width="2"/><line x1="9" y1="20" x2="9" y2="23" stroke-width="2"/><line x1="15" y1="20" x2="15" y2="23" stroke-width="2"/><line x1="20" y1="9" x2="23" y2="9" stroke-width="2"/><line x1="20" y1="14" x2="23" y2="14" stroke-width="2"/><line x1="1" y1="9" x2="4" y2="9" stroke-width="2"/><line x1="1" y1="14" x2="4" y2="14" stroke-width="2"/></svg>`,
    hammer: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17.64 15 4.65-4.65a1.89 1.89 0 0 0 0-2.67l-3.32-3.32a1.89 1.89 0 0 0-2.67 0L11.66 9"/></svg>`,
    tool: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    grid: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" stroke-width="2"/><rect x="14" y="3" width="7" height="7" stroke-width="2"/><rect x="14" y="14" width="7" height="7" stroke-width="2"/><rect x="3" y="14" width="7" height="7" stroke-width="2"/></svg>`,
    star: `<svg class="${classes}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`,
    starOutline: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`,
    checkBadge: `<svg class="${classes}" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`,
    chat: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`,
    send: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>`,
    mapPin: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    briefcase: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke-width="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" stroke-width="2"/></svg>`,
    info: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><line x1="12" y1="16" x2="12" y2="12" stroke-width="2"/><line x1="12" y1="8" x2="12.01" y2="8" stroke-width="2"/></svg>`,
    close: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
    check: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" stroke-width="2"/></svg>`,
    heart: `<svg class="${classes}" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    heartOutline: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
    user: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`,
    logout: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>`
  };
  return icons[name] || '';
}

// 3. Mobil Menyu
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// 4. Toast xabarlar
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-emerald-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-amber-600 text-white',
    error: 'bg-rose-600 text-white'
  };

  const icons = {
    success: '✓',
    info: 'ℹ',
    warning: '⚠',
    error: '✕'
  };

  toast.className = `animate-toast flex items-center space-x-2.5 px-4 py-3 rounded-2xl shadow-xl font-medium text-sm mb-3 pointer-events-auto ${bgColors[type] || bgColors.success}`;
  toast.innerHTML = `<span class="font-bold text-base">${icons[type] || '•'}</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}


// 5. SEVIMLI USTALAR (Favorites) BOSHQARUVI
function getFavoritesList() {
  return safeStorage.getJSON('favorite_masters', []);
}

function isMasterFavorite(masterId) {
  const favs = getFavoritesList();
  return favs.includes(Number(masterId));
}

function toggleFavoriteMaster(masterId, e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  const id = Number(masterId);
  let favs = getFavoritesList();
  let added = false;

  if (favs.includes(id)) {
    favs = favs.filter(favId => favId !== id);
    added = false;
  } else {
    favs.push(id);
    added = true;
  }

  safeStorage.setItem('favorite_masters', favs);

  // Yurakcha ikonlarini yangilash
  document.querySelectorAll(`[data-fav-master-id="${id}"]`).forEach(btn => {
    btn.innerHTML = added 
      ? getSvgIcon('heart', 'w-5 h-5 text-rose-500 fill-current')
      : getSvgIcon('heartOutline', 'w-5 h-5 text-slate-400 dark:text-slate-500 hover:text-rose-500');
    btn.setAttribute('title', added ? "Sevimlilardan o‘chirish" : "Sevimlilarga saqlash");
  });

  showToast(
    added ? "❤️ Usta sevimlilar ro‘yxatiga qo‘shildi" : "🤍 Usta sevimlilardan olib tashlandi", 
    added ? "success" : "info"
  );

  // Agar mijoz profilida bo'lsa
  if (typeof renderCustomerFavoritesTab === 'function') {
    renderCustomerFavoritesTab();
  }
}


// 6. SAYT ICHIDAGI CHAT / BOG'LANISH TIZIMI
let activeChatMasterId = null;

function getChatHistory(masterId) {
  const allChats = safeStorage.getJSON('user_chats', {});
  return allChats[masterId] || [
    { sender: 'master', text: `Assalomu alaykum! Men bilan bog‘langaningizdan xursandman. Qanday nosozlik bo‘ldi va Toshkentning qaysi manziliga borish kerak?`, time: 'Hozir' }
  ];
}

function saveChatMessage(masterId, sender, text) {
  const allChats = safeStorage.getJSON('user_chats', {});
  if (!allChats[masterId]) allChats[masterId] = [];
  allChats[masterId].push({ 
    sender, 
    text: text.trim(), 
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    timestamp: Date.now()
  });
  safeStorage.setItem('user_chats', allChats);
}

function openChatModal(masterId) {
  activeChatMasterId = masterId;
  const allMasters = typeof getAllMasters === 'function' ? getAllMasters() : (typeof MASTERS_DATA !== 'undefined' ? MASTERS_DATA : []);
  const master = allMasters.find(m => m.id === Number(masterId));
  if (!master) return;

  const container = document.getElementById('chatModalContainer') || document.getElementById('callModalContainer');
  if (!container) return;

  const history = getChatHistory(masterId);

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onclick="if(event.target === this) closeChatModal()">
      <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full h-[580px] max-h-[90vh] shadow-2xl border border-slate-200 dark:border-slate-800 animate-slide-up flex flex-col overflow-hidden relative">
        
        <!-- Chat Header -->
        <div class="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="relative">
              ${renderAvatar(master, 'w-12 h-12 text-sm', '')}
              <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" title="Onlayn"></span>
            </div>
            <div>
              <div class="flex items-center space-x-1">
                <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white">${escapeHtml(master.name)}</h3>
                <span class="text-blue-500" title="Tekshirilgan usta">${getSvgIcon('checkBadge', 'w-4 h-4')}</span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">${escapeHtml(master.profession)}</p>
              <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">● Hozir saytda onlayn</span>
            </div>
          </div>

          <button onclick="closeChatModal()" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer" aria-label="Yopish">
            ${getSvgIcon('close', 'w-5 h-5')}
          </button>
        </div>

        <!-- Chat Xabarlari maydoni -->
        <div id="chatMessagesBox" class="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-950/40">
          ${history.length === 0 ? `
            <div class="text-center py-12 text-slate-400 text-xs">
              ${getSvgIcon('chat', 'w-8 h-8 mx-auto mb-2 opacity-50')}
              <span>Suhbat tarixi bo‘sh. Xabar yozib usta bilan bog‘laning.</span>
            </div>
          ` : history.map(msg => `
            <div class="flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}">
              <div class="max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm ${
                msg.sender === 'user' 
                  ? 'bg-[#1E3A8A] text-white rounded-br-sm' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-sm shadow-sm'
              }">
                <p class="leading-relaxed whitespace-pre-wrap">${escapeHtml(msg.text)}</p>
              </div>
              <span class="text-[10px] text-slate-400 mt-1 px-1">${escapeHtml(msg.time || '')}</span>
            </div>
          `).join('')}
        </div>

        <!-- Tezkor murojaat namunalari -->
        <div class="px-3 py-1.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
          <button type="button" onclick="quickFillMessage('Assalomu alaykum! Kranimdan suv oqyapti, bugun kela olasizmi?')" class="bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-[#1E3A8A] dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-xl whitespace-nowrap transition cursor-pointer">
            💧 Suv toshdi
          </button>
          <button type="button" onclick="quickFillMessage('Salom! Rozetka kuydi va chiroq o‘chdi, shoshilinch yordam kerak.')" class="bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-[#1E3A8A] dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-xl whitespace-nowrap transition cursor-pointer">
            ⚡ Tok o‘chdi
          </button>
          <button type="button" onclick="quickFillMessage('Konditsionerni yuvish va freon to‘ldirish qancha bo‘ladi?')" class="bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-[#1E3A8A] dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-xl whitespace-nowrap transition cursor-pointer">
            ❄️ Konditsioner
          </button>
        </div>

        <!-- Xabar yuborish formasi -->
        <form onsubmit="handleChatSubmit(event)" class="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
          <input 
            type="text" 
            id="chatInputMessage"
            required 
            placeholder="Xabaringizni yozing (masalan: manzil, muammo)..." 
            class="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#1E3A8A] dark:focus:border-blue-500"
          >
          <button 
            type="submit" 
            class="bg-[#1E3A8A] hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-3 rounded-2xl shadow-md transition active:scale-95 flex-shrink-0 cursor-pointer"
            title="Yuborish"
          >
            ${getSvgIcon('send', 'w-5 h-5')}
          </button>
        </form>

      </div>
    </div>
  `;

  scrollChatToBottom();
}

function quickFillMessage(text) {
  const input = document.getElementById('chatInputMessage');
  if (input) {
    input.value = text;
    input.focus();
  }
}

function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('chatInputMessage');
  if (!input || !input.value.trim() || !activeChatMasterId) return;

  const text = input.value.trim();
  input.value = '';

  saveChatMessage(activeChatMasterId, 'user', text);
  appendChatMessageToUI('user', text);
  scrollChatToBottom();

  // Usta tomonidan avtomatik real-vaqtda javob simulyatsiyasi (1.6 soniya ichida)
  setTimeout(() => {
    const replies = [
      "Assalomu alaykum! Xabaringizni oldim. Hozir asboblarni olib 25-30 daqiqada aytilgan manzilga yetib boraman.",
      "Xabaringiz uchun rahmat. Manzilingizni va xonadon raqamini yozib yuboring, hozir yo‘lga chiqaman.",
      "Tushundim, muammoni joyida ko‘rib, narxini kelishib tezda bartaraf qilamiz. Hozir chiqyapman!",
      "Rahmat! Ushbu nosozlikni yaxshi bilaman, zarur ehtiyot qismlar yonimda bor. Tez orada boraman."
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    saveChatMessage(activeChatMasterId, 'master', randomReply);
    appendChatMessageToUI('master', randomReply);
    scrollChatToBottom();
    showToast("💬 Usta sizga javob qaytardi!", "info");
  }, 1600);
}

function appendChatMessageToUI(sender, text) {
  const box = document.getElementById('chatMessagesBox');
  if (!box) return;

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const msgEl = document.createElement('div');
  msgEl.className = `flex flex-col ${sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in`;
  msgEl.innerHTML = `
    <div class="max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm ${
      sender === 'user' 
        ? 'bg-[#1E3A8A] text-white rounded-br-sm' 
        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-sm shadow-sm'
    }">
      <p class="leading-relaxed whitespace-pre-wrap">${escapeHtml(text)}</p>
    </div>
    <span class="text-[10px] text-slate-400 mt-1 px-1">${time}</span>
  `;
  box.appendChild(msgEl);
}

function scrollChatToBottom() {
  const box = document.getElementById('chatMessagesBox');
  if (box) {
    box.scrollTop = box.scrollHeight;
  }
}

function closeChatModal() {
  const container = document.getElementById('chatModalContainer') || document.getElementById('callModalContainer');
  if (container) container.innerHTML = '';
  activeChatMasterId = null;
}


// 7. 5 YULDUZLI BAHOLASH VA SHARH (KOMMENT) YOZISH TIZIMI
let currentSelectedRating = 5;

function openReviewModal(masterId) {
  const allMasters = typeof getAllMasters === 'function' ? getAllMasters() : (typeof MASTERS_DATA !== 'undefined' ? MASTERS_DATA : []);
  const master = allMasters.find(m => m.id === Number(masterId));
  if (!master) return;

  const container = document.getElementById('detailModalContainer');
  if (!container) return;

  currentSelectedRating = 5;

  // Agar mijoz tizimga kirgan bo'lsa, ismini avtomatik to'ldirish
  let defaultAuthor = '';
  if (typeof getCurrentUser === 'function') {
    const user = getCurrentUser();
    if (user && user.name) defaultAuthor = user.name;
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onclick="if(event.target === this) closeDetailModal()">
      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 animate-slide-up relative">
        
        <button onclick="closeDetailModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer" aria-label="Yopish">
          ${getSvgIcon('close', 'w-5 h-5')}
        </button>

        <div class="text-center mb-6">
          <div class="flex justify-center mb-3">
            ${renderAvatar(master, 'w-16 h-16 text-xl')}
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">${escapeHtml(master.name)}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">${escapeHtml(master.profession)} (${escapeHtml(master.district)})</p>
          <span class="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-2 block">Ustaga baho bering va fikringizni yozing</span>
        </div>

        <!-- 5 ta interaktiv yulduzcha -->
        <div class="flex items-center justify-center space-x-2 mb-6" id="starRatingSelectGroup">
          ${[1, 2, 3, 4, 5].map(star => `
            <button 
              type="button" 
              onclick="selectRating(${star})"
              onmouseover="hoverRating(${star})"
              onmouseleave="resetHoverRating()"
              class="star-btn p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
              data-star="${star}"
              aria-label="${star} yulduz"
            >
              ${getSvgIcon('star', 'w-8 h-8')}
            </button>
          `).join('')}
        </div>
        <p id="ratingLabelText" class="text-center text-xs font-bold text-amber-500 mb-4">5 yulduz - A’lo darajada!</p>

        <form onsubmit="handleReviewSubmit(event, ${master.id})" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Ismingiz</label>
            <input 
              type="text" 
              id="reviewAuthorInput" 
              required 
              value="${escapeHtml(defaultAuthor)}"
              placeholder="Masalan: Sardorbek" 
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#1E3A8A]"
            >
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Fikringiz (Sharh)</label>
            <textarea 
              id="reviewTextInput" 
              required 
              rows="3" 
              placeholder="Usta qanday ishladi? Vaqtida keldimi? Narxi ma’qul bo‘ldimi?" 
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#1E3A8A]"
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="w-full bg-[#1E3A8A] hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition active:scale-95 text-sm cursor-pointer"
          >
            Sharh va bahoni chop etish
          </button>
        </form>

      </div>
    </div>
  `;
}

function selectRating(val) {
  currentSelectedRating = val;
  updateStarsUI(val);
}

function hoverRating(val) {
  updateStarsUI(val);
}

function resetHoverRating() {
  updateStarsUI(currentSelectedRating);
}

function updateStarsUI(val) {
  const buttons = document.querySelectorAll('#starRatingSelectGroup .star-btn');
  const labels = {
    1: '1 yulduz - Yomon',
    2: '2 yulduz - Qoniqarsiz',
    3: '3 yulduz - O‘rtacha',
    4: '4 yulduz - Yaxshi',
    5: '5 yulduz - A’lo darajada!'
  };

  buttons.forEach((btn, idx) => {
    const starNum = idx + 1;
    if (starNum <= val) {
      btn.innerHTML = getSvgIcon('star', 'w-8 h-8 text-amber-400');
    } else {
      btn.innerHTML = getSvgIcon('starOutline', 'w-8 h-8 text-slate-300 dark:text-slate-600');
    }
  });

  const labelEl = document.getElementById('ratingLabelText');
  if (labelEl) labelEl.textContent = labels[val] || '';
}

function handleReviewSubmit(e, masterId) {
  e.preventDefault();
  const authorInput = document.getElementById('reviewAuthorInput');
  const textInput = document.getElementById('reviewTextInput');
  if (!authorInput || !textInput) return;

  const author = authorInput.value.trim();
  const text = textInput.value.trim();
  const allMasters = typeof getAllMasters === 'function' ? getAllMasters() : (typeof MASTERS_DATA !== 'undefined' ? MASTERS_DATA : []);
  const master = allMasters.find(m => m.id === Number(masterId));
  if (!master) return;

  const newReview = {
    author: author,
    date: 'Hozir',
    rating: currentSelectedRating,
    district: master.district || 'Toshkent',
    text: text
  };

  // 1. Usta ob'ektiga qo'shish
  if (!master.reviews) master.reviews = [];
  master.reviews.unshift(newReview);

  // 2. LocalStorage ga saqlash
  const stored = safeStorage.getJSON('user_reviews', {});
  if (!stored[masterId]) stored[masterId] = [];
  stored[masterId].unshift(newReview);
  safeStorage.setItem('user_reviews', stored);

  // 3. Reytingni qayta hisoblash
  const total = master.reviews.reduce((acc, r) => acc + r.rating, 0);
  master.rating = (total / master.reviews.length).toFixed(1);
  master.reviewsCount = master.reviews.length;

  closeDetailModal();
  showToast("🎉 Rahmat! Sharhingiz va bahoingiz muvaffaqiyatli saqlandi!", "success");

  // Agar sahifada renderMastersGrid bo'lsa yangilash
  if (typeof renderMastersGrid === 'function') {
    renderMastersGrid();
  }
}


// 8. BATAFSIL USTA PROFILI MODALI (Narxlar va Barcha sharhlar)
function openDetailModal(masterId) {
  const allMasters = typeof getAllMasters === 'function' ? getAllMasters() : (typeof MASTERS_DATA !== 'undefined' ? MASTERS_DATA : []);
  const master = allMasters.find(m => m.id === Number(masterId));
  if (!master) return;

  const container = document.getElementById('detailModalContainer');
  if (!container) return;

  const isFree = master.status !== 'busy';
  const isFav = isMasterFavorite(master.id);

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onclick="if(event.target === this) closeDetailModal()">
      <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 animate-slide-up relative p-6 sm:p-8">
        
        <div class="absolute top-5 right-5 flex items-center space-x-2 z-10">
          <button 
            type="button" 
            onclick="toggleFavoriteMaster(${master.id}, event)" 
            data-fav-master-id="${master.id}"
            class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="${isFav ? 'Sevimlilardan o‘chirish' : 'Sevimlilarga saqlash'}"
          >
            ${isFav 
              ? getSvgIcon('heart', 'w-5 h-5 text-rose-500 fill-current')
              : getSvgIcon('heartOutline', 'w-5 h-5 text-slate-400 hover:text-rose-500')}
          </button>

          <button onclick="closeDetailModal()" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer" aria-label="Yopish">
            ${getSvgIcon('close', 'w-5 h-5')}
          </button>
        </div>

        <!-- Bosh qism: Katta dumaloq avatar -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-slate-100 dark:border-slate-800 pb-6 pr-14">
          <div class="relative flex-shrink-0">
            ${renderAvatar(master, 'w-24 h-24 text-2xl', '')}
            <span class="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full border-2 border-white dark:border-slate-900" title="Tasdiqlangan usta">
              ${getSvgIcon('checkBadge', 'w-4 h-4')}
            </span>
          </div>

          <div class="text-center sm:text-left flex-1">
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 class="text-2xl font-extrabold text-slate-900 dark:text-white">${escapeHtml(master.name)}</h3>
              
              <span class="inline-flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/40 text-[#1E3A8A] dark:text-blue-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                ${getSvgIcon('checkBadge', 'w-3.5 h-3.5 text-blue-600 dark:text-blue-400')}
                <span>Tasdiqlangan</span>
              </span>

              ${isFree 
                ? `<span class="status-badge-free"><span class="status-dot-pulse"></span> Bo‘sh</span>` 
                : `<span class="status-badge-busy"><span class="w-2 h-2 rounded-full bg-slate-400"></span> Band</span>`}
            </div>

            <p class="text-slate-600 dark:text-slate-400 font-medium text-sm mt-1">${escapeHtml(master.profession)}</p>

            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs">
              <span class="flex items-center text-amber-500 font-bold bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-lg">
                ${getSvgIcon('star', 'w-4 h-4 text-amber-400 mr-1')}
                ${master.rating} (${master.reviewsCount || (master.reviews ? master.reviews.length : 0)} ta sharh)
              </span>
              <span class="flex items-center font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-lg">
                ${getSvgIcon('briefcase', 'w-4 h-4 mr-1 text-slate-500')}
                ${master.experience} yil tajriba
              </span>
              <span class="flex items-center font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-lg">
                ${getSvgIcon('check', 'w-4 h-4 mr-1')}
                ${master.completedOrders || 50}+ buyurtma
              </span>
            </div>
          </div>
        </div>

        <!-- Usta haqida -->
        <div class="py-5 border-b border-slate-100 dark:border-slate-800">
          <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Mutaxassis haqida:</h4>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${escapeHtml(master.bio || 'Professional usta xizmatlari.')}</p>
          <div class="mt-3 flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            ${getSvgIcon('mapPin', 'w-4 h-4 text-rose-500')}
            <span><strong>Xizmat ko‘rsatadigan hududlar:</strong> ${escapeHtml(Array.isArray(master.districtsServed) ? master.districtsServed.join(', ') : master.district)}</span>
          </div>
        </div>

        <!-- Preyskurant -->
        <div class="py-5 border-b border-slate-100 dark:border-slate-800">
          <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Xizmatlar narxi:</h4>
          <div class="rounded-2xl border border-slate-200 dark:border-slate-700/60 overflow-hidden text-xs sm:text-sm">
            <table class="w-full text-left">
              <thead class="bg-slate-50 dark:bg-slate-800/80 font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60">
                <tr>
                  <th class="py-2.5 px-4">Xizmat</th>
                  <th class="py-2.5 px-4">Vaqt</th>
                  <th class="py-2.5 px-4 text-right">Narxi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                ${(master.fullPriceList || master.popularServices || []).map(item => `
                  <tr>
                    <td class="py-2.5 px-4 font-medium">${escapeHtml(item.service || item.name)}</td>
                    <td class="py-2.5 px-4 text-slate-400 text-xs">${escapeHtml(item.time || 'Kelishiladi')}</td>
                    <td class="py-2.5 px-4 text-right font-bold text-[#1E3A8A] dark:text-blue-400">${escapeHtml(item.price)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Sharhlar va Fikr qoldirish -->
        <div class="py-5">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Mijozlar fikrlari (${master.reviews ? master.reviews.length : 0}):
            </h4>
            <button 
              type="button" 
              onclick="closeDetailModal(); openReviewModal(${master.id});" 
              class="text-xs font-bold text-[#F97316] hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>+ Sharh va baho qoldirish</span>
            </button>
          </div>

          <div class="space-y-3">
            ${(!master.reviews || master.reviews.length === 0) ? `
              <div class="p-6 text-center text-slate-400 text-xs bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
                <span>Hozircha sharhlar yo‘q. Birinchi bo‘lib sharh qoldiring!</span>
              </div>
            ` : master.reviews.map(r => `
              <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/40">
                <div class="flex items-center justify-between mb-1">
                  <div class="flex items-center space-x-2">
                    <span class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">${escapeHtml(r.author)}</span>
                    <span class="text-[11px] text-slate-400">(${escapeHtml(r.district || '')})</span>
                  </div>
                  <div class="flex items-center text-amber-400 text-xs font-bold">
                    ${getSvgIcon('star', 'w-3.5 h-3.5 mr-0.5')}
                    <span>${r.rating}</span>
                  </div>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-300 leading-normal">${escapeHtml(r.text)}</p>
                <span class="text-[10px] text-slate-400 block mt-1">${escapeHtml(r.date)}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Pastki harakat tugmalari -->
        <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
          <button 
            type="button" 
            onclick="closeDetailModal(); openChatModal(${master.id});" 
            class="flex-1 bg-[#1E3A8A] hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-blue-900/20 flex items-center justify-center space-x-2 transition active:scale-95 cursor-pointer text-sm"
          >
            ${getSvgIcon('chat', 'w-5 h-5')}
            <span>Usta bilan bog‘lanish (Chat)</span>
          </button>

          <button 
            type="button" 
            onclick="closeDetailModal(); openReviewModal(${master.id});" 
            class="sm:flex-initial bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition active:scale-95 cursor-pointer text-sm"
          >
            ${getSvgIcon('star', 'w-5 h-5')}
            <span>Baho berish</span>
          </button>
        </div>

      </div>
    </div>
  `;
}

function closeDetailModal() {
  const container = document.getElementById('detailModalContainer');
  if (container) container.innerHTML = '';
}


// ==========================================
// 8. E'LONLAR / TENDER TIZIMI (Jobs & Orders)
// ==========================================

const INITIAL_SAMPLE_ORDERS = [
  {
    id: 'ord_1',
    customerName: 'Sardorbek Alimov',
    customerPhone: '+998 90 345 67 89',
    category: 'santexnik',
    categoryName: 'Santexnik',
    district: 'Chilonzor',
    address: 'Chilonzor 9-mavze, 14-uy',
    title: 'Kran almashtirish va oshxona filtrini ulash',
    description: 'Oshxona smesiteli suv o‘tkazib yuboryapti, yangi kran va filtr olingan. Bugun soat 18:00 ga usta kerak.',
    budget: '100 000 – 150 000 so‘m',
    timeNeeded: 'Bugun soat 18:00 gacha',
    status: 'active',
    createdAt: 'Bugun, 14:15',
    createdAtTimestamp: Date.now() - 1000 * 60 * 120,
    bids: [
      {
        id: 'bid_1',
        masterId: 1,
        masterName: 'Akmal Karimov',
        masterAvatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
        masterRating: 4.9,
        masterDistrict: 'Chilonzor',
        price: '90 000 so‘m',
        readyTime: 'Bugun 17:30 da yetib boraman',
        comment: 'Assalomu alaykum! Kerakli hamma kalit va ulamalarim bor. 30 daqiqada sifatli o‘rnatib beraman.',
        createdAt: '1 soat oldin'
      },
      {
        id: 'bid_2',
        masterId: 2,
        masterName: 'Jamshid Toirov',
        masterAvatar: '',
        masterRating: 4.8,
        masterDistrict: 'Chilonzor',
        price: '110 000 so‘m',
        readyTime: 'Bugun 18:00 ga tayyorman',
        comment: 'Filtr bosimini ham tekshirib, kafolat bilan o‘rnatib beraman.',
        createdAt: '40 daqiqa oldin'
      }
    ]
  },
  {
    id: 'ord_2',
    customerName: 'Nilufar Rahimova',
    customerPhone: '+998 97 712 34 56',
    category: 'elektrik',
    categoryName: 'Elektrik',
    district: 'Yunusobod',
    address: 'Yunusobod 12-mavze, 22-uy',
    title: 'Zal lyustrasini o‘rnatish va 3 ta rozetka almashtirish',
    description: 'Yangi og‘ir billur lyustra ilish kerak, shift beton. 3 ta rozetkadan uchqun chiqayotgan edi, yangisiga almashtirish lozim.',
    budget: '120 000 – 180 000 so‘m',
    timeNeeded: 'Ertaga 10:00 da',
    status: 'active',
    createdAt: 'Bugun, 12:30',
    createdAtTimestamp: Date.now() - 1000 * 60 * 240,
    bids: [
      {
        id: 'bid_3',
        masterId: 5,
        masterName: 'Bobur Usmonov',
        masterAvatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
        masterRating: 4.8,
        masterDistrict: 'Yunusobod',
        price: '140 000 so‘m',
        readyTime: 'Ertaga soat 10:00 da boraman',
        comment: 'Perfartor va dubellar bor, xavfsiz qilib montaj qilamiz.',
        createdAt: '2 soat oldin'
      }
    ]
  },
  {
    id: 'ord_3',
    customerName: 'Farhod Qosimov',
    customerPhone: '+998 93 501 22 33',
    category: 'konditsioner',
    categoryName: 'Konditsioner ustasi',
    district: 'Mirzo Ulug‘bek',
    address: 'Buyuk Ipak Yo‘li ko‘chasi, 85-uy',
    title: 'Konditsionerni freon bilan to‘ldirish va dori bilan yuvish',
    description: 'Artel 12 talik konditsioner sovuq bermayapti. Ichki va tashqi blokni tozalash va freon quyish kerak.',
    budget: '200 000 – 260 000 so‘m',
    timeNeeded: 'Bugun 16:00 – 19:00 oralig‘ida',
    status: 'active',
    createdAt: 'Bugun, 11:00',
    createdAtTimestamp: Date.now() - 1000 * 60 * 300,
    bids: []
  },
  {
    id: 'ord_4',
    customerName: 'Madina Umarova',
    customerPhone: '+998 90 987 65 43',
    category: 'mebel',
    categoryName: 'Mebel yig‘uvchi',
    district: 'Yakkasaroy',
    address: 'Shota Rustaveli ko‘chasi, 45-uy',
    title: 'Yangi 3 eshikli shkaf-kupeni yig‘ish',
    description: 'Karobkada turibdi, barcha furnituralari bor. Tajribali usta kerak, eshik relslari to‘g‘ri sozlanishi lozim.',
    budget: '180 000 – 250 000 so‘m',
    timeNeeded: 'Ertaga kun davomida',
    status: 'active',
    createdAt: 'Bugun, 09:40',
    createdAtTimestamp: Date.now() - 1000 * 60 * 420,
    bids: []
  }
];

function getOrders() {
  const stored = safeStorage.getJSON('app_orders', null);
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    safeStorage.setItem('app_orders', INITIAL_SAMPLE_ORDERS);
    return INITIAL_SAMPLE_ORDERS;
  }
  return stored;
}

function saveOrder(orderData) {
  const orders = getOrders();
  const newOrder = {
    id: 'ord_' + Date.now(),
    customerName: orderData.customerName || 'Mijoz',
    customerPhone: orderData.customerPhone || '',
    category: orderData.category || 'universal',
    categoryName: orderData.categoryName || 'Boshqa xizmat',
    district: orderData.district || 'Chilonzor',
    address: orderData.address || '',
    title: orderData.title || 'Usta xizmati kerak',
    description: orderData.description || '',
    budget: orderData.budget || 'Kelishuv asosida',
    timeNeeded: orderData.timeNeeded || 'Qisqa vaqtda',
    image: orderData.image || null,
    status: 'active',
    createdAt: 'Hozir',
    createdAtTimestamp: Date.now(),
    bids: []
  };

  orders.unshift(newOrder);
  safeStorage.setItem('app_orders', orders);
  return newOrder;
}

function addOrderBid(orderId, bidData) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return false;

  if (!order.bids) order.bids = [];
  
  // Bir usta bitta buyurtmaga qayta taklif yuborsa, yangilaydi
  const existingIndex = order.bids.findIndex(b => b.masterId === bidData.masterId);
  const newBid = {
    id: 'bid_' + Date.now(),
    masterId: bidData.masterId,
    masterName: bidData.masterName,
    masterAvatar: bidData.masterAvatar || '',
    masterRating: bidData.masterRating || 5.0,
    masterDistrict: bidData.masterDistrict || '',
    price: bidData.price || 'Kelishuv asosida',
    readyTime: bidData.readyTime || 'Tez orada',
    comment: bidData.comment || '',
    createdAt: 'Hozir'
  };

  if (existingIndex >= 0) {
    order.bids[existingIndex] = newBid;
  } else {
    order.bids.unshift(newBid);
  }

  safeStorage.setItem('app_orders', orders);
  return true;
}


// ==========================================
// 9. MAXSUS USTUN KO'RINISHIDAGI SELECT (Custom Dropdown)
// Brauzerning standart noqulay <select> menyusi o'rniga
// ==========================================

function initCustomSelects() {
  document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
    // Agar allaqachon initsializatsiya qilingan bo'lsa
    if (wrapper.dataset.initialized === 'true') return;
    wrapper.dataset.initialized = 'true';

    const trigger = wrapper.querySelector('.custom-select-trigger');
    const dropdown = wrapper.querySelector('.custom-select-dropdown');
    const hiddenInput = wrapper.querySelector('input[type="hidden"]');
    const labelSpan = wrapper.querySelector('.custom-select-label');
    const iconSpan = wrapper.querySelector('.custom-select-icon');
    const arrow = wrapper.querySelector('.custom-select-arrow');

    if (!trigger || !dropdown) return;

    // Trigger bosilganda ochish/yopish
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      // Boshqa ochiq bo'lgan barcha dropdownlarni yopish
      document.querySelectorAll('.custom-select-dropdown').forEach(d => {
        if (d !== dropdown) {
          d.classList.add('hidden');
          const otherArrow = d.closest('.custom-select-wrapper')?.querySelector('.custom-select-arrow');
          if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
        }
      });

      const isOpen = !dropdown.classList.contains('hidden');
      if (isOpen) {
        dropdown.classList.add('hidden');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      } else {
        dropdown.classList.remove('hidden');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      }
    });

    // Har bir variant tanlanganda
    dropdown.querySelectorAll('.custom-select-option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = option.dataset.value;
        const text = option.dataset.label || option.innerText.trim();
        const icon = option.dataset.icon || '';

        if (hiddenInput) {
          hiddenInput.value = value;
          hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        if (labelSpan) labelSpan.textContent = text;
        if (iconSpan && icon) iconSpan.innerHTML = icon;

        // Tanlangan klassni yangilash
        dropdown.querySelectorAll('.custom-select-option').forEach(o => {
          o.classList.remove('bg-blue-50', 'dark:bg-blue-900/40', 'text-blue-600', 'dark:text-blue-400', 'font-bold');
        });
        option.classList.add('bg-blue-50', 'dark:bg-blue-900/40', 'text-blue-600', 'dark:text-blue-400', 'font-bold');

        dropdown.classList.add('hidden');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      });
    });
  });

  // Tashqariga bosilganda ochiq bo'lgan barcha dropdownlarni yopish
  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-dropdown').forEach(d => {
      d.classList.add('hidden');
      const arrow = d.closest('.custom-select-wrapper')?.querySelector('.custom-select-arrow');
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    });
  });

  // Esc bosilganda yopish
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.custom-select-dropdown').forEach(d => {
        d.classList.add('hidden');
        const arrow = d.closest('.custom-select-wrapper')?.querySelector('.custom-select-arrow');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      });
    }
  });
}

// Custom Select qiymatini dasturiy tarzda yangilash yordamchisi
function setCustomSelectValue(inputId, value) {
  const hiddenInput = document.getElementById(inputId);
  if (!hiddenInput) return;
  hiddenInput.value = value;
  const wrapper = hiddenInput.closest('.custom-select-wrapper');
  if (!wrapper) return;
  const dropdown = wrapper.querySelector('.custom-select-dropdown');
  if (!dropdown) return;
  const matchingOption = dropdown.querySelector(`.custom-select-option[data-value="${value}"]`);
  if (matchingOption) {
    const text = matchingOption.dataset.label || matchingOption.innerText.trim();
    const icon = matchingOption.dataset.icon || '';
    const labelSpan = wrapper.querySelector('.custom-select-label');
    const iconSpan = wrapper.querySelector('.custom-select-icon');
    if (labelSpan) labelSpan.textContent = text;
    if (iconSpan && icon) iconSpan.innerHTML = icon;
    dropdown.querySelectorAll('.custom-select-option').forEach(o => {
      o.classList.remove('bg-blue-50', 'dark:bg-blue-900/40', 'text-blue-600', 'dark:text-blue-400', 'font-bold');
    });
    matchingOption.classList.add('bg-blue-50', 'dark:bg-blue-900/40', 'text-blue-600', 'dark:text-blue-400', 'font-bold');
  }
}


// Boshlang'ich tema sozlash
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCustomSelects();
});
