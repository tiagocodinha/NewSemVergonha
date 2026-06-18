(function () {
  'use strict';

  // Nav scroll
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Mobile menu
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

  // Scroll reveal
  var els = document.querySelectorAll('[data-r]');
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  els.forEach(function (el) { obs.observe(el); });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var t = document.querySelector(id);
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // Parallax hero
  var bg = document.querySelector('.hero__bg');
  window.addEventListener('scroll', function () {
    if (bg && window.scrollY < window.innerHeight) {
      bg.style.transform = 'translateY(' + window.scrollY * 0.3 + 'px)';
    }
  }, { passive: true });

})();
