// Usta-Top.uz - Ustalar katalogi interaktiv mantig'i va zamonaviy tuman/saralash tugmalari

let currentFilter = {
  category: 'barchasi',
  district: 'Barcha tumanlar',
  searchQuery: '',
  sortBy: 'rating',
  urgentOnly: false
};

document.addEventListener('DOMContentLoaded', () => {
  readUrlParameters();
  initCategoryPills();
  initDistrictChips();
  initSortButtons();
  initUrgentButton();
  initSearchInput();
  renderMastersGrid();
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
  currentFilter.category = categoryId;
  initCategoryPills();
  renderMastersGrid();
  updateUrlParams();
}

// 2. Tuman tanlash uchun Zamonaviy Chiplar
function initDistrictChips() {
  const container = document.getElementById('districtChipsContainer');
  if (!container) return;

  container.innerHTML = DISTRICTS.map(districtName => {
    const isActive = districtName === currentFilter.district;
    
    let count = 0;
    if (districtName === 'Barcha tumanlar') {
      count = MASTERS_DATA.length;
    } else {
      count = MASTERS_DATA.filter(m => m.district === districtName || m.districtsServed.includes(districtName)).length;
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
  currentFilter.district = districtName;
  initDistrictChips();
  renderMastersGrid();
  updateUrlParams();
}

// 3. SARALASH TUGMALARI (Native Select o'rniga zamonaviy Button Group)
function initSortButtons() {
  updateSortButtonsUI();
}

function setSortFilter(sortBy) {
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
      btn.className = "sort-btn px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 bg-[#1E3A8A] text-white shadow-md shadow-blue-900/20 scale-105 cursor-pointer";
    } else {
      btn.className = "sort-btn px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-700 transition cursor-pointer";
    }
  });
}

// 4. SHOSHILINCH TOGGLE TUGMASI (Checkbox o'rniga zamonaviy Button)
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
    }, 250);
  });
}

// 6. Filtrlarni tozalash (Zamonaviy tozalash tugmasi orqali chaqiriladi)
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

