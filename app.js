// Usta-Top.uz - Ustalar katalogi interaktiv mantig'i, Skeleton yuklanish va zamonaviy tuman filtrlari

let currentFilter = {
  category: 'barchasi',
  district: 'Barcha tumanlar',
  searchQuery: '',
  sortBy: 'rating',
  urgentOnly: false
};

let isInitialLoad = true;
let filterTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
  readUrlParameters();
  initCategoryPills();
  initDistrictChips();
  initSortButtons();
  initUrgentButton();
  initSearchInput();
  
  // Dastlabki yuklanishda 650 ms skeleton ko'rsatish
  loadMastersWithSkeleton(650);
});

// URL parametrlarini o'qish
function readUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const cat = urlParams.get('cat');
  const district = urlParams.get('district');
  const q = urlParams.get('q');

  if (cat && CATEGORIES.some(c => c.id === cat)) {
    currentFilter.category = cat;
  }
  if (district && DISTRICTS.includes(district)) {
    currentFilter.district = district;
  }
  if (q) {
    currentFilter.searchQuery = q;
  }
}

// 1. Kategoriya tugmalari (Pills)
function initCategoryPills() {
  const container = document.getElementById('categoryPills');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => {
    const isActive = cat.id === currentFilter.category;
    return `
      <button 
        type="button" 
        onclick="setCategoryFilter('${cat.id}')"
        class="category-pill flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer select-none ${
          isActive 
            ? 'bg-[#1E3A8A] dark:bg-blue-600 text-white shadow-lg shadow-blue-900/20 scale-105' 
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 shadow-sm'
        }"
        data-cat-id="${cat.id}"
      >
        <span>${getSvgIcon(cat.icon, 'w-4 h-4')}</span>
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');
}

function setCategoryFilter(categoryId) {
  if (currentFilter.category === categoryId) return;
  currentFilter.category = categoryId;
  initCategoryPills();
  loadMastersWithSkeleton(350);
  updateUrlParams();
}

// 2. Tuman tanlash uchun Zamonaviy Chiplar
function initDistrictChips() {
  const container = document.getElementById('districtChipsContainer');
  if (!container) return;

  const allMasters = typeof getAllMasters === 'function' ? getAllMasters() : MASTERS_DATA;

  container.innerHTML = DISTRICTS.map(districtName => {
    const isActive = districtName === currentFilter.district;
    
    let count = 0;
    if (districtName === 'Barcha tumanlar') {
      count = allMasters.length;
    } else {
      count = allMasters.filter(m => 
        (m.district && m.district.toLowerCase() === districtName.toLowerCase()) || 
        (Array.isArray(m.districtsServed) && m.districtsServed.some(d => d.toLowerCase() === districtName.toLowerCase()))
      ).length;
    }

    return `
      <button 
        type="button" 
        onclick="setDistrictFilter('${districtName}')"
        class="group flex items-center space-x-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none ${
          isActive 
            ? 'bg-[#F97316] text-white shadow-md shadow-orange-500/25 scale-105 border border-transparent' 
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#F97316]/50 border border-slate-200/80 dark:border-slate-700 shadow-sm'
        }"
      >
        <span class="${isActive ? 'text-white' : 'text-rose-500'}">📍</span>
        <span>${districtName}</span>
        <span class="ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${
          isActive 
            ? 'bg-white/20 text-white' 
            : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-600'
        }">${count}</span>
      </button>
    `;
  }).join('');
}

function setDistrictFilter(districtName) {
  if (currentFilter.district === districtName) return;
  currentFilter.district = districtName;
  initDistrictChips();
  loadMastersWithSkeleton(350);
  updateUrlParams();
}

// 3. SARALASH TUGMALARI
function initSortButtons() {
  updateSortButtonsUI();
}

function setSortFilter(sortBy) {
  if (currentFilter.sortBy === sortBy) return;
  currentFilter.sortBy = sortBy;
  updateSortButtonsUI();
  loadMastersWithSkeleton(300);
}

function updateSortButtonsUI() {
  const sortOptions = ['rating', 'orders', 'experience'];
  sortOptions.forEach(opt => {
    const btn = document.getElementById(`sortBtn-${opt}`);
    if (!btn) return;
    const isActive = currentFilter.sortBy === opt;
    if (isActive) {
      btn.className = "sort-btn px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 bg-[#1E3A8A] text-white shadow-md shadow-blue-900/20 scale-105 cursor-pointer";
    } else {
      btn.className = "sort-btn px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-700 transition cursor-pointer";
    }
  });
}

// 4. SHOSHILINCH TOGGLE TUGMASI
function initUrgentButton() {
  updateUrgentButtonUI();
}

function toggleUrgentBtn() {
  currentFilter.urgentOnly = !currentFilter.urgentOnly;
  updateUrgentButtonUI();
  loadMastersWithSkeleton(300);
}

function updateUrgentButtonUI() {
  const btn = document.getElementById('urgentToggleBtn');
  if (!btn) return;

  if (currentFilter.urgentOnly) {
    btn.className = "flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl text-xs font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30 scale-105 border border-transparent transition-all cursor-pointer";
    btn.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
      <span>⚡ Shoshilinch: Yoqildi</span>
    `;
  } else {
    btn.className = "flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-orange-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all cursor-pointer";
    btn.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-slate-400"></span>
      <span>⚡ Shoshilinch (25 daq)</span>
    `;
  }
}

// 5. Matnli qidiruv
function initSearchInput() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  input.value = currentFilter.searchQuery;

  let debounceTimer;
  input.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      currentFilter.searchQuery = e.target.value.trim().toLowerCase();
      loadMastersWithSkeleton(300);
      updateUrlParams();
    }, 250);
  });
}

// 6. Filtrlarni tozalash
function resetFilters() {
  currentFilter = {
    category: 'barchasi',
    district: 'Barcha tumanlar',
    searchQuery: '',
    sortBy: 'rating',
    urgentOnly: false
  };

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  initCategoryPills();
  initDistrictChips();
  updateSortButtonsUI();
  updateUrgentButtonUI();
  loadMastersWithSkeleton(350);
  updateUrlParams();
  showToast("✓ Barcha filtrlar tozalandi", "info");
}

function updateUrlParams() {
  const url = new URL(window.location);
  if (currentFilter.category !== 'barchasi') {
    url.searchParams.set('cat', currentFilter.category);
  } else {
    url.searchParams.delete('cat');
  }

  if (currentFilter.district !== 'Barcha tumanlar') {
    url.searchParams.set('district', currentFilter.district);
  } else {
    url.searchParams.delete('district');
  }

  if (currentFilter.searchQuery) {
    url.searchParams.set('q', currentFilter.searchQuery);
  } else {
    url.searchParams.delete('q');
  }

  window.history.replaceState({}, '', url);
}

// SKELETON BILAN YUKLASH FUNKSIYASI (600-800ms boshida, 300-400ms filtrda)
function loadMastersWithSkeleton(delayMs = 350) {
  const grid = document.getElementById('mastersGrid');
  if (!grid) return;

  if (typeof renderMastersSkeleton === 'function') {
    renderMastersSkeleton(grid, 6);
  } else {
    grid.innerHTML = '<div class="col-span-full py-12 text-center text-slate-400">Yuklanmoqda...</div>';
  }

  if (filterTimeout) clearTimeout(filterTimeout);

  filterTimeout = setTimeout(() => {
    grid.removeAttribute('aria-busy');
    grid.removeAttribute('aria-label');
    renderMastersGrid();
    isInitialLoad = false;
  }, delayMs);
}


// 7. Ustalar ro'yxatini filtrlash va render qilish
function renderMastersGrid() {
  const grid = document.getElementById('mastersGrid');
  const countBadge = document.getElementById('resultsCountBadge');
  const activeFiltersContainer = document.getElementById('activeFiltersIndicator');
  if (!grid) return;

  // Barcha ustalarni olish (data.js + LocalStorage'dagi yangi ustalar)
  const allMasters = typeof getAllMasters === 'function' ? getAllMasters() : MASTERS_DATA;

  let filtered = allMasters.filter(master => {
    // Kategoriya
    if (currentFilter.category !== 'barchasi' && master.categoryId !== currentFilter.category) {
      return false;
    }

    // Tuman
    if (currentFilter.district !== 'Barcha tumanlar') {
      const matchDistrict = (master.district && master.district.toLowerCase() === currentFilter.district.toLowerCase()) || 
        (Array.isArray(master.districtsServed) && master.districtsServed.some(d => d.toLowerCase() === currentFilter.district.toLowerCase()));
      if (!matchDistrict) return false;
    }

    // Shoshilinch
    if (currentFilter.urgentOnly && !master.urgent) {
      return false;
    }

    // Qidiruv
    if (currentFilter.searchQuery) {
      const q = currentFilter.searchQuery.toLowerCase();
      const inName = (master.name || '').toLowerCase().includes(q);
      const inProf = (master.profession || '').toLowerCase().includes(q);
      const inBio = (master.bio || '').toLowerCase().includes(q);
      const inServices = Array.isArray(master.popularServices) && master.popularServices.some(s => (s.name || '').toLowerCase().includes(q));
      if (!inName && !inProf && !inBio && !inServices) return false;
    }

    return true;
  });

  // Saralash
  if (currentFilter.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating || (b.reviewsCount || 0) - (a.reviewsCount || 0));
  } else if (currentFilter.sortBy === 'orders') {
    filtered.sort((a, b) => (b.completedOrders || 0) - (a.completedOrders || 0));
  } else if (currentFilter.sortBy === 'experience') {
    filtered.sort((a, b) => (b.experience || 0) - (a.experience || 0));
  }

  // Natijalar hisoblagichi
  if (countBadge) {
    countBadge.textContent = `${filtered.length} ta mutaxassis topildi`;
  }

  // Faol filtrlar ko'rsatkichi
  if (activeFiltersContainer) {
    const hasActiveFilters = currentFilter.category !== 'barchasi' || 
                             currentFilter.district !== 'Barcha tumanlar' || 
                             currentFilter.searchQuery || 
                             currentFilter.urgentOnly;

    if (hasActiveFilters) {
      activeFiltersContainer.classList.remove('hidden');
      activeFiltersContainer.innerHTML = `
        <div class="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Faol filtrlar:</span>
            ${currentFilter.category !== 'barchasi' ? `<span class="inline-flex items-center space-x-1 bg-blue-50 dark:bg-blue-950/60 text-[#1E3A8A] dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/70 px-2.5 py-1 rounded-xl font-bold"><span>Kategoriya:</span> <strong class="underline">${CATEGORIES.find(c => c.id === currentFilter.category)?.name}</strong></span>` : ''}
            ${currentFilter.district !== 'Barcha tumanlar' ? `<span class="inline-flex items-center space-x-1 bg-orange-50 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-200/70 dark:border-orange-800/70 px-2.5 py-1 rounded-xl font-bold"><span>📍 Tuman:</span> <strong>${currentFilter.district}</strong></span>` : ''}
            ${currentFilter.searchQuery ? `<span class="inline-flex items-center space-x-1 bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800/70 px-2.5 py-1 rounded-xl font-bold"><span>Qidiruv:</span> <em>"${escapeHtml(currentFilter.searchQuery)}"</em></span>` : ''}
            ${currentFilter.urgentOnly ? `<span class="inline-flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/70 px-2.5 py-1 rounded-xl font-bold">⚡ Shoshilinch</span>` : ''}
          </div>
          
          <button 
            type="button" 
            onclick="resetFilters()" 
            class="inline-flex items-center space-x-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer ml-auto"
            title="Barcha filtrlarni tozalash"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            <span>Filtrni tozalash ✕</span>
          </button>
        </div>
      `;
    } else {
      activeFiltersContainer.classList.add('hidden');
    }
  }

  // 4. BO'SH HOLAT VA XATOLAR (Chiroyli SVG illyustratsiya va tugmalar)
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 px-6 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm animate-fade-in max-w-2xl mx-auto">
        <div class="w-24 h-24 mx-auto mb-5 rounded-3xl bg-blue-50 dark:bg-slate-800/80 flex items-center justify-center text-[#1E3A8A] dark:text-blue-400">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10 9v3m0 3h.01"/>
          </svg>
        </div>
        
        <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          ${currentFilter.district !== 'Barcha tumanlar' ? `"${escapeHtml(currentFilter.district)}" tumanida hozircha usta topilmadi` : 'Ushbu parametrlar bo‘yicha usta topilmadi'}
        </h3>
        
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
          Kiritilgan qidiruv so‘zi yoki tuman bo‘yicha hozircha bo‘sh mutaxassislar yo‘q. Boshqa tumanlarni ko‘rib chiqing yoki filtrlarni tozalang.
        </p>
        
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button 
            type="button" 
            onclick="setDistrictFilter('Barcha tumanlar')" 
            class="bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-[#1E3A8A] dark:text-blue-300 border border-blue-200 dark:border-blue-800/70 font-bold py-2.5 px-5 rounded-xl text-xs transition cursor-pointer"
          >
            📍 Boshqa tumanni sinab ko‘ring
          </button>

          <button 
            type="button" 
            onclick="resetFilters()" 
            class="bg-[#1E3A8A] hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-md transition cursor-pointer"
          >
            ✕ Filtrni tozalash
          </button>
        </div>
      </div>
    `;
    return;
  }

  // USTA KARTOCHKALARINI GENERATSIYA QILISH
  grid.innerHTML = filtered.map((master, idx) => {
    const isFree = master.status !== 'busy';
    const startingPrice = typeof getMasterStartingPrice === 'function' 
      ? getMasterStartingPrice(master) 
      : '40 000 so‘m';

    const fullStars = Math.floor(master.rating);
    const starIcons = Array.from({ length: 5 }, (_, i) => {
      return i < fullStars 
        ? `<svg class="w-3.5 h-3.5 text-amber-400 fill-current inline" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
        : `<svg class="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 fill-current inline" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    }).join('');

    const latestReview = master.reviews && master.reviews.length > 0 ? master.reviews[0] : null;
    const isFav = typeof isMasterFavorite === 'function' ? isMasterFavorite(master.id) : false;

    return `
      <div 
        class="reveal bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 card-hover-effect flex flex-col justify-between transition-all"
        style="transition-delay: ${(idx % 6) * 90}ms;"
      >
        
        <div>
          <!-- Usta bosh qismi: Katta dumaloq avatar va status -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center space-x-3.5">
              
              <!-- Katta dumaloq avatar (Rasm bo'lmasa ism harflari rangli fonda) -->
              <div class="relative flex-shrink-0">
                ${renderAvatar(master, 'w-16 h-16 text-lg', '')}
                <span class="absolute -bottom-0.5 -right-0.5 w-4 h-4 ${isFree ? 'bg-emerald-500' : 'bg-slate-400'} rounded-full border-2 border-white dark:border-slate-900" title="${isFree ? 'Bo‘sh' : 'Band'}"></span>
              </div>

              <div>
                <div class="flex items-center space-x-1.5">
                  <h3 class="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                    ${escapeHtml(master.name)}
                  </h3>
                </div>
                
                <p class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  ${escapeHtml(master.profession)}
                </p>
                
                <div class="flex items-center space-x-1 text-slate-400 text-xs mt-1">
                  <span class="text-rose-500 font-bold">📍</span>
                  <span class="text-slate-700 dark:text-slate-300 font-semibold">${escapeHtml(master.district)}</span>
                </div>
              </div>

            </div>

            <!-- Sevimli (Yurakcha) tugmasi -->
            <button 
              type="button" 
              onclick="toggleFavoriteMaster(${master.id}, event)"
              data-fav-master-id="${master.id}"
              class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex-shrink-0"
              title="${isFav ? 'Sevimlilardan o‘chirish' : 'Sevimlilarga saqlash'}"
              aria-label="Sevimli"
            >
              ${isFav 
                ? getSvgIcon('heart', 'w-5 h-5 text-rose-500 fill-current') 
                : getSvgIcon('heartOutline', 'w-5 h-5 text-slate-400 hover:text-rose-500')}
            </button>
          </div>

          <!-- Belgilar qatori: Holat (Bo'sh/Band), Tasdiqlangan va Narx "dan ... so'm" -->
          <div class="mt-4 flex flex-wrap items-center gap-2">
            
            <!-- Holat belgisi -->
            ${isFree ? `
              <span class="status-badge-free">
                <span class="status-dot-pulse"></span>
                <span>Bo‘sh</span>
              </span>
            ` : `
              <span class="status-badge-busy">
                <span class="w-2 h-2 rounded-full bg-slate-400"></span>
                <span>Band</span>
              </span>
            `}

            <!-- Tasdiqlangan belgisi -->
            <span class="inline-flex items-center space-x-1 bg-blue-50 dark:bg-blue-950/50 text-[#1E3A8A] dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/60 px-2 py-0.5 rounded-full text-[11px] font-bold">
              ${getSvgIcon('checkBadge', 'w-3.5 h-3.5 text-blue-600 dark:text-blue-400')}
              <span>Tasdiqlangan</span>
            </span>

            <!-- Narx: "dan ... so'm" -->
            <span class="inline-flex items-center text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full ml-auto">
              dan ${escapeHtml(startingPrice)}
            </span>
          </div>

          <!-- Reyting va tajriba ko'rsatkichlari -->
          <div class="mt-3.5 flex items-center justify-between text-xs">
            <div class="flex items-center space-x-1.5">
              <span class="flex items-center space-x-0.5">${starIcons}</span>
              <span class="font-extrabold text-amber-500">${master.rating}</span>
              <span class="text-slate-400 text-[11px]">(${master.reviewsCount || (master.reviews ? master.reviews.length : 0)} ta sharh)</span>
            </div>

            <span class="text-slate-500 dark:text-slate-400 text-[11px] font-medium">
              ${master.experience} yil tajriba
            </span>
          </div>

          <!-- Asosiy xizmatlar namunalari -->
          <div class="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Xizmatlar:</span>
            ${(master.popularServices || []).slice(0, 2).map(s => `
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-600 dark:text-slate-400 truncate pr-2">${escapeHtml(s.name)}</span>
                <span class="font-bold text-[#1E3A8A] dark:text-blue-400 whitespace-nowrap">${escapeHtml(s.price)}</span>
              </div>
            `).join('')}
          </div>

          <!-- Mijozning oxirgi sharhi (Komment) preview -->
          ${latestReview ? `
            <div class="mt-3 p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[11px]">
              <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-0.5">
                <span class="font-bold text-slate-800 dark:text-slate-200">💬 ${escapeHtml(latestReview.author)}:</span>
                <span class="text-amber-400">★ ${latestReview.rating}</span>
              </div>
              <p class="text-slate-600 dark:text-slate-400 line-clamp-1 italic">"${escapeHtml(latestReview.text)}"</p>
            </div>
          ` : ''}

        </div>

        <!-- Pastki Tugmalar bloki -->
        <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          
          <button 
            type="button" 
            onclick="openChatModal(${master.id})" 
            class="w-full bg-[#1E3A8A] hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-2xl shadow-md shadow-blue-900/20 text-xs sm:text-sm flex items-center justify-center space-x-2 transition active:scale-95 cursor-pointer"
          >
            ${getSvgIcon('chat', 'w-4 h-4')}
            <span>Usta bilan bog‘lanish (Chat)</span>
          </button>

          <div class="grid grid-cols-2 gap-2">
            <button 
              type="button" 
              onclick="openReviewModal(${master.id})" 
              class="w-full bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 font-bold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 transition cursor-pointer"
            >
              <svg class="w-3.5 h-3.5 fill-current text-amber-500" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span>Baho / Komment</span>
            </button>

            <button 
              type="button" 
              onclick="openDetailModal(${master.id})" 
              class="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 transition cursor-pointer"
            >
              ${getSvgIcon('info', 'w-3.5 h-3.5 text-slate-400')}
              <span>Barcha narxlar</span>
            </button>
          </div>

        </div>

      </div>
    `;
  }).join('');

  // Dinamik qo'shilgan reveal elementlarni kuzatuvchiga ulash
  if (typeof observeReveals === 'function') {
    observeReveals(grid);
  }
}
