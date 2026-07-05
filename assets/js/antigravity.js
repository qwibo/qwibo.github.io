

// --- Theme logic ---
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}


const HERO_LANGUAGES = {
  it: [
    { code: 'IT', label: 'Italiano' },
    { code: 'EN', label: 'Inglese' },
    { code: 'ES', label: 'Spagnolo' },
    { code: 'DE', label: 'Tedesco' },
    { code: 'FR', label: 'Francese' },
  ],
  en: [
    { code: 'IT', label: 'Italian' },
    { code: 'EN', label: 'English' },
    { code: 'ES', label: 'Spanish' },
    { code: 'DE', label: 'German' },
    { code: 'FR', label: 'French' },
  ],
};

function initHeroLangCycle() {
  const root = document.querySelector('[data-hero-lang-cycle]');
  if (!root) return;

  const locale = document.documentElement.lang === 'it' ? 'it' : 'en';
  const langs = HERO_LANGUAGES[locale];
  const codeEl = root.querySelector('[data-hero-lang-code]');
  const labelEl = root.querySelector('[data-hero-lang-label]');
  if (!codeEl || !labelEl || !langs.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    codeEl.textContent = langs.map((l) => l.code).join(' · ');
    labelEl.textContent = locale === 'it' ? '5 lingue' : '5 languages';
    return;
  }

  let index = 0;
  setInterval(() => {
    root.style.opacity = '0';
    setTimeout(() => {
      index = (index + 1) % langs.length;
      codeEl.textContent = langs[index].code;
      labelEl.textContent = langs[index].label;
      root.style.opacity = '1';
    }, 300);
  }, 2400);
}

document.addEventListener('DOMContentLoaded', () => {
  // --- UI Elements ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const themeToggleBtn = document.getElementById('theme-toggle');

  // --- Theme Toggle Logic ---
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      }
    });
  }
  const aiInput = document.getElementById('ai-input');
  const aiSubmit = document.getElementById('ai-submit');
  const aiResults = document.getElementById('ai-results');
  const aiLoader = document.getElementById('ai-loader');
  const navbar = document.getElementById('navbar');
  const newsletterForm = document.getElementById('newsletter-form');
  const contactForm = document.getElementById('contact-form');



  // --- Mobile Menu Logic ---
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });
  }

  // --- Scroll Effect for Navbar ---
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
        if (document.documentElement.classList.contains('dark')) {
          navbar.classList.remove('bg-white/80', 'dark:bg-neutral-950/80');
          navbar.classList.add('bg-white/95', 'dark:bg-neutral-950/95');
        } else {
          navbar.classList.remove('bg-white/80');
          navbar.classList.add('bg-white/95');
        }
      } else {
        navbar.classList.remove('shadow-md', 'bg-white/95', 'dark:bg-neutral-950/95');
        navbar.classList.add('bg-white/80', 'dark:bg-neutral-950/80');
      }
    });
  }

  // --- Scroll Reveal Animation ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" 
  });

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // --- Form Handling (Mock) ---

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      const input = newsletterForm.querySelector('input');
      const successMsg = document.getElementById('newsletter-success');
      
      if(btn) {
        const originalText = btn.innerText;
        btn.innerText = "Subscribing...";
        btn.disabled = true;
        
        setTimeout(() => {
          newsletterForm.classList.add('hidden');
          if (successMsg) successMsg.classList.remove('hidden');
        }, 1500);
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      const successMsg = document.getElementById('contact-success');
      
      if (btn) {
        btn.innerText = "Sending...";
        btn.disabled = true;
        
        setTimeout(() => {
          contactForm.reset();
          btn.innerText = "Send Message";
          btn.disabled = false;
          if (successMsg) {
             successMsg.classList.remove('hidden');
             setTimeout(() => successMsg.classList.add('hidden'), 5000);
          }
        }, 1500);
      }
    });
  }

  // --- AI Logic (Mock) ---
  if (aiSubmit && aiInput) {
    aiSubmit.addEventListener('click', () => {
      mockGenerateStrategy(aiInput.value);
    });

    aiInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        mockGenerateStrategy(aiInput.value);
      }
    });
  }

  function mockGenerateStrategy(query) {
    if (!query) return;

    // UI State: Loading
    aiResults.innerHTML = '';
    aiLoader.classList.remove('hidden');
    if(aiSubmit) {
        aiSubmit.disabled = true;
        aiSubmit.innerHTML = `<span class="loading-dots">Thinking</span>`;
    }

    setTimeout(() => {
        const mockData = {
            slogans: [
                "Automate the Impossible.",
                "Efficiency at Light Speed.",
                "Future-Proof Your Workflow."
            ],
            keywords: ["Automation", "AI", "Scalability", "Integration", "Cloud"]
        };
        renderResults(mockData);

        // UI State: Reset
        aiLoader.classList.add('hidden');
        if (aiSubmit) {
            aiSubmit.disabled = false;
            aiSubmit.innerHTML = `<span>Generate</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`;
        }
    }, 2000);
  }

  function renderResults(data) {
    const container = document.createDocumentFragment();

    if (data.slogans.length === 0 && data.keywords.length === 0) {
       aiResults.innerHTML = `<div class="text-gray-400 italic">No results generated. Try a different prompt.</div>`;
       return;
    }

    // Render Slogans (Large Pills)
    data.slogans.forEach((slogan, index) => {
      const el = document.createElement('div');
      const colors = ['bg-brand-blue', 'bg-brand-red', 'bg-brand-yellow', 'bg-brand-green'];
      const colorClass = colors[index % colors.length];
      
      // Add animation classes
      el.className = `${colorClass} text-white px-8 py-4 rounded-full font-bold text-lg md:text-xl shadow-lg transform transition-all duration-500 hover:scale-105 cursor-default opacity-0 translate-y-4 animate-in`;
      
      // Use setTimeout for stagger effect in vanilla JS
      setTimeout(() => {
          el.classList.remove('opacity-0', 'translate-y-4');
      }, index * 100);
      
      el.textContent = slogan;
      container.appendChild(el);
    });

    // Render Keywords (Small Pills)
    data.keywords.forEach((keyword, index) => {
      const el = document.createElement('div');
      el.className = `bg-gray-800 dark:bg-white/10 text-white border border-gray-700 dark:border-white/10 px-5 py-2 rounded-full font-mono text-sm shadow-md hover:bg-white hover:text-black transition-colors duration-300 cursor-default opacity-0 translate-y-4`;
      
       setTimeout(() => {
          el.classList.remove('opacity-0', 'translate-y-4');
      }, (data.slogans.length * 100) + (index * 50));

      el.textContent = `#${keyword}`;
      container.appendChild(el);
    });

    aiResults.appendChild(container);
  }

  initHeroLangCycle();

});
