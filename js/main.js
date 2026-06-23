(function () {
  'use strict';

  // ── NAV SCROLL ──
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── MOBILE MENU ──
  var burger = document.getElementById('burger');
  var mob = document.getElementById('mobMenu');
  burger.addEventListener('click', function () {
    burger.classList.toggle('active');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });
  mob.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      burger.classList.remove('active');
      mob.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var t = document.querySelector(id);
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.offsetTop - 72, behavior: 'smooth' });
      }
    });
  });

  // ── HERO SLIDER ──
  var slides = document.querySelectorAll('.hero__slide');
  var dots = document.querySelectorAll('.hero__dot');
  var current = 0;
  var total = slides.length;

  function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  // Auto-advance every 5s
  var autoSlide = setInterval(function () {
    goToSlide((current + 1) % total);
  }, 5000);

  // Dot clicks
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      clearInterval(autoSlide);
      goToSlide(parseInt(this.getAttribute('data-slide')));
      autoSlide = setInterval(function () {
        goToSlide((current + 1) % total);
      }, 5000);
    });
  });

  // ── SCROLL REVEAL ──
  var revealEls = document.querySelectorAll('[data-r]');
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function (el) { revealObs.observe(el); });

})();