// 7. Ustalar ro'yxatini filtrlash va render qilish
function renderMastersGrid() {
  const grid = document.getElementById('mastersGrid');
  const countBadge = document.getElementById('resultsCountBadge');
  const activeFiltersContainer = document.getElementById('activeFiltersIndicator');
  if (!grid) return;

  let filtered = MASTERS_DATA.filter(master => {
    // Kategoriya
    if (currentFilter.category !== 'barchasi' && master.categoryId !== currentFilter.category) {
      return false;
    }

    // Tuman
    if (currentFilter.district !== 'Barcha tumanlar') {
      const matchDistrict = master.district.toLowerCase() === currentFilter.district.toLowerCase() || 
        master.districtsServed.some(d => d.toLowerCase() === currentFilter.district.toLowerCase());
      if (!matchDistrict) return false;
    }

    // Shoshilinch
    if (currentFilter.urgentOnly && !master.urgent) {
      return false;
    }

    // Qidiruv
    if (currentFilter.searchQuery) {
      const q = currentFilter.searchQuery.toLowerCase();
      const inName = master.name.toLowerCase().includes(q);
      const inProf = master.profession.toLowerCase().includes(q);
      const inBio = master.bio.toLowerCase().includes(q);
      const inServices = master.popularServices.some(s => s.name.toLowerCase().includes(q));
      if (!inName && !inProf && !inBio && !inServices) return false;
    }

    return true;
  });

  // Saralash
  if (currentFilter.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
  } else if (currentFilter.sortBy === 'orders') {
    filtered.sort((a, b) => b.completedOrders - a.completedOrders);
  } else if (currentFilter.sortBy === 'experience') {
    filtered.sort((a, b) => b.experience - a.experience);
  }

  // Natijalar hisoblagichi
  if (countBadge) {
    countBadge.textContent = `${filtered.length} ta mutaxassis topildi`;
  }

  // FAOL FILTRLAR VA ZAMONAVIY "BARCHASINI TOZALASH" TUGMASI
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
            ${currentFilter.searchQuery ? `<span class="inline-flex items-center space-x-1 bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800/70 px-2.5 py-1 rounded-xl font-bold"><span>Qidiruv:</span> <em>"${currentFilter.searchQuery}"</em></span>` : ''}
            ${currentFilter.urgentOnly ? `<span class="inline-flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/70 px-2.5 py-1 rounded-xl font-bold">⚡ Shoshilinch</span>` : ''}
          </div>
          
          <!-- DIZAYN BERILGAN "BARCHASINI TOZALASH" TUGMASI (BUTTON) -->
          <button 
            type="button" 
            onclick="resetFilters()" 
            class="inline-flex items-center space-x-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer ml-auto"
            title="Barcha filtrlarni tozalab boshlang'ich holatga qaytarish"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            <span>Barchasini tozalash ✕</span>
          </button>
        </div>
      `;
    } else {
      activeFiltersContainer.classList.add('hidden');
    }
  }

  // Bo'sh holat
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
        <div class="w-16 h-16 bg-orange-100 dark:bg-orange-950/50 text-[#F97316] rounded-2xl flex items-center justify-center mx-auto mb-4">
          ${getSvgIcon('wrench', 'w-8 h-8')}
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">Ushbu parametrlar bo‘yicha usta topilmadi</h3>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
          Iltimos, tuman yoki kategoriya filtrini o‘zgartiring.
        </p>
        <button 
          type="button" 
          onclick="resetFilters()" 
          class="mt-5 bg-[#1E3A8A] hover:bg-[#172554] dark:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition cursor-pointer"
        >
          Barcha ustalarni ko‘rsatish
        </button>
      </div>
    `;
    return;
  }

  // Kartalarni generatsiya qilish
  grid.innerHTML = filtered.map(master => {
    const fullStars = Math.floor(master.rating);
    const starIcons = Array.from({ length: 5 }, (_, i) => {
      return i < fullStars 
        ? `<svg class="w-3.5 h-3.5 text-amber-400 fill-current inline" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
        : `<svg class="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 fill-current inline" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    }).join('');

    const latestReview = master.reviews && master.reviews.length > 0 ? master.reviews[0] : null;

    return `
      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 card-hover-effect flex flex-col justify-between transition-all">
        
        <div>
          <!-- Usta bosh qismi -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center space-x-3.5">
              <div class="relative w-16 h-16 flex-shrink-0">
                <img 
                  src="${master.avatar}" 
                  alt="${master.name}" 
                  class="w-16 h-16 rounded-2xl object-cover shadow-sm border border-slate-200 dark:border-slate-700"
                  onerror="this.src='https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80'"
                >
                <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" title="Onlayn usta"></span>
              </div>

              <div>
                <div class="flex items-center space-x-1.5">
                  <h3 class="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">${master.name}</h3>
                  <span class="text-blue-500" title="Tekshirilgan usta">
                    ${getSvgIcon('checkBadge', 'w-4 h-4')}
                  </span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">${master.profession}</p>
                
                <div class="flex items-center space-x-1 text-slate-400 text-xs mt-1">
                  <span class="text-rose-500 font-bold">📍</span>
                  <span class="text-slate-700 dark:text-slate-300 font-semibold">${master.district}</span>
                </div>
              </div>
            </div>

            <!-- 5 Yulduzli Reyting ko'rsatkichi -->
            <div class="text-right flex-shrink-0">
              <div class="flex items-center space-x-0.5 justify-end">
                ${starIcons}
              </div>
              <span class="text-xs font-extrabold text-amber-500 block mt-0.5">${master.rating} (${master.reviewsCount})</span>
            </div>
          </div>

          <!-- Indikatorlar -->
          <div class="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
            <span class="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg font-semibold">
              ${master.experience} yil tajriba
            </span>
            <span class="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-lg font-semibold">
              ${master.completedOrders}+ buyurtma
            </span>
            <span class="bg-blue-50 dark:bg-blue-950/40 text-[#1E3A8A] dark:text-blue-300 px-2 py-0.5 rounded-lg font-semibold">
              ✓ Kafolat beradi
            </span>
          </div>

          <!-- Qisqa narxlar -->
          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Asosiy xizmatlar narxi:</span>
            ${master.popularServices.slice(0, 2).map(s => `
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-600 dark:text-slate-400 truncate pr-2">${s.name}</span>
                <span class="font-bold text-[#1E3A8A] dark:text-blue-400 whitespace-nowrap">${s.price}</span>
              </div>
            `).join('')}
          </div>

          <!-- Mijozning oxirgi sharhi (Komment) preview -->
          ${latestReview ? `
            <div class="mt-3 p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[11px]">
              <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-0.5">
                <span class="font-bold text-slate-800 dark:text-slate-200">💬 ${latestReview.author}:</span>
                <span class="text-amber-400">★ ${latestReview.rating}</span>
              </div>
              <p class="text-slate-600 dark:text-slate-400 line-clamp-1 italic">"${latestReview.text}"</p>
            </div>
          ` : ''}

        </div>

        <!-- Tugmalar bloki -->
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
}
