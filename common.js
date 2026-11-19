// Usta-Top.uz - Umumiy yordamchi, Dark Mode, Sayt ichidagi Chat va 5 Yulduzli Sharh tizimi

// 1. Dark Mode boshqaruvi
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
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
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
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
    check: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" stroke-width="2"/></svg>`
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

  toast.className = `animate-toast flex items-center space-x-2.5 px-4 py-3 rounded-2xl shadow-xl font-medium text-sm mb-3 pointer-events-auto ${bgColors[type] || bgColors.success}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// 5. SAYT ICHIDAGI CHAT / BOG'LANISH TIZIMI
let activeChatMasterId = null;

function getChatHistory(masterId) {
  try {
    const allChats = JSON.parse(localStorage.getItem('user_chats') || '{}');
    return allChats[masterId] || [
      { sender: 'master', text: `Assalomu alaykum! Men bilan bog‘langaningizdan xursandman. Qanday nosozlik bo‘ldi va Toshkentning qaysi manziliga borish kerak?`, time: 'Hozir' }
    ];
  } catch (e) {
    return [];
  }
}

function saveChatMessage(masterId, sender, text) {
  try {
    const allChats = JSON.parse(localStorage.getItem('user_chats') || '{}');
    if (!allChats[masterId]) allChats[masterId] = [];
    allChats[masterId].push({ sender, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    localStorage.setItem('user_chats', JSON.stringify(allChats));
  } catch (e) {
    console.error(e);
  }
}

function openChatModal(masterId) {
  activeChatMasterId = masterId;
  const master = MASTERS_DATA.find(m => m.id === masterId);
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
              <img src="${master.avatar}" alt="${master.name}" class="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700">
              <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" title="Onlayn"></span>
            </div>
            <div>
              <div class="flex items-center space-x-1">
                <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white">${master.name}</h3>
                <span class="text-blue-500">${getSvgIcon('checkBadge', 'w-4 h-4')}</span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">${master.profession}</p>
              <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">● Hozir saytda onlayn</span>
            </div>
          </div>

          <button onclick="closeChatModal()" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            ${getSvgIcon('close', 'w-5 h-5')}
          </button>
        </div>

        <!-- Chat Xabarlari maydoni -->
        <div id="chatMessagesBox" class="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-950/40">
          ${history.map(msg => `
            <div class="flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}">
              <div class="max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm ${
                msg.sender === 'user' 
                  ? 'bg-[#1E3A8A] text-white rounded-br-sm' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-sm shadow-sm'
              }">
                <p class="leading-relaxed whitespace-pre-wrap">${msg.text}</p>
              </div>
              <span class="text-[10px] text-slate-400 mt-1 px-1">${msg.time || ''}</span>
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

  // Usta tomonidan avtomatik real-vaqtda javob simulyatsiyasi (2 soniya ichida)
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
  }, 1800);
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
      <p class="leading-relaxed whitespace-pre-wrap">${text}</p>
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


// 6. 5 YULDUZLI BAHOLASH VA SHARH (KOMMENT) YOZISH TIZIMI
let currentSelectedRating = 5;

