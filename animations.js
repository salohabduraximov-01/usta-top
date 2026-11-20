// Usta-Top.uz - Animatsiyalar moduli: Scroll Reveal, Raqam Sanagichlar va Skeleton Shimmer
// Modulli va qayta foydalaniladigan yordamchilar

// 1. SCROLL REVEAL (.reveal elementlar uchun)
let revealObserver = null;

function initScrollReveal() {
  // prefers-reduced-motion tekshiruvi
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    return;
  }

  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    observeReveals();
  } else {
    // Fallback: brauzer qo'llab-quvvatlamasa to'g'ridan-to'g'ri ko'rsatish
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
  }
}

function observeReveals(root = document) {
  if (!revealObserver) return;
  const reveals = root.querySelectorAll('.reveal:not(.active)');
  reveals.forEach((el, index) => {
    // Agar elementda data-delay bo'lmasa, ketma-ketlik (stagger) kechikishini berish
    if (!el.style.transitionDelay) {
      const delay = (index % 6) * 100; // 0, 100, 200, 300, 400, 500 ms
      el.style.transitionDelay = `${delay}ms`;
    }
    revealObserver.observe(el);
  });
}


// 2. RAQAM SANAGICHLAR (Count-up animatsiyasi)
let counterObserver = null;

function initNumberCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  // prefers-reduced-motion tekshiruvi
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counters.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target') || 0);
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      el.textContent = `${prefix}${decimals > 0 ? target.toFixed(decimals) : Math.round(target)}${suffix}`;
    });
    return;
  }

  if ('IntersectionObserver' in window) {
    counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(counter => counterObserver.observe(counter));
  } else {
    counters.forEach(counter => animateCounter(counter));
  }
}

function animateCounter(el) {
  const targetStr = el.getAttribute('data-target') || '0';
  const target = parseFloat(targetStr);
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const decimals = parseInt(el.getAttribute('data-decimals') || (targetStr.includes('.') ? '1' : '0'), 10);
  const duration = parseInt(el.getAttribute('data-duration') || '1600', 10);

  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // EaseOutExpo silliq formulasi
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentVal = easeProgress * target;

    const formattedVal = decimals > 0 
      ? currentVal.toFixed(decimals) 
      : Math.floor(currentVal);

    el.textContent = `${prefix}${formattedVal}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = `${prefix}${decimals > 0 ? target.toFixed(decimals) : target}${suffix}`;
    }
  }

  requestAnimationFrame(updateCount);
}


// 3. SKELETON YUKLANISH (Kulrang shimmer kartochkalar)
function generateSkeletonCardHTML() {
  return `
    <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between" aria-hidden="true">
      <div>
        <!-- Yuqori qism: Katta dumaloq avatar va sarlavhalar -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center space-x-3.5">
            <!-- Katta dumaloq avatar skeleton -->
            <div class="w-16 h-16 rounded-full skeleton-shimmer flex-shrink-0"></div>
            
            <div class="space-y-2 flex-1">
              <!-- Ism -->
              <div class="w-28 sm:w-36 h-4 rounded-lg skeleton-shimmer"></div>
              <!-- Kasb -->
              <div class="w-20 sm:w-28 h-3 rounded-lg skeleton-shimmer"></div>
              <!-- Tuman -->
              <div class="w-16 h-3 rounded-lg skeleton-shimmer"></div>
            </div>
          </div>

          <!-- Yulduzcha reyting skeleton -->
          <div class="w-14 h-4 rounded-lg skeleton-shimmer flex-shrink-0"></div>
        </div>

        <!-- 3 qator matn / ko'rsatkichlar skeleton -->
        <div class="mt-4 flex items-center gap-1.5">
          <div class="w-16 h-4 rounded-lg skeleton-shimmer"></div>
          <div class="w-20 h-4 rounded-lg skeleton-shimmer"></div>
          <div class="w-14 h-4 rounded-lg skeleton-shimmer"></div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          <div class="w-24 h-3 rounded skeleton-shimmer"></div>
          <div class="flex justify-between items-center">
            <div class="w-32 h-3.5 rounded skeleton-shimmer"></div>
            <div class="w-16 h-3.5 rounded skeleton-shimmer"></div>
          </div>
          <div class="flex justify-between items-center">
            <div class="w-28 h-3.5 rounded skeleton-shimmer"></div>
            <div class="w-14 h-3.5 rounded skeleton-shimmer"></div>
          </div>
        </div>
      </div>

      <!-- Pastki tugmalar skeleton -->
      <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
        <div class="w-full h-11 rounded-2xl skeleton-shimmer"></div>
        <div class="grid grid-cols-2 gap-2">
          <div class="h-9 rounded-xl skeleton-shimmer"></div>
          <div class="h-9 rounded-xl skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  `;
}

function renderMastersSkeleton(container, count = 6) {
  if (!container) return;
  container.setAttribute('aria-busy', 'true');
  container.setAttribute('aria-label', 'Ustalar ro‘yxati yuklanmoqda...');
  
  let html = '';
  for (let i = 0; i < count; i++) {
    html += generateSkeletonCardHTML();
  }
  container.innerHTML = html;
}

// Boshlang'ich yuklash
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNumberCounters();
});
