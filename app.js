// Usta-Top.uz - Asosiy ilova mantig'i va interaktivlik

let currentFilter = {
  category: 'barchasi',
  district: 'Barcha tumanlar',
  searchQuery: '',
  sortBy: 'rating'
};

let activeMaster = null;

function getAvatarFallback(initials) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%231E3A8A"/><text x="50%" y="54%" font-family="Arial, sans-serif" font-size="34" font-weight="bold" fill="white" dominant-baseline="middle" text-anchor="middle">${initials || 'UT'}</text></svg>`;
}

// DOM tayyor bo'lganda ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initCategoryPills();
  initDropdowns();
  initMastersGrid();
  initPricingBenchmark();
  initFaqAccordion();
  initFormMasks();
  initEventListeners();
});

// Lucide SVG ikonlarini chiqarish yordamchisi
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
    checkBadge: `<svg class="${classes}" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`,
    phone: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
    telegram: `<svg class="${classes}" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.61 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.83-.27-1.49-.42-1.43-.88.03-.24.38-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.65-1.88 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.22-.05.37z"/></svg>`,
    mapPin: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    briefcase: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke-width="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" stroke-width="2"/></svg>`,
    info: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><line x1="12" y1="16" x2="12" y2="12" stroke-width="2"/><line x1="12" y1="8" x2="12.01" y2="8" stroke-width="2"/></svg>`,
    clock: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><polyline points="12 6 12 12 16 14" stroke-width="2"/></svg>`,
    shieldCheck: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
    copy: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke-width="2"/></svg>`,
    close: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`
  };

  return icons[name] || '';
}

function initIcons() {
  // Sahifadagi placeholder ikonlarni kiritish
  document.querySelectorAll('[data-icon]').forEach(el => {
    const iconName = el.getAttribute('data-icon');
    const classes = el.getAttribute('data-icon-class') || "w-5 h-5";
    el.innerHTML = getSvgIcon(iconName, classes);
  });
}

// 1-bosqich: Kategoriya pillslarini (tezkor tugmalar) render qilish
function initCategoryPills() {
  const container = document.getElementById('categoryPills');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => {
    const isActive = cat.id === currentFilter.category;
    return `
      <button 
        type="button" 
        onclick="setCategoryFilter('${cat.id}')"
        class="category-pill flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer select-none ${
          isActive 
            ? 'bg-[#1E3A8A] text-white shadow-md scale-105' 
            : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-[#1E3A8A] border border-slate-200 shadow-sm'
        }"
        data-cat-id="${cat.id}"
      >
        <span>${getSvgIcon(cat.icon, 'w-4 h-4')}</span>
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');
}

// 2-bosqich: Hero qidiruv dropdownlarini to'ldirish
function initDropdowns() {
  const catSelect = document.getElementById('heroCategorySelect');
  if (catSelect) {
    catSelect.innerHTML = CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    catSelect.value = currentFilter.category;
  }

  const distSelect = document.getElementById('heroDistrictSelect');
  if (distSelect) {
    distSelect.innerHTML = DISTRICTS.map(d => `<option value="${d}">${d}</option>`).join('');
    distSelect.value = currentFilter.district;
  }

  // Master ro'yxatdan o'tish anketasi uchun tuman va mutaxassislik
  const regCategory = document.getElementById('regCategory');
  if (regCategory) {
    regCategory.innerHTML = CATEGORIES.filter(c => c.id !== 'barchasi').map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  }

  const regDistrict = document.getElementById('regDistrict');
  if (regDistrict) {
    regDistrict.innerHTML = DISTRICTS.filter(d => d !== 'Barcha tumanlar').map(d => `<option value="${d}">${d}</option>`).join('');
  }
}

// Kategoriya bo'yicha filter o'zgartirish
window.setCategoryFilter = function(categoryId) {
  currentFilter.category = categoryId;
  const heroCat = document.getElementById('heroCategorySelect');
  if (heroCat) heroCat.value = categoryId;
  initCategoryPills();
  renderMasters();
};

