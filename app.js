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
  
  // Dastlabki yuklanishda tezkor 80 ms skeleton
  loadMastersWithSkeleton(80);
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
        onclick="setCategoryFilter('${escapeHtml(cat.id)}')"
        class="category-pill flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer select-none ${
          isActive 
            ? 'bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] shadow-xs' 
            : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-subtle)] border border-[var(--border-subtle)] shadow-2xs'
        }"
        data-cat-id="${escapeHtml(cat.id)}"
      >
        <span>${getSvgIcon(cat.icon, 'w-4 h-4')}</span>
        <span>${escapeHtml(cat.name)}</span>
      </button>
    `;
  }).join('');
}

function setCategoryFilter(categoryId) {
  if (currentFilter.category === categoryId) return;
  currentFilter.category = categoryId;
  initCategoryPills();
  renderMastersGrid();
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

    const safeDistrict = escapeHtml(districtName);
    return `
      <button 
        type="button" 
        onclick="setDistrictFilter('${safeDistrict}')"
        class="group flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer select-none ${
          isActive 
            ? 'bg-[#FF5512] text-white shadow-xs border border-transparent' 
            : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] border border-[var(--border-subtle)] shadow-2xs'
        }"
      >
        <span class="${isActive ? 'text-white' : 'text-[var(--text-tertiary)]'}">📍</span>
        <span>${safeDistrict}</span>
        <span class="ml-1 text-[10px] px-1.5 py-0.2 rounded-md ${
          isActive 
            ? 'bg-white/20 text-white' 
            : 'bg-[var(--surface-subtle)] text-[var(--text-tertiary)] group-hover:bg-[var(--border-subtle)]'
        }">${count}</span>
      </button>
    `;
  }).join('');
}

function setDistrictFilter(districtName) {
  if (currentFilter.district === districtName) return;
  currentFilter.district = districtName;
  initDistrictChips();
  renderMastersGrid();
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
  renderMastersGrid();
}

function updateSortButtonsUI() {
  const sortOptions = ['rating', 'orders', 'experience'];
  sortOptions.forEach(opt => {
    const btn = document.getElementById(`sortBtn-${opt}`);
    if (!btn) return;
    const isActive = currentFilter.sortBy === opt;
    if (isActive) {
      btn.className = "sort-btn px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A] shadow-md scale-105 cursor-pointer";
    } else {
      btn.className = "sort-btn px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] transition cursor-pointer";
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
  renderMastersGrid();
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
      renderMastersGrid();
      updateUrlParams();
    }, 100);
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
  renderMastersGrid();
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

// SKELETON BILAN YUKLASH FUNKSIYASI (Tezkor va yengil)
function loadMastersWithSkeleton(delayMs = 80) {
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
      const activeCat = CATEGORIES.find(c => c.id === currentFilter.category);
      activeFiltersContainer.innerHTML = `
        <div class="p-3 bg-[var(--surface)] rounded-2xl border border-[var(--border-subtle)] shadow-sm flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[var(--text-tertiary)] font-bold uppercase tracking-wider text-[10px]">Faol filtrlar:</span>
            ${currentFilter.category !== 'barchasi' && activeCat ? `<span class="inline-flex items-center space-x-1 bg-[var(--surface-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] px-2.5 py-1 rounded-xl font-bold"><span>Kategoriya:</span> <strong class="underline">${escapeHtml(activeCat.name)}</strong></span>` : ''}
            ${currentFilter.district !== 'Barcha tumanlar' ? `<span class="inline-flex items-center space-x-1 bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/30 px-2.5 py-1 rounded-xl font-bold"><span>📍 Tuman:</span> <strong>${escapeHtml(currentFilter.district)}</strong></span>` : ''}
            ${currentFilter.searchQuery ? `<span class="inline-flex items-center space-x-1 bg-[var(--surface-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] px-2.5 py-1 rounded-xl font-bold"><span>Qidiruv:</span> <em>"${escapeHtml(currentFilter.searchQuery)}"</em></span>` : ''}
            ${currentFilter.urgentOnly ? `<span class="inline-flex items-center space-x-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-xl font-bold">⚡ Shoshilinch</span>` : ''}
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
      <div class="col-span-full py-16 px-6 text-center bg-[var(--surface)] rounded-3xl border border-[var(--border-subtle)] shadow-sm animate-fade-in max-w-2xl mx-auto">
        <div class="w-20 h-20 mx-auto mb-5 rounded-3xl bg-[var(--surface-subtle)] flex items-center justify-center text-[var(--text-tertiary)]">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10 9v3m0 3h.01"/>
          </svg>
        </div>
        
        <h3 class="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
          ${currentFilter.district !== 'Barcha tumanlar' ? `"${escapeHtml(currentFilter.district)}" tumanida hozircha usta topilmadi` : 'Ushbu parametrlar bo‘yicha usta topilmadi'}
        </h3>
        
        <p class="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-md mx-auto leading-relaxed">
          Kiritilgan qidiruv so‘zi yoki tuman bo‘yicha hozircha bo‘sh mutaxassislar yo‘q. Boshqa tumanlarni ko‘rib chiqing yoki filtrlarni tozalang.
        </p>
        
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button 
            type="button" 
            onclick="setDistrictFilter('Barcha tumanlar')" 
            class="bg-[var(--surface-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] font-bold py-2.5 px-5 rounded-xl text-xs transition cursor-pointer"
          >
            📍 Boshqa tumanni sinab ko‘ring
          </button>

          <button 
            type="button" 
            onclick="resetFilters()" 
            class="btn-primary py-2.5 px-6 rounded-xl text-xs shadow-md transition cursor-pointer"
          >
            ✕ Filtrni tozalash
          </button>
        </div>
      </div>
    `;
    return;
  }

  // USTA KARTOCHKALARINI GENERATSIYA QILISH (Modern Architectural Layout)
  grid.innerHTML = filtered.map((master, idx) => {
    const isFree = master.status !== 'busy';
    const startingPrice = typeof getMasterStartingPrice === 'function' 
      ? getMasterStartingPrice(master) 
      : '40 000 so‘m';

    const latestReview = master.reviews && master.reviews.length > 0 ? master.reviews[0] : null;
    const isFav = typeof isMasterFavorite === 'function' ? isMasterFavorite(master.id) : false;

    return `
      <div 
        class="reveal card-editorial p-5 flex flex-col justify-between transition-all duration-200"
        style="transition-delay: ${(idx % 6) * 20}ms;"
      >
        <div>
          <!-- Yuqori qism: Avatar, Ism, Mutaxassislik va Sevimli -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center space-x-3.5">
              <div class="relative shrink-0">
                ${renderAvatar(master, 'w-12 h-12 text-base font-bold', 'rounded-2xl')}
                <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 ${isFree ? 'bg-emerald-500' : 'bg-slate-400'} rounded-full ring-2 ring-white dark:ring-[#14171D]" title="${isFree ? 'Bo‘sh' : 'Band'}"></span>
              </div>

              <div>
                <div class="flex items-center gap-1.5">
                  <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                    ${escapeHtml(master.name)}
                  </h3>
                  <span class="inline-flex text-emerald-500" title="Tasdiqlangan mutaxassis">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  </span>
                </div>
                
                <p class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  ${escapeHtml(master.profession)}
                </p>

                <div class="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                  <span class="inline-flex items-center gap-0.5">
                    <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                    <span class="text-slate-600 dark:text-slate-300 font-medium">${escapeHtml(master.district)}</span>
                  </span>
                  <span>•</span>
                  <span>${master.experience} yil tajriba</span>
                </div>
              </div>
            </div>

            <!-- Sevimli tugmasi -->
            <button 
              type="button" 
              onclick="toggleFavoriteMaster(${master.id}, event)"
              data-fav-master-id="${master.id}"
              class="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
              title="${isFav ? 'Sevimlilardan o‘chirish' : 'Sevimlilarga saqlash'}"
            >
              ${isFav 
                ? getSvgIcon('heart', 'w-4 h-4 text-rose-500 fill-current') 
                : getSvgIcon('heartOutline', 'w-4 h-4 text-slate-400 hover:text-rose-500')}
            </button>
          </div>

          <!-- Metrikalar paneli: Reyting, Holat va Narx -->
          <div class="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1 font-bold text-slate-900 dark:text-white bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-md text-[11px]">
                <svg class="w-3 h-3 fill-current text-amber-500" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ${master.rating}
              </span>
              <span class="text-[11px] text-slate-400">(${master.reviewsCount || (master.reviews ? master.reviews.length : 0)} ta sharh)</span>
            </div>

            <div class="flex items-center gap-2">
              ${isFree 
                ? `<span class="status-pill-free"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>Bo‘sh</span>` 
                : `<span class="status-pill-busy"><span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Band</span>`}
            </div>
          </div>

          <!-- Asosiy xizmatlar pill-taglar ko'rinishida -->
          <div class="mt-3 flex flex-wrap gap-1.5">
            ${(master.popularServices || []).slice(0, 2).map(s => `
              <span class="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                <span class="truncate max-w-[130px]">${escapeHtml(s.name)}</span>
                <strong class="text-[#FF5512] font-semibold">${escapeHtml(s.price)}</strong>
              </span>
            `).join('')}
          </div>

          <!-- Mijozning so'nggi sharhi (Minimalist Linear style) -->
          ${latestReview ? `
            <div class="mt-3 p-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border-l-2 border-[#FF5512] text-[11px]">
              <p class="text-slate-600 dark:text-slate-400 italic line-clamp-1">"${escapeHtml(latestReview.text)}"</p>
              <div class="flex items-center justify-between text-slate-400 text-[10px] mt-1">
                <span>— ${escapeHtml(latestReview.author)}</span>
                <span class="text-amber-500">★ ${latestReview.rating}</span>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Pastki qism: Narx va CTA tugmalar -->
        <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div class="flex items-baseline justify-between mb-3">
            <span class="text-[11px] text-slate-400 font-medium">Boshlang‘ich narx:</span>
            <span class="text-sm font-extrabold text-slate-900 dark:text-white">dan ${escapeHtml(startingPrice)}</span>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button 
              type="button" 
              onclick="openChatModal(${master.id})" 
              class="btn-primary w-full py-2 px-3 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              ${getSvgIcon('chat', 'w-3.5 h-3.5')}
              <span>Chat</span>
            </button>

            <button 
              type="button" 
              onclick="openDetailModal(${master.id})" 
              class="btn-secondary w-full py-2 px-3 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <span>Profil</span>
              <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
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
