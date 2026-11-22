/**
 * PRINCIPAL'S THOUGHTS & VISION — JAVASCRIPT CONTROLLER
 * Features:
 * - Dynamic Carousel with dot navigation & auto-rotation
 * - Interactive Modals (Bio, Accreditations, Focus Areas, Search, Connect)
 * - Scrollspy & Active Navigation Link Highlight
 * - Mobile Slide-out Drawer Navigation
 * - Real-Time Search Filter
 * - Form Validation with Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. CAROUSEL DATA & LOGIC
  // =========================================================================
  const slides = [
    {
      title: 'Shaping Compassionate Healers,<br><span class="hero-italic">Building a Healthier Tomorrow</span>',
      desc: 'Dedicated to clinical excellence, oncology nursing, and empowering students from rural and underserved communities to transform healthcare.',
      img: 'assets/college-campus-jalna.jpg'
    },
    {
      title: 'Clinical Mastery &amp; Simulation,<br><span class="hero-italic">Hands-on Experiential Learning</span>',
      desc: 'Equipping nurses with state-of-the-art skills labs, bedside rotations at Jalna General Hospital, and surgical trauma care training.',
      img: 'assets/college-campus-jalna.jpg'
    },
    {
      title: 'Empowering Rural Communities,<br><span class="hero-italic">Transforming Public Health</span>',
      desc: 'Mobilizing 50+ rural health screening drives, immunization, and community outreach across Marathwada under visionary stewardship.',
      img: 'assets/college-campus-jalna.jpg'
    }
  ];

  let currentSlideIndex = 0;
  let carouselInterval = null;

  const heroHeading = document.getElementById('heroHeading');
  const heroDesc = document.getElementById('heroDesc');
  const heroImg = document.getElementById('heroImg');
  const dots = document.querySelectorAll('.carousel-dots .dot');

  function showSlide(index) {
    currentSlideIndex = (index + slides.length) % slides.length;

    // Update Heading & Description with smooth fade
    if (heroHeading && heroDesc) {
      heroHeading.style.opacity = '0';
      heroDesc.style.opacity = '0';

      setTimeout(() => {
        heroHeading.innerHTML = slides[currentSlideIndex].title;
        heroDesc.textContent = slides[currentSlideIndex].desc;
        heroHeading.style.opacity = '1';
        heroDesc.style.opacity = '1';
      }, 200);
    }

    // Update Dots
    dots.forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  function startCarouselTimer() {
    stopCarouselTimer();
    carouselInterval = setInterval(() => {
      showSlide(currentSlideIndex + 1);
    }, 6000);
  }

  function stopCarouselTimer() {
    if (carouselInterval) clearInterval(carouselInterval);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      showSlide(slideIndex);
      startCarouselTimer();
    });
  });

  const heroSection = document.getElementById('home');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopCarouselTimer);
    heroSection.addEventListener('mouseleave', startCarouselTimer);
  }

  startCarouselTimer();

  // =========================================================================
  // 2. MODAL SYSTEM
  // =========================================================================
  const allModals = document.querySelectorAll('.modal');

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (!targetModal) return;

    // Close any currently active modal
    allModals.forEach(m => m.classList.remove('active'));

    targetModal.classList.add('active');
    targetModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Auto-focus search input if search modal
    if (modalId === 'searchModal') {
      const searchInput = document.getElementById('portfolioSearchInput');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 150);
      }
    }
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind close buttons and backdrop clicks
  document.querySelectorAll('[data-close="modal"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      closeModal(modal);
    });
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) closeModal(activeModal);
    }
    // Ctrl+K / Cmd+K search shortcut
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openModal('searchModal');
    }
  });

  // Modal Trigger Buttons
  const triggerMap = [
    { btnId: 'heroCtaBtn', modalId: 'messageModal' },
    { btnId: 'heroKnowMoreBtn', modalId: 'knowMoreModal' },
    { btnId: 'aboutLearnMoreBtn', modalId: 'aboutModal' },
    { btnId: 'achievementsBtn', modalId: 'achievementsModal' },
    { btnId: 'principalMessageBtn', modalId: 'messageModal' },
    { btnId: 'letsConnectBtn', modalId: 'connectModal' },
    { btnId: 'topConnectBtn', modalId: 'connectModal' },
    { btnId: 'footerMailBtn', modalId: 'connectModal' },
    { btnId: 'searchTriggerBtn', modalId: 'searchModal' },
    { btnId: 'mobileSearchBtn', modalId: 'searchModal' },
    { btnId: 'knowMoreContactTrigger', modalId: 'connectModal' }
  ];

  triggerMap.forEach(({ btnId, modalId }) => {
    const el = document.getElementById(btnId);
    if (el) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(modalId);
      });
    }
  });

  // =========================================================================
  // 3. FOCUS AREA MODAL CONTENT INJECTION
  // =========================================================================
  const focusData = {
    academic: {
      badge: 'Clinical Competence',
      title: 'Skills Laboratory & Bedside Clinical Rotations',
      content: `
        <p>Our clinical curriculum is grounded in experiential mastery, simulation-based training, and bedside patient care:</p>
        <div class="highlights-pill-grid" style="margin-bottom: 1.2rem;">
          <div class="highlight-pill">✓ Hands-On Medical Simulation Mannequins</div>
          <div class="highlight-pill">✓ Bedside Rotations at Jalna General Hospital</div>
          <div class="highlight-pill">✓ Intensive Critical Care &amp; Emergency Protocols</div>
          <div class="highlight-pill">✓ Demonstration Bays for Surgical Procedures</div>
        </div>
        <p>Under expert faculty guidance, every student translates theoretical nursing science into confident, compassionate clinical practice across hospital wards and emergency units.</p>
      `
    },
    innovation: {
      badge: 'Medical Surgical & Oncology',
      title: 'Specialized Oncology Nursing & Surgical Intensive Care',
      content: `
        <p>Led by the academic expertise of Mr. Manoj L. Deshmukh (M.Sc. Nursing, Oncology), students receive cutting-edge clinical training:</p>
        <div class="highlights-pill-grid" style="margin-bottom: 1.2rem;">
          <div class="highlight-pill">✓ Chemotherapy &amp; Oncology Nursing Regimens</div>
          <div class="highlight-pill">✓ Surgical ICU Pre- &amp; Post-Operative Management</div>
          <div class="highlight-pill">✓ Palliative Care &amp; Psycho-Oncology Counseling</div>
          <div class="highlight-pill">✓ Patient Pain Management &amp; Rehabilitation</div>
        </div>
        <p>Training prepares nurses to manage complex surgical interventions and deliver empathetic supportive therapy to cancer patients and their families.</p>
      `
    },
    student: {
      badge: 'Rural Health & Social Inclusion',
      title: 'Empowering Underserved Communities & Grassroots Healthcare',
      content: `
        <p>Established with a noble mission to bridge healthcare disparities across rural Maharashtra:</p>
        <div class="highlights-pill-grid" style="margin-bottom: 1.2rem;">
          <div class="highlight-pill">✓ Focused Inclusion for Rural &amp; Underserved Students</div>
          <div class="highlight-pill">✓ Full State Govt Scholarship &amp; Welfare Facilitation</div>
          <div class="highlight-pill">✓ Mentorship for State CET &amp; MUHS Examinations</div>
          <div class="highlight-pill">✓ English &amp; Professional Communication Workshops</div>
        </div>
        <p>We nurture grassroots talent into globally competent nursing professionals who return to serve and elevate rural community healthcare.</p>
      `
    },
    industry: {
      badge: 'Ethics & SWA Leadership',
      title: 'Nightingale Oath, Patient Dignity & Student Welfare Association',
      content: `
        <p>Fostering compassionate professional ethos and holistic student governance under SWA Presidency:</p>
        <div class="highlights-pill-grid" style="margin-bottom: 1.2rem;">
          <div class="highlight-pill">✓ Nightingale Lamp Lighting Induction Ceremony</div>
          <div class="highlight-pill">✓ Student Welfare Association (SWA) Governance</div>
          <div class="highlight-pill">✓ Mental Wellness, Counseling &amp; Peer Support</div>
          <div class="highlight-pill">✓ Annual Sports Meets &amp; Cultural Colloquiums</div>
        </div>
        <p>Upholding the sacred trust between nurse and patient through unwavering ethical standards, empathy, and professional integrity.</p>
      `
    },
    growth: {
      badge: 'Institutional Conformance',
      title: 'Public Health Dept Sanction, MUHS Nashik & AISHE Conformance',
      content: `
        <p>A benchmark government institution operating under state and national regulatory compliance:</p>
        <div class="highlights-pill-grid" style="margin-bottom: 1.2rem;">
          <div class="highlight-pill">✓ Sanctioned by Public Health Dept, Maharashtra (2024)</div>
          <div class="highlight-pill">✓ Affiliated to MUHS, Nashik (College Code: 154153)</div>
          <div class="highlight-pill">✓ State CET Cell Portal Conformance (Code: 09385)</div>
          <div class="highlight-pill">✓ National AISHE Certification (Code: C-74466)</div>
        </div>
        <p>Built with modern lecture theatres, specialized anatomy and clinical labs, and expansive residential and digital library amenities.</p>
      `
    },
    social: {
      badge: 'Public Health & Rural Outreach',
      title: '50+ Rural Health Screening Camps & Preventive Drives',
      content: `
        <p>Extending compassionate healthcare directly into villages and remote districts of Marathwada:</p>
        <div class="highlights-pill-grid" style="margin-bottom: 1.2rem;">
          <div class="highlight-pill">✓ 50+ Rural Village Health Camps Conducted</div>
          <div class="highlight-pill">✓ Free Immunization, Maternal &amp; Child Health Clinics</div>
          <div class="highlight-pill">✓ Non-Communicable Disease (NCD) Screenings</div>
          <div class="highlight-pill">✓ Community Hygiene &amp; Nutritional Awareness Drives</div>
        </div>
        <p>Faculty and student cohorts work hand-in-hand with primary healthcare centres to deliver life-saving preventative care to thousands of rural residents.</p>
      `
    }
  };



  // =========================================================================
  // 4. LIVE SEARCH FUNCTIONALITY
  // =========================================================================
  const searchableItems = [
    { cat: 'Principal Leadership', title: 'Mr. Manoj L. Deshmukh · Principal cum Professor & SWA President', modal: 'aboutModal' },
    { cat: 'Vision & Mission', title: 'Our Vision — Benchmark Learning Institution in Healthcare', target: 'vision-mission' },
    { cat: 'Vision & Mission', title: 'Our Mission — Quality Nursing Education for Rural Communities', target: 'vision-mission' },
    { cat: 'Institutional Highlights', title: 'Government Sanction, MUHS Code 154153, CET 09385 & AISHE C-74466', modal: 'knowMoreModal' },
    { cat: 'Focus Area', title: 'Clinical Competence, Bedside Rotations & Simulation Skills Lab', target: 'focus-areas' },
    { cat: 'Focus Area', title: 'Medical Surgical & Oncology Nursing Specialization', target: 'focus-areas' },
    { cat: 'Focus Area', title: 'Rural Health & Social Inclusion for Underserved Students', target: 'focus-areas' },
    { cat: 'Focus Area', title: 'Ethics, Empathy, Nightingale Oath & SWA Leadership', target: 'focus-areas' },
    { cat: 'Focus Area', title: 'Institutional Growth & State Govt / MUHS Nashik Conformance', target: 'focus-areas' },
    { cat: 'Focus Area', title: 'Public Health Outreach & 50+ Rural Health Screening Camps', target: 'focus-areas' },
    { cat: 'Achievements', title: 'Milestones: 2024 Govt Conformance, MUHS Affiliation & SWA Honors', target: 'achievements' },
    { cat: 'Official Message', title: 'Message from the Principal’s Desk — Mr. Manoj L. Deshmukh', target: 'message' },
    { cat: 'Contact & Office', title: 'Office of the Principal, Jalna (govt.bscnursingjalna@gmail.com)', target: 'contact' }
  ];

  const searchInput = document.getElementById('portfolioSearchInput');
  const searchResultsList = document.getElementById('searchResultsList');

  if (searchInput && searchResultsList) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();

      if (!q) {
        searchResultsList.innerHTML = '<div class="search-hint">Type a keyword to discover institutional initiatives, messages, or achievements.</div>';
        return;
      }

      const matches = searchableItems.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.cat.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        searchResultsList.innerHTML = `<div class="search-hint">No results found for "${e.target.value}". Try searching for "Research", "Message", "Awards", or "Vision".</div>`;
        return;
      }

      searchResultsList.innerHTML = matches.map(m => `
        <div class="search-result-item" data-target="${m.target || ''}" data-modal="${m.modal || ''}" data-focus="${m.focus || ''}">
          <div class="search-item-cat">${m.cat}</div>
          <div class="search-item-title">${m.title}</div>
        </div>
      `).join('');

      // Add click events to search result items
      searchResultsList.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const modalId = item.getAttribute('data-modal');
          const sectionId = item.getAttribute('data-target');
          const focusKey = item.getAttribute('data-focus');

          closeModal(document.getElementById('searchModal'));

          if (modalId) {
            setTimeout(() => openModal(modalId), 250);
          } else if (focusKey && focusData[focusKey]) {
            focusModalBadge.textContent = focusData[focusKey].badge;
            focusDetailTitle.textContent = focusData[focusKey].title;
            focusDetailContent.innerHTML = focusData[focusKey].content;
            setTimeout(() => openModal('focusDetailModal'), 250);
          } else if (sectionId) {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    });
  }

  // =========================================================================
  // 5. CONTACT FORM SUBMISSION & TOAST NOTIFICATION
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(msg) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = msg;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 4500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();

      if (!name || !email || !subject) {
        alert('Please fill out all required fields.');
        return;
      }

      // Show success feedback
      if (formFeedback) {
        formFeedback.className = 'form-feedback-msg success';
        formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your inquiry regarding "${subject}" has been delivered to the Principal's Executive Office. You will receive a formal confirmation at ${email}.`;
        formFeedback.style.display = 'block';
      }

      contactForm.reset();

      showToast('Message sent to the Principal’s Office successfully!');

      setTimeout(() => {
        closeModal(document.getElementById('connectModal'));
        if (formFeedback) formFeedback.style.display = 'none';
      }, 3500);
    });
  }

  // =========================================================================
  // 6. SCROLLSPY & ACTIVE NAV LINK HIGHLIGHT
  // =========================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  function updateActiveNavLink() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        if (link.getAttribute('data-section') === currentSectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // Smooth scroll click handler for sidebar navigation
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Update active class immediately
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Close mobile drawer if open
        closeMobileSidebar();
      }
    });
  });

  // Back to top button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 7. MOBILE HAMBURGER & DRAWER NAVIGATION
  // =========================================================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');

  function openMobileSidebar() {
    if (sidebar && hamburgerBtn && sidebarBackdrop) {
      sidebar.classList.add('open');
      sidebarBackdrop.classList.add('active');
      hamburgerBtn.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileSidebar() {
    if (sidebar && hamburgerBtn && sidebarBackdrop) {
      sidebar.classList.remove('open');
      sidebarBackdrop.classList.remove('active');
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = sidebar.classList.contains('open');
      if (isOpen) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeMobileSidebar);
  }

});

