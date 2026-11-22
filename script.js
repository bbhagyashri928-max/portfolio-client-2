/**
 * PRINCIPAL'S PORTFOLIO — JAVASCRIPT CONTROLLER
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
      title: 'Shaping Bright Minds,<br><span class="hero-italic">Building a Better Tomorrow</span>',
      desc: 'Committed to academic excellence, innovation and holistic development.',
      img: 'assets/campus-hero.jpg'
    },
    {
      title: 'Igniting Curiosity,<br><span class="hero-italic">Pioneering Breakthrough Research</span>',
      desc: 'Equipping scholars with interdisciplinary inquiry, world-class labs, and creative problem-solving.',
      img: 'assets/campus-hero.jpg'
    },
    {
      title: 'Nurturing Character,<br><span class="hero-italic">Empowering Global Stewards</span>',
      desc: 'Instilling integrity, resilience, and compassionate leadership in every graduate.',
      img: 'assets/campus-hero.jpg'
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
    { btnId: 'heroCtaBtn', modalId: 'knowMoreModal' },
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
      badge: 'Academic Excellence',
      title: 'Scholastic Rigor, Outcome-Based Curricula & Faculty Development',
      content: `
        <p>Our academic framework is grounded in experiential mastery, interdisciplinary research, and continuous pedagogical refinement:</p>
        <div class="highlights-pill-grid" style="margin-bottom: 1.2rem;">
          <div class="highlight-pill">✓ Outcome-Based Education (OBE) Model</div>
          <div class="highlight-pill">✓ Choice-Based Credit System (CBCS)</div>
          <div class="highlight-pill">✓ Dual Faculty Research Mentorship</div>
          <div class="highlight-pill">✓ 100% Smart Classrooms &amp; Cloud LMS</div>
        </div>
        <p>Faculty members are encouraged to publish in Scopus-indexed and Web of Science journals, supported by institutional research grants and sabbaticals for international colloquia.</p>
      `
    },
    innovation: {
      badge: 'Innovation & Research',
      title: 'Breakthrough Discovery, Patents & Student Incubation Hub',
      content: `
        <p>Empowering faculty and students to translate creative concepts into tangible societal solutions:</p>
        <div class="highlights-pill-grid" style="margin-bottom: 1.2rem;">
          <div class="highlight-pill">✓ Technology Business Incubator (TBI)</div>
          <div class="highlight-pill">✓ Seed Funding for Student Start-Ups</div>
          <div class="highlight-pill">✓ In-House Patent &amp; IPR Facilitation Cell</div>
          <div class="highlight-pill">✓ Advanced Robotics &amp; AI Research Labs</div>
        </div>
        <p>Annual research symposiums and hackathons connect our innovators directly with government grants and venture capital networks.</p>
      `
    },
    student: {
      badge: 'Student Development',
      title: 'Holistic Mentorship, Cultural Societies & Leadership Clubs',
      content: `
        <p>Education extends far beyond academic transcripts. We nurture well-rounded, emotionally resilient global citizens:</p>
        <div class="highlights-pill-grid" style="margin-bottom: 1.2rem;">
          <div class="highlight-pill">✓ 30+ Student-Run Clubs &amp; Societies</div>
          <div class="highlight-pill">✓ Dedicated Counseling &amp; Wellness Centre</div>
          <div class="highlight-pill">✓ National &amp; Inter-University Sports League</div>
          <div class="highlight-pill">✓ Executive Leadership Masterclasses</div>
        </div>
        <p>Every student is paired with a dedicated faculty mentor from day one to guide their scholastic, personal, and professional trajectory.</p>
      `
    },
    industry: {
      badge: 'Industry Collaboration',
      title: 'Corporate Partnerships, Global Internships & Co-Op Programs',
      content: `
        <p>Bridging academia with real-world corporate demands through active industry integration:</p>
        <div class="highlights-pill-grid" style="margin-bottom: 1.2rem;">
          <div class="highlight-pill">✓ 100+ Active Corporate MoUs</div>
          <div class="highlight-pill">✓ Sponsored Industry R&amp;D Projects</div>
          <div class="highlight-pill">✓ Structured 6-Month Paid Internships</div>
          <div class="highlight-pill">✓ Corporate Advisory Council for Curricula</div>
        </div>
        <p>Executive speakers, industry immersion bootcamps, and mock interview panels ensure our graduates hit the ground running with 98.4% placement rates.</p>
      `
    },
    growth: {
      badge: 'Institutional Growth',
      title: 'Sustainable Infrastructure, Endowments & Campus Expansion',
      content: `
        <p>Investing in future-proof facilities that inspire collaborative inquiry and environmental harmony:</p>
        <div class="highlights-pill-grid" style="margin-bottom: 1.2rem;">
          <div class="highlight-pill">✓ Net-Zero Carbon &amp; Solar-Powered Campus</div>
          <div class="highlight-pill">✓ Digital Library with 500,000+ E-Journals</div>
          <div class="highlight-pill">✓ Global Alumni Endowment Fund</div>
          <div class="highlight-pill">✓ Modern Residential Quarters &amp; Amphitheatre</div>
        </div>
        <p>Our 2030 Campus Master Plan integrates sustainable architecture, biophilic study spaces, and high-performance computing infrastructure.</p>
      `
    },
    social: {
      badge: 'Social Responsibility',
      title: 'Community Outreach, Sustainability Drives & Civic Engagement',
      content: `
        <p>Fostering empathy and societal stewardship through purposeful, sustained community initiatives:</p>
        <div class="highlights-pill-grid" style="margin-bottom: 1.2rem;">
          <div class="highlight-pill">✓ Village Adoption &amp; Rural Literacy Drives</div>
          <div class="highlight-pill">✓ Environmental Conservation Initiatives</div>
          <div class="highlight-pill">✓ Blood Donation &amp; Free Medical Camps</div>
          <div class="highlight-pill">✓ STEM Education for Underprivileged Youth</div>
        </div>
        <p>Students earn civic service recognition while developing deep awareness of local and global socio-ecological challenges.</p>
      `
    }
  };

  const focusCards = document.querySelectorAll('.focus-card');
  const focusModal = document.getElementById('focusDetailModal');
  const focusModalBadge = document.getElementById('focusModalBadge');
  const focusDetailTitle = document.getElementById('focusDetailTitle');
  const focusDetailContent = document.getElementById('focusDetailContent');

  focusCards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-focus');
      const data = focusData[type];
      if (data) {
        focusModalBadge.textContent = data.badge;
        focusDetailTitle.textContent = data.title;
        focusDetailContent.innerHTML = data.content;
        openModal('focusDetailModal');
      }
    });

    // Keyboard accessibility for card buttons
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // =========================================================================
  // 4. LIVE SEARCH FUNCTIONALITY
  // =========================================================================
  const searchableItems = [
    { cat: 'Vision & Mission', title: 'Vision Statement — Academic Excellence & Innovation', target: 'vision-mission' },
    { cat: 'Vision & Mission', title: 'Mission Statement — Nurture Talent & Promote Knowledge', target: 'vision-mission' },
    { cat: 'About', title: 'Principal Leadership Biography & Credentials', modal: 'aboutModal' },
    { cat: 'Institutional Highlights', title: 'Accreditation Metrics & Global Alumni Network', modal: 'knowMoreModal' },
    { cat: 'Focus Area', title: 'Academic Excellence & Outcome-Based Education', focus: 'academic' },
    { cat: 'Focus Area', title: 'Innovation, Research & Startup Incubator Hub', focus: 'innovation' },
    { cat: 'Focus Area', title: 'Student Development, Mentorship & Clubs', focus: 'student' },
    { cat: 'Focus Area', title: 'Industry Collaboration & Corporate MoUs', focus: 'industry' },
    { cat: 'Focus Area', title: 'Institutional Growth, Green Campus & Infrastructure', focus: 'growth' },
    { cat: 'Focus Area', title: 'Social Responsibility & Community Engagement', focus: 'social' },
    { cat: 'Achievements', title: 'National Leadership Award & Accreditations (A++)', modal: 'achievementsModal' },
    { cat: 'Message', title: 'Principal’s Annual Address to Students and Community', modal: 'messageModal' },
    { cat: 'Contact', title: 'Appointment Request & Office Coordinates', modal: 'connectModal' }
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