// Tuman bo'yicha filter o'zgartirish
window.setDistrictFilter = function(district) {
  currentFilter.district = district;
  const heroDist = document.getElementById('heroDistrictSelect');
  if (heroDist) heroDist.value = district;
  renderMasters();
};

// Saralash o'zgartirish
window.setSortBy = function(sortKey) {
  currentFilter.sortBy = sortKey;
  renderMasters();
};

// Filtrlarni tozalash
window.resetFilters = function() {
  currentFilter = {
    category: 'barchasi',
    district: 'Barcha tumanlar',
    searchQuery: '',
    sortBy: 'rating'
  };
  const heroCat = document.getElementById('heroCategorySelect');
  const heroDist = document.getElementById('heroDistrictSelect');
  const heroSearch = document.getElementById('heroSearchInput');
  const sortSelect = document.getElementById('sortSelect');

  if (heroCat) heroCat.value = 'barchasi';
  if (heroDist) heroDist.value = 'Barcha tumanlar';
  if (heroSearch) heroSearch.value = '';
  if (sortSelect) sortSelect.value = 'rating';

  initCategoryPills();
  renderMasters();
  showToast("Barcha filtrlar tozalandi", "info");
};

// 3-bosqich: Ustalarni ro'yxat bo'yicha render qilish
function initMastersGrid() {
  renderMasters();
}