function openReviewModal(masterId) {
  const master = MASTERS_DATA.find(m => m.id === masterId);
  if (!master) return;

  const container = document.getElementById('detailModalContainer');
  if (!container) return;

  currentSelectedRating = 5;

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onclick="if(event.target === this) closeDetailModal()">
      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 animate-slide-up relative">
        
        <button onclick="closeDetailModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          ${getSvgIcon('close', 'w-5 h-5')}
        </button>

        <div class="text-center mb-6">
          <img src="${master.avatar}" alt="${master.name}" class="w-16 h-16 rounded-2xl object-cover mx-auto mb-3 border-2 border-primary/20 dark:border-blue-400/20">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">${master.name}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">${master.profession} (${master.district})</p>
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
            >
              ${getSvgIcon('star', 'w-8 h-8')}
            </button>
          `).join('')}
        </div>
        <p id="ratingLabelText" class="text-center text-xs font-bold text-amber-500 mb-4">5 yulduz - A’lo darajada!</p>

        <form onsubmit="handleReviewSubmit(event, ${master.id})" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Ismingiz</label>
            <input type="text" id="reviewAuthorInput" required placeholder="Masalan: Sardorbek" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#1E3A8A]">
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Fikringiz (Sharh)</label>
            <textarea id="reviewTextInput" required rows="3" placeholder="Usta qanday ishladi? Vaqtida keldimi? Narxi ma’qul bo‘ldimi?" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#1E3A8A]"></textarea>
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
  const master = MASTERS_DATA.find(m => m.id === masterId);
  if (!master) return;

  const newReview = {
    author: author,
    date: 'Hozir',
    rating: currentSelectedRating,
    district: master.district,
    text: text
  };

  // 1. Bazaga qo'shish
  master.reviews.unshift(newReview);

  // 2. LocalStorage ga saqlash
  try {
    const stored = JSON.parse(localStorage.getItem('user_reviews') || '{}');
    if (!stored[masterId]) stored[masterId] = [];
    stored[masterId].unshift(newReview);
    localStorage.setItem('user_reviews', JSON.stringify(stored));
  } catch (err) {
    console.error(err);
  }

  // 3. Reytingni qayta hisoblash
  const total = master.reviews.reduce((acc, r) => acc + r.rating, 0);
  master.rating = (total / master.reviews.length).toFixed(1);
  master.reviewsCount = master.reviews.length;

  closeDetailModal();
  showToast("🎉 Rahmat! Sharhingiz va 5 yulduzli bahoingiz muvaffaqiyatli saqlandi!", "success");

  // Agar sahifada renderMastersGrid bo'lsa yangilash
  if (typeof renderMastersGrid === 'function') {
    renderMastersGrid();
  }
}

// 7. BATAFSIL USTA PROFILI MODALI (Narxlar va Barcha sharhlar)
function openDetailModal(masterId) {
  const master = MASTERS_DATA.find(m => m.id === masterId);
  if (!master) return;

  const container = document.getElementById('detailModalContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onclick="if(event.target === this) closeDetailModal()">
      <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 animate-slide-up relative p-6 sm:p-8">
        
        <button onclick="closeDetailModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition z-10">
          ${getSvgIcon('close', 'w-5 h-5')}
        </button>

        <!-- Bosh qism -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div class="relative w-24 h-24 flex-shrink-0">
            <img src="${master.avatar}" alt="${master.name}" class="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-primary/20 dark:border-blue-400/20">
            <span class="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white dark:border-slate-900" title="Tekshirilgan">
              ${getSvgIcon('checkBadge', 'w-4 h-4')}
            </span>
          </div>

          <div class="text-center sm:text-left flex-1">
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 class="text-2xl font-extrabold text-slate-900 dark:text-white">${master.name}</h3>
              <span class="bg-blue-100 dark:bg-blue-900/40 text-[#1E3A8A] dark:text-blue-300 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                ${getSvgIcon('checkBadge', 'w-3.5 h-3.5 text-blue-600')}
                <span>Tekshirilgan usta</span>
              </span>
            </div>
            <p class="text-slate-600 dark:text-slate-400 font-medium text-sm mt-1">${master.profession}</p>

            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs">
              <span class="flex items-center text-amber-500 font-bold bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-lg">
                ${getSvgIcon('star', 'w-4 h-4 text-amber-400 mr-1')}
                ${master.rating} (${master.reviewsCount} ta sharh)
              </span>
              <span class="flex items-center font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-lg">
                ${getSvgIcon('briefcase', 'w-4 h-4 mr-1 text-slate-500')}
                ${master.experience} yil tajriba
              </span>
              <span class="flex items-center font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-lg">
                ${getSvgIcon('check', 'w-4 h-4 mr-1')}
                ${master.completedOrders}+ buyurtma
              </span>
            </div>
          </div>
        </div>

        <!-- Usta haqida -->
        <div class="py-5 border-b border-slate-100 dark:border-slate-800">
          <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Mutaxassis haqida:</h4>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${master.bio}</p>
          <div class="mt-3 flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            ${getSvgIcon('mapPin', 'w-4 h-4 text-rose-500')}
            <span><strong>Xizmat ko‘rsatadigan hududlar:</strong> ${master.districtsServed.join(', ')}</span>
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
                ${master.fullPriceList.map(item => `
                  <tr>
                    <td class="py-2.5 px-4 font-medium">${item.service}</td>
                    <td class="py-2.5 px-4 text-slate-400 text-xs">${item.time}</td>
                    <td class="py-2.5 px-4 text-right font-bold text-[#1E3A8A] dark:text-blue-400">${item.price}</td>
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
              Mijozlar fikrlari (${master.reviews.length}):
            </h4>
            <button 
              type="button" 
              onclick="closeDetailModal(); openReviewModal(${master.id});" 
              class="text-xs font-bold text-[#F97316] hover:underline flex items-center space-x-1"
            >
              <span>+ Sharh va baho qoldirish</span>
            </button>
          </div>

          <div class="space-y-3">
            ${master.reviews.map(r => `
              <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/40">
                <div class="flex items-center justify-between mb-1">
                  <div class="flex items-center space-x-2">
                    <span class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">${r.author}</span>
                    <span class="text-[11px] text-slate-400">(${r.district})</span>
                  </div>
                  <div class="flex items-center text-amber-400 text-xs font-bold">
                    ${getSvgIcon('star', 'w-3.5 h-3.5 mr-0.5')}
                    <span>${r.rating}</span>
                  </div>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-300 leading-normal">${r.text}</p>
                <span class="text-[10px] text-slate-400 block mt-1">${r.date}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Pastki harakat tugmalari: Sayt ichidagi Chat va Baholash -->
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

// 8. Usta bo'lish anketasi
function openRegisterModal() {
  const container = document.getElementById('registerModalContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onclick="if(event.target === this) closeRegisterModal()">
      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 animate-slide-up relative">
        <button onclick="closeRegisterModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          ${getSvgIcon('close', 'w-5 h-5')}
        </button>

        <div class="text-center mb-6">
          <div class="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-[#F97316] flex items-center justify-center mx-auto mb-3">
            ${getSvgIcon('wrench', 'w-6 h-6')}
          </div>
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white">Usta sifatida qo‘shiling</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Kuniga 3-5 ta yangi buyurtmalarga ega bo‘ling. 0% komissiya!</p>
        </div>

        <form onsubmit="handleRegisterSubmit(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Ism va familiyangiz</label>
            <input type="text" required placeholder="Masalan: Azizbek Aliyev" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#1E3A8A]">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Mutaxassislik</label>
              <select class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm">
                <option value="santexnik">Santexnik</option>
                <option value="elektrik">Elektrik</option>
                <option value="konditsioner">Konditsioner ustasi</option>
                <option value="maishiy">Maishiy texnika</option>
                <option value="mebel">Mebel yig‘uvchi</option>
                <option value="universal">Bir soatlik usta</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Tumaningiz</label>
              <select class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm">
                <option>Chilonzor</option>
                <option>Yunusobod</option>
                <option>Mirzo Ulug‘bek</option>
                <option>Yakkasaroy</option>
                <option>Shayxontohur</option>
                <option>Sergeli</option>
                <option>Olmazor</option>
                <option>Uchtepa</option>
                <option>Mirobod</option>
                <option>Yashnobod</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Ish tajribangiz (yil)</label>
            <input type="number" min="1" max="50" required placeholder="Masalan: 6" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#1E3A8A]">
          </div>
          <button type="submit" class="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition active:scale-95 text-sm cursor-pointer">
            Arizani yuborish
          </button>
        </form>
      </div>
    </div>
  `;
}

function closeRegisterModal() {
  const container = document.getElementById('registerModalContainer');
  if (container) container.innerHTML = '';
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  closeRegisterModal();
  showToast("🎉 Arizangiz qabul qilindi! Tez orada profilingiz faollashtiriladi.", "success");
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
});
