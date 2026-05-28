// ===== SPLASH SCREEN =====
(function () {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  // Lock scroll during splash
  document.body.classList.add('splash-active');

  // Create floating particles
  const particlesContainer = document.getElementById('splash-particles');
  const particleCount = 40;
  const colors = ['#c5ff41', '#f46c38', 'rgba(197, 255, 65, 0.5)', 'rgba(244, 108, 56, 0.4)'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('splash-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = 50 + Math.random() * 50 + '%';
    particle.style.width = (Math.random() * 3 + 1) + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
    particle.style.animationDelay = (Math.random() * 4) + 's';
    particlesContainer.appendChild(particle);
  }

  // Add glow shimmer to letters after they animate in
  const letters = splash.querySelectorAll('.splash-letter');
  letters.forEach((letter, idx) => {
    const delay = 400 + idx * 70 + 700; // match animation-delay + duration
    setTimeout(() => {
      letter.classList.add('glow');
    }, delay);
  });

  // Dismiss splash after 5 seconds
  const SPLASH_DURATION = 5000;

  setTimeout(() => {
    splash.classList.add('splash-exit');
    document.body.classList.remove('splash-active');

    // Remove from DOM after transition completes
    setTimeout(() => {
      splash.remove();
    }, 800);
  }, SPLASH_DURATION);
})();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  navbar.classList.toggle('menu-open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinksItems.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    navbar.classList.remove('menu-open');
    document.body.style.overflow = '';
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', highlightNav);

// ===== SCROLL REVEAL (Intersection Observer) =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== TYPING ANIMATION =====
const typedElement = document.getElementById('typed-text');

if (typedElement) {
  const titles = [
    'Full Stack Developer',
    'CS Undergraduate',
    'Python Enthusiast',
    'Web Developer'
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typedElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typedElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing after a short delay
  setTimeout(type, 1000);
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  });
});

// ===== CONTACT FORM (mailto) =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value;

    const mailtoLink = `mailto:vipuradevnak@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;

    window.location.href = mailtoLink;
  });
}

// ===== SKILL TAGS MICRO-ANIMATION =====
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, i) => {
  tag.style.animationDelay = `${i * 50}ms`;
});

// ===== PARALLAX FOR HERO GLOWS =====
window.addEventListener('mousemove', (e) => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const rect = hero.getBoundingClientRect();
  if (e.clientY > rect.bottom) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  hero.style.setProperty('--mouse-x', `${x}px`);
  hero.style.setProperty('--mouse-y', `${y}px`);
});

// ===== COUNTER ANIMATION FOR STATS =====
const statNumbers = document.querySelectorAll('.hero-stat-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const finalValue = target.getAttribute('data-count');
      const suffix = target.getAttribute('data-suffix') || '';
      const prefix = target.getAttribute('data-prefix') || '';
      let current = 0;
      const increment = Math.ceil(parseInt(finalValue) / 40);
      const timer = setInterval(() => {
        current += increment;
        if (current >= parseInt(finalValue)) {
          current = parseInt(finalValue);
          clearInterval(timer);
        }
        target.textContent = `${prefix}${current}${suffix}`;
      }, 30);
      counterObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ===== TIMELINE SCROLL ANIMATION =====
const timeline = document.querySelector('.timeline');
if (timeline) {
  window.addEventListener('scroll', () => {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    const startOffset = windowHeight * 0.7;
    const scrolledPast = startOffset - rect.top;
    const animationDistance = rect.height; 
    
    let progress = 0;
    if (scrolledPast > 0) {
      progress = (scrolledPast / animationDistance) * 100;
    }
    
    progress = Math.max(0, Math.min(100, progress));
    timeline.style.setProperty('--scroll-progress', `${progress}%`);
  });
  
  // Trigger once to set initial state
  window.dispatchEvent(new Event('scroll'));
}

// ===== INITIALIZE LUCIDE ICONS =====
lucide.createIcons();