function renderMasters() {
  const grid = document.getElementById('mastersGrid');
  const countBadge = document.getElementById('resultsCountBadge');
  if (!grid) return;

  // Filtratsiya
  let filtered = MASTERS_DATA.filter(master => {
    // Kategoriya mosligi
    const catMatch = currentFilter.category === 'barchasi' || master.categoryId === currentFilter.category;
    
    // Tuman mosligi (o'z tumani yoki xizmat ko'rsatadigan tumanlari)
    const distMatch = currentFilter.district === 'Barcha tumanlar' || 
                      master.district === currentFilter.district || 
                      master.districtsServed.includes(currentFilter.district);

    // Qidiruv so'zi
    const query = currentFilter.searchQuery.toLowerCase().trim();
    let textMatch = true;
    if (query) {
      const combinedText = `${master.name} ${master.profession} ${master.district} ${master.bio} ${master.popularServices.map(s => s.name).join(' ')}`.toLowerCase();
      textMatch = combinedText.includes(query);
    }

    return catMatch && distMatch && textMatch;
  });

  // Saralash
  if (currentFilter.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentFilter.sortBy === 'experience') {
    filtered.sort((a, b) => b.experience - a.experience);
  } else if (currentFilter.sortBy === 'reviews') {
    filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  // Hisoblagich yangilash
  if (countBadge) {
    countBadge.innerText = `${filtered.length} ta usta topildi`;
  }

  // Bo'sh natija holati
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div class="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
          ${getSvgIcon('wrench', 'w-8 h-8')}
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">Ushbu parametrlar bo‘yicha usta topilmadi</h3>
        <p class="text-slate-600 mb-6 max-w-md mx-auto">Iltimos, tumanni yoki xizmat turini o‘zgartirib ko‘ring yoki barcha ustalarni ko‘rish uchun filtrlarni tozalang.</p>
        <button 
          onclick="resetFilters()"
          class="inline-flex items-center space-x-2 bg-[#1E3A8A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#172554] transition shadow-md cursor-pointer"
        >
          <span>Filtrlarni tozalash</span>
        </button>
      </div>
    `;
    return;
  }

  // Usta kartalarini chizish
  grid.innerHTML = filtered.map(master => {
    return `
      <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 card-hover-effect flex flex-col justify-between overflow-hidden">
        
        <!-- Yuqori qism: Avatar, ism, reytin va tuman -->
        <div class="p-5 pb-4">
          <div class="flex items-start space-x-4">
            <!-- Avatar rasmi -->
            <div class="relative shrink-0">
              <img 
                src="${master.avatar}" 
                alt="${master.name}" 
                class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
                loading="lazy"
                onerror="this.src='${getAvatarFallback(master.initials)}'"
              />
              <span class="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow" title="Tekshirilgan usta">
                ${getSvgIcon('checkBadge', 'w-3.5 h-3.5')}
              </span>
            </div>

            <!-- Ism va kasb -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1E3A8A] border border-blue-100">
                  <span>${getSvgIcon('checkBadge', 'w-3 h-3 text-[#1E3A8A]')}</span>
                  <span>Tekshirilgan usta</span>
                </span>
                
                ${master.urgent ? `
                  <span class="inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 badge-pulse">
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1"></span>
                    Tezkor
                  </span>
                ` : ''}
              </div>

              <h3 class="text-lg font-bold text-slate-900 mt-1 truncate hover:text-[#1E3A8A] transition cursor-pointer" onclick="openDetailModal(${master.id})">
                ${master.name}
              </h3>

              <p class="text-sm font-medium text-slate-600 truncate">
                ${master.profession}
              </p>

              <!-- Reyting va sharhlar -->
              <div class="flex items-center space-x-2 mt-2">
                <div class="flex items-center text-amber-500">
                  ${getSvgIcon('star', 'w-4 h-4')}
                  <span class="ml-1 text-sm font-bold text-slate-900">${master.rating.toFixed(1)}</span>
                </div>
                <span class="text-slate-300">•</span>
                <span class="text-xs text-slate-500 underline hover:text-[#1E3A8A] cursor-pointer" onclick="openDetailModal(${master.id})">
                  ${master.reviewsCount} ta sharh
                </span>
              </div>
            </div>
          </div>

          <!-- Tuman va Tajriba badgelari -->
          <div class="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <div class="flex items-center space-x-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
              <span class="text-slate-400">${getSvgIcon('mapPin', 'w-3.5 h-3.5')}</span>
              <span class="font-medium text-slate-700">${master.district}</span>
            </div>
            <div class="flex items-center space-x-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
              <span class="text-slate-400">${getSvgIcon('briefcase', 'w-3.5 h-3.5')}</span>
              <span class="font-medium text-slate-700">${master.experience} yil tajriba</span>
            </div>
            <div class="flex items-center space-x-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
              <span class="text-slate-400">${getSvgIcon('shieldCheck', 'w-3.5 h-3.5')}</span>
              <span class="font-medium text-slate-700">Kafolatli</span>
            </div>
          </div>

          <!-- Mini preyskurant (2-3 ta xizmat narxi) -->
          <div class="mt-4 bg-slate-50/80 rounded-xl p-3 border border-slate-100 space-y-2">
            <div class="text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1">
              Asosiy xizmatlar narxi:
            </div>
            ${master.popularServices.map(srv => `
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-700 truncate pr-2">• ${srv.name}</span>
                <span class="font-bold ${srv.price === 'Bepul' ? 'text-emerald-600' : 'text-[#1E3A8A]'} shrink-0">${srv.price}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Pastki harakat tugmalari -->
        <div class="p-5 pt-0 mt-2 space-y-2.5">
          <!-- Asosiy 2 ta harakat: Telefon va Telegram -->
          <div class="grid grid-cols-2 gap-2">
            <button 
              type="button" 
              onclick="openCallModal(${master.id})"
              class="flex items-center justify-center space-x-1.5 w-full bg-[#1E3A8A] text-white py-2.5 px-3 rounded-xl text-sm font-semibold hover:bg-[#172554] active:scale-[0.98] transition shadow-sm cursor-pointer"
            >
              <span>${getSvgIcon('phone', 'w-4 h-4')}</span>
              <span>Qo‘ng‘iroq</span>
            </button>

            <a 
              href="https://t.me/${master.telegram}?text=${encodeURIComponent(`Assalomu alaykum ${master.name}, Usta-Top.uz orqali sizga bog'lanmoqdaman.`)}"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center space-x-1.5 w-full bg-[#0088cc] hover:bg-[#0077b5] text-white py-2.5 px-3 rounded-xl text-sm font-semibold active:scale-[0.98] transition shadow-sm"
            >
              <span>${getSvgIcon('telegram', 'w-4 h-4')}</span>
              <span>Telegram</span>
            </a>
          </div>

          <!-- Batafsil / To'liq preyskurant modalini ochish -->
          <button 
            type="button" 
            onclick="openDetailModal(${master.id})"
            class="w-full flex items-center justify-center space-x-1 text-xs font-semibold py-2 text-[#1E3A8A] hover:bg-blue-50/80 rounded-xl transition cursor-pointer border border-transparent hover:border-blue-100"
          >
            <span>Batafsil / Narxlar va sharhlar</span>
            <svg class="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

      </div>
    `;
  }).join('');
}

// 4-bosqich: Qo'ng'iroq qilish modali (Telefon raqam, nusxalash, to'g'ridan-to'g'ri terish)
window.openCallModal = function(masterId) {
  const master = MASTERS_DATA.find(m => m.id === masterId);
  if (!master) return;
  activeMaster = master;

  const modalContainer = document.getElementById('callModalContainer');
  if (!modalContainer) return;

  const cleanPhone = master.phone.replace(/[^\d+]/g, '');

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onclick="closeAllModals(event)">
      <div class="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-slide-up" onclick="event.stopPropagation()">
        
        <!-- Modal sarlavhasi -->
        <div class="bg-[#1E3A8A] p-6 text-white text-center relative">
          <button 
            onclick="closeAllModals()" 
            class="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition cursor-pointer"
          >
            ${getSvgIcon('close', 'w-5 h-5')}
          </button>

          <img 
            src="${master.avatar}" 
            alt="${master.name}" 
            class="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white/20 shadow-md mb-3"
            onerror="this.src='${getAvatarFallback(master.initials)}'"
          />
          <h3 class="text-xl font-bold">${master.name}</h3>
          <p class="text-blue-100 text-sm mt-0.5">${master.profession}</p>

          <div class="inline-flex items-center space-x-1 text-xs bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-3 py-1 rounded-full mt-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Hozir aloqada (08:00 - 21:00)</span>
          </div>
        </div>

        <!-- Modal kontenti -->
        <div class="p-6 text-center space-y-5">
          <div>
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ustanining to‘g‘ridan-to‘g‘ri raqami:</span>
            <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              ${master.phone}
            </div>
          </div>

          <!-- Asosiy qo'ng'iroq va nusxa olish tugmalari -->
          <div class="space-y-3">
            <a 
              href="tel:${cleanPhone}" 
              class="flex items-center justify-center space-x-2 w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-3.5 px-6 rounded-2xl text-base font-bold shadow-lg shadow-orange-500/20 active:scale-[0.98] transition cursor-pointer"
            >
              <span>${getSvgIcon('phone', 'w-5 h-5')}</span>
              <span>Raqamga qo‘ng‘iroq qilish</span>
            </a>

            <button 
              type="button" 
              onclick="copyToClipboard('${master.phone}')"
              class="flex items-center justify-center space-x-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-6 rounded-2xl text-sm font-semibold transition cursor-pointer"
            >
              <span>${getSvgIcon('copy', 'w-4 h-4')}</span>
              <span>Raqamdan nusxa olish</span>
            </button>
          </div>

          <!-- Telegram orqali yozish muqobili -->
          <div class="pt-4 border-t border-slate-100">
            <p class="text-xs text-slate-500 mb-3">Qo‘ng‘iroq qilish noqulaymi? Telegram orqali murojaat qiling:</p>
            <a 
              href="https://t.me/${master.telegram}?text=${encodeURIComponent(`Assalomu alaykum ${master.name}, Usta-Top.uz orqali sizga bog'lanmoqdaman.`)}"
              target="_blank"
              class="inline-flex items-center space-x-2 text-sm font-bold text-[#0088cc] hover:underline"
            >
              <span>${getSvgIcon('telegram', 'w-4 h-4')}</span>
              <span>@${master.telegram} ga yozish</span>
            </a>
          </div>

          <div class="bg-blue-50/60 rounded-xl p-3 text-left flex items-start space-x-2 text-xs text-slate-600">
            <span class="text-[#1E3A8A] mt-0.5 shrink-0">${getSvgIcon('shieldCheck', 'w-4 h-4')}</span>
            <span>Usta bilan to‘g‘ridan-to‘g‘ri gaplashasiz. Vositachilik haqi yo‘q. Narxni ish boshlanishidan oldin kelishib oling.</span>
          </div>

        </div>

      </div>
    </div>
  `;

  document.body.style.overflow = 'hidden';
};

// 5-bosqich: Batafsil / Narxlar va Sharhlar modali
window.openDetailModal = function(masterId) {
  const master = MASTERS_DATA.find(m => m.id === masterId);
  if (!master) return;
  activeMaster = master;

  const modalContainer = document.getElementById('detailModalContainer');
  if (!modalContainer) return;

  const cleanPhone = master.phone.replace(/[^\d+]/g, '');

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onclick="closeAllModals(event)">
      <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-slide-up" onclick="event.stopPropagation()">
        
        <!-- Modal tepa paneli -->
        <div class="sticky top-0 z-10 bg-white border-b border-slate-100 p-4 sm:p-5 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <img 
              src="${master.avatar}" 
              alt="${master.name}" 
              class="w-12 h-12 rounded-xl object-cover border border-slate-200"
              onerror="this.src='${getAvatarFallback(master.initials)}'"
            />
            <div>
              <div class="flex items-center space-x-2">
                <h3 class="text-lg font-bold text-slate-900">${master.name}</h3>
                <span class="text-emerald-500">${getSvgIcon('checkBadge', 'w-4 h-4')}</span>
              </div>
              <p class="text-xs text-slate-500">${master.profession} • ${master.district}</p>
            </div>
          </div>

          <button 
            onclick="closeAllModals()" 
            class="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition cursor-pointer"
          >
            ${getSvgIcon('close', 'w-5 h-5')}
          </button>
        </div>

        <!-- Scroll bo'ladigan asosiy tana -->
        <div class="p-5 sm:p-6 overflow-y-auto space-y-6">

          <!-- Statistika panelchasi -->
          <div class="grid grid-cols-3 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
            <div>
              <div class="flex items-center justify-center text-amber-500 font-bold text-lg">
                ${getSvgIcon('star', 'w-5 h-5 mr-1')}
                <span>${master.rating.toFixed(1)}</span>
              </div>
              <span class="text-[11px] text-slate-500">${master.reviewsCount} ta sharh</span>
            </div>
            <div class="border-x border-slate-200">
              <div class="text-lg font-bold text-slate-900">${master.experience} yil</div>
              <span class="text-[11px] text-slate-500">Ish tajribasi</span>
            </div>
            <div>
              <div class="text-lg font-bold text-emerald-600">${master.completedOrders}+</div>
              <span class="text-[11px] text-slate-500">Bajarilgan ishlar</span>
            </div>
          </div>

          <!-- Usta haqida qisqacha bio -->
          <div>
            <h4 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Usta haqida</h4>
            <p class="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              ${master.bio}
            </p>
          </div>

          <!-- Xizmat ko'rsatish hududi -->
          <div>
            <h4 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Xizmat ko‘rsatadigan tumanlari:</h4>
            <div class="flex flex-wrap gap-2">
              ${master.districtsServed.map(dist => `
                <span class="inline-flex items-center space-x-1 text-xs bg-blue-50 text-[#1E3A8A] font-semibold px-3 py-1 rounded-lg border border-blue-100">
                  <span>${getSvgIcon('mapPin', 'w-3 h-3')}</span>
                  <span>${dist}</span>
                </span>
              `).join('')}
            </div>
          </div>

          <!-- To'liq xizmatlar narxi (Preyskurant) -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-bold text-slate-900 uppercase tracking-wider">To‘liq narxlar ro‘yxati (Preyskurant)</h4>
              <span class="text-xs text-slate-400">Shaffof narxlar</span>
            </div>

            <div class="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
              <div class="bg-slate-100/70 px-4 py-2.5 text-xs font-bold text-slate-600 flex justify-between">
                <span>Xizmat nomi</span>
                <span class="text-right">Taxminiy narx</span>
              </div>
              ${master.fullPriceList.map(item => `
                <div class="px-4 py-3 flex items-center justify-between text-sm hover:bg-slate-50 transition">
                  <div>
                    <p class="font-medium text-slate-800">${item.service}</p>
                    <span class="text-[11px] text-slate-400 flex items-center mt-0.5">
                      ${getSvgIcon('clock', 'w-3 h-3 mr-1')}
                      O‘rtacha vaqt: ${item.time}
                    </span>
                  </div>
                  <div class="font-bold ${item.price === 'Bepul' ? 'text-emerald-600' : 'text-[#1E3A8A]'} text-right ml-4 shrink-0">
                    ${item.price}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Mijozlar sharhlari -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-bold text-slate-900 uppercase tracking-wider">Mijozlar fikrlari (${master.reviews.length})</h4>
              <span class="text-xs text-amber-600 font-semibold flex items-center">
                ${getSvgIcon('star', 'w-3.5 h-3.5 mr-1')} 100% haqiqiy baholar
              </span>
            </div>

            <div class="space-y-3">
              ${master.reviews.map(rev => `
                <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="font-bold text-slate-800 text-sm">${rev.author}</span>
                    <span class="text-xs text-slate-400">${rev.date}</span>
                  </div>
                  <div class="flex items-center space-x-1 text-amber-400 mb-2">
                    ${Array.from({ length: 5 }).map((_, i) => `
                      <span class="${i < Math.floor(rev.rating) ? 'text-amber-400' : 'text-slate-300'}">
                        ${getSvgIcon('star', 'w-3.5 h-3.5')}
                      </span>
                    `).join('')}
                    <span class="text-xs font-bold text-slate-700 ml-1.5">${rev.rating}</span>
                  </div>
                  <p class="text-xs sm:text-sm text-slate-600 leading-normal">
                    "${rev.text}"
                  </p>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- Modal pastki qotirilgan tugmalar (Call & TG) -->
        <div class="sticky bottom-0 bg-white border-t border-slate-200 p-4 flex items-center space-x-3">
          <a 
            href="tel:${cleanPhone}" 
            class="flex-1 flex items-center justify-center space-x-2 bg-[#F97316] hover:bg-[#EA580C] text-white py-3 px-4 rounded-xl text-sm font-bold shadow-md shadow-orange-500/20 active:scale-[0.98] transition cursor-pointer"
          >
            <span>${getSvgIcon('phone', 'w-4 h-4')}</span>
            <span>Qo‘ng‘iroq (${master.phone})</span>
          </a>

          <a 
            href="https://t.me/${master.telegram}?text=${encodeURIComponent(`Assalomu alaykum ${master.name}, Usta-Top.uz orqali sizga bog'lanmoqdaman.`)}"
            target="_blank"
            class="flex items-center justify-center space-x-2 bg-[#0088cc] hover:bg-[#0077b5] text-white py-3 px-5 rounded-xl text-sm font-bold active:scale-[0.98] transition"
          >
            <span>${getSvgIcon('telegram', 'w-4 h-4')}</span>
            <span class="hidden sm:inline">Telegram</span>
          </a>
        </div>

      </div>
    </div>
  `;

  document.body.style.overflow = 'hidden';
};

// Modallarni yopish funksiyasi
window.closeAllModals = function(event) {
  if (event && event.target !== event.currentTarget) return;

  const callContainer = document.getElementById('callModalContainer');
  const detailContainer = document.getElementById('detailModalContainer');
  const regContainer = document.getElementById('registerModalContainer');

  if (callContainer) callContainer.innerHTML = '';
  if (detailContainer) detailContainer.innerHTML = '';
  if (regContainer) regContainer.classList.add('hidden');

  document.body.style.overflow = 'auto';
};

// 6-bosqich: Usta sifatida ro'yxatdan o'tish modali va arizasi
window.openRegisterModal = function() {
  const regContainer = document.getElementById('registerModalContainer');
  if (regContainer) {
    regContainer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
};

window.closeRegisterModal = function() {
  const regContainer = document.getElementById('registerModalContainer');
  if (regContainer) {
    regContainer.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
};

window.handleRegisterSubmit = function(e) {
  e.preventDefault();

  const form = e.target;
  const nameInput = form.querySelector('input[type="text"]');
  const phoneInput = form.querySelector('input[type="tel"]');
  const submitBtn = form.querySelector('button[type="submit"]');

  const nameVal = nameInput ? nameInput.value.trim() : '';
  const phoneVal = phoneInput ? phoneInput.value.trim() : '';

  if (!nameVal) {
    showToast("Iltimos, ism-familiyangizni kiriting", "error");
    if (nameInput) nameInput.focus();
    return;
  }

  if (!phoneVal || phoneVal.length < 17) {
    showToast("Iltimos, telefon raqamingizni to'liq kiriting (+998 ...)", "error");
    if (phoneInput) phoneInput.focus();
    return;
  }

  // Tugmada loading holati
  const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Yuborish';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Yuborilmoqda...
    `;
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }

    // Formani tozalash
    form.reset();

    // Modalni yopish
    closeRegisterModal();

    // Katta muvaffaqiyat xabari oynasi
    showRegistrationSuccessModal(nameVal, phoneVal);
  }, 700);
};

function showRegistrationSuccessModal(name, phone) {
  const container = document.getElementById('callModalContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onclick="closeAllModals(event)">
      <div class="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6 sm:p-8 text-center animate-slide-up" onclick="event.stopPropagation()">
        
        <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        </div>

        <h3 class="text-2xl font-extrabold text-slate-900">Arizangiz qabul qilindi!</h3>
        <p class="text-slate-600 mt-2 text-sm leading-relaxed">
          Hurmatli <strong>${name}</strong>, ma’lumotlaringiz muvaffaqiyatli yozib olindi. Moderatorimiz 15-30 daqiqa ichida <strong>${phone}</strong> raqamingizga qo‘ng‘iroq qilib, profilingizni faollashtiradi.
        </p>

        <div class="bg-blue-50 text-[#1E3A8A] rounded-xl p-3 text-xs mt-4">
          Usta-Top.uz orqali Toshkent bo‘ylab har kuni yuzlab mijozlar usta topmoqda!
        </div>

        <button 
          onclick="closeAllModals()" 
          class="mt-6 w-full bg-[#1E3A8A] hover:bg-[#172554] text-white py-3 rounded-xl font-bold transition cursor-pointer"
        >
          Tushunarli, rahmat
        </button>

      </div>
    </div>
  `;

  document.body.style.overflow = 'hidden';
}

// 7-bosqich: Toshkent bozoridagi narxlar preyskuranti (Xizmatlar narxi jadvali)
function initPricingBenchmark() {
  const container = document.getElementById('pricingBenchmarkContainer');
  if (!container) return;

  container.innerHTML = PRICING_BENCHMARK.map(cat => {
    return `
      <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center">
              ${getSvgIcon(cat.icon, 'w-5 h-5')}
            </div>
            <h4 class="text-base font-bold text-slate-900">${cat.category}</h4>
          </div>

          <div class="space-y-3">
            ${cat.items.map(item => `
              <div class="flex items-center justify-between text-xs sm:text-sm py-1.5 border-b border-slate-100 last:border-0">
                <span class="text-slate-600">${item.name}</span>
                <span class="font-bold text-[#1E3A8A] shrink-0 ml-2">${item.range}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="mt-5 pt-3 border-t border-slate-100">
          <button 
            type="button" 
            onclick="quickSearchCategory('${cat.category}')"
            class="text-xs font-bold text-[#F97316] hover:text-[#EA580C] flex items-center space-x-1 cursor-pointer"
          >
            <span>Ushbu yo‘nalishdagi ustalarni ko‘rish</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.quickSearchCategory = function(catName) {
  let mappedId = 'barchasi';
  if (catName.includes('Santexnika')) mappedId = 'santexnik';
  else if (catName.includes('Elektr')) mappedId = 'elektrik';
  else if (catName.includes('Iqlim') || catName.includes('konditsioner')) mappedId = 'konditsioner';
  else if (catName.includes('Maishiy')) mappedId = 'maishiy';
  else if (catName.includes('Mebel')) mappedId = 'mebel';
  else if (catName.includes('soatlik')) mappedId = 'universal';

  setCategoryFilter(mappedId);

  // Ustalarga silliq o'tish
  const el = document.getElementById('mastersSection');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// 8-bosqich: FAQ Accordion
function initFaqAccordion() {
  const container = document.getElementById('faqContainer');
  if (!container) return;

  container.innerHTML = FAQS.map((faq, idx) => {
    return `
      <div class="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all duration-200">
        <button 
          type="button" 
          onclick="toggleFaq(${idx})" 
          class="w-full text-left p-5 flex items-center justify-between font-bold text-slate-800 hover:text-[#1E3A8A] transition cursor-pointer"
        >
          <span class="text-sm sm:text-base">${faq.question}</span>
          <svg id="faqIcon-${idx}" class="w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="faqContent-${idx}" class="hidden px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
          ${faq.answer}
        </div>
      </div>
    `;
  }).join('');
}

window.toggleFaq = function(idx) {
  const content = document.getElementById(`faqContent-${idx}`);
  const icon = document.getElementById(`faqIcon-${idx}`);
  if (!content) return;

  const isHidden = content.classList.contains('hidden');
  if (isHidden) {
    content.classList.remove('hidden');
    icon.classList.add('rotate-180', 'text-[#1E3A8A]');
  } else {
    content.classList.add('hidden');
    icon.classList.remove('rotate-180', 'text-[#1E3A8A]');
  }
};

// 9-bosqich: Telefon raqam maskasi (+998 (90) 123-45-67)
function initFormMasks() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
      if (!x) return;

      if (!x[1]) {
        e.target.value = '+998';
        return;
      }

      let formatted = '+998';
      if (x[2]) formatted += ' (' + x[2];
      if (x[3]) formatted += ') ' + x[3];
      if (x[4]) formatted += '-' + x[4];
      if (x[5]) formatted += '-' + x[5];

      e.target.value = formatted;
    });

    input.addEventListener('focus', (e) => {
      if (!e.target.value) {
        e.target.value = '+998 (';
      }
    });
  });
}

// 10-bosqich: Matndan nusxa olish yordamchisi
window.copyToClipboard = function(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Telefon raqami nusxalandi!", "success");
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
};

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast("Telefon raqami nusxalandi!", "success");
  } catch (err) {
    showToast("Nusxalab bo‘lmadi", "error");
  }
  document.body.removeChild(textArea);
}

// 11-bosqich: Toast bildirishnoma tizimi
window.showToast = function(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-slate-900 text-white' : type === 'error' ? 'bg-rose-600 text-white' : 'bg-[#1E3A8A] text-white';

  toast.className = `flex items-center space-x-2.5 px-4 py-3 rounded-2xl shadow-xl text-sm font-medium ${bg} animate-toast mb-2 z-50 pointer-events-auto`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : 'ℹ'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// 12-bosqich: Event listenerlar (Qidiruv, Dropdown, Menu)
function initEventListeners() {
  const catSelect = document.getElementById('heroCategorySelect');
  const distSelect = document.getElementById('heroDistrictSelect');
  const searchInput = document.getElementById('heroSearchInput');

  // Hero dropdownlar o'zgarganda darhol filtrlash
  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      currentFilter.category = e.target.value;
      initCategoryPills();
      renderMasters();
    });
  }

  if (distSelect) {
    distSelect.addEventListener('change', (e) => {
      currentFilter.district = e.target.value;
      renderMasters();
    });
  }

  // Hero Qidiruv formasi (Usta qidirish tugmasi bosilganda)
  const heroForm = document.getElementById('heroSearchForm');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();

      currentFilter.category = catSelect ? catSelect.value : 'barchasi';
      currentFilter.district = distSelect ? distSelect.value : 'Barcha tumanlar';
      currentFilter.searchQuery = searchInput ? searchInput.value : '';

      initCategoryPills();
      renderMasters();

      const el = document.getElementById('mastersSection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Live Search Input (Real vaqtli qidiruv)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilter.searchQuery = e.target.value;
      renderMasters();
    });
  }

  // Saralash dropdowni
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      setSortBy(e.target.value);
    });
  }

  // Mobil navigatsiya menyusi
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Escape klavishi bilan modallarni yopish
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}
