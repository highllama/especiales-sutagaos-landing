import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Sticky Navbar
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
      navbar.style.padding = '10px 0';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.padding = '15px 0';
    }
  });

  // Active Link on Scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').includes(current)) {
        item.classList.add('active');
      }
    });
  });

  // ============================================================
  // ENTRANCE ANIMATIONS — IntersectionObserver
  // ============================================================
  const animatedEls = document.querySelectorAll('.aos, .section-title-underline');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  animatedEls.forEach((el) => observer.observe(el));

  // ============================================================
  // HERO PARALLAX — subtle background drift on scroll
  // ============================================================
  const heroBgImg = document.querySelector('.hero-bg img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      if (scrolled < heroHeight * 1.5) {
        heroBgImg.style.transform = `translateY(${scrolled * 0.25}px)`;
      }
    }, { passive: true });
  }

  // ============================================================
  // SERVICE CARDS — ripple click effect
  // ============================================================
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      // Don't block button clicks
      if (e.target.closest('.btn')) return;
      const ripple = document.createElement('span');
      const rect  = card.getBoundingClientRect();
      const size  = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute;
        border-radius:50%;
        background:rgba(221,182,105,0.35);
        width:${size}px;
        height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top  - size / 2}px;
        transform:scale(0);
        animation:rippleEffect 0.6s linear;
        pointer-events:none;
        z-index:10;
      `;
      card.style.position = 'relative';
      card.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
});
