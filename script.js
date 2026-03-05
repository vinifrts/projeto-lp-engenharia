/* ============================================================
   LP ENGENHARIA — script.js
   Funcionalidades:
   - Hero: animação de zoom ao carregar
   - Navbar: muda visual ao rolar a página
   - Menu hamburguer mobile com animação de X
   - Scroll Reveal via IntersectionObserver
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Hero: adiciona classe .loaded para acionar zoom suave do fundo ── */
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => {
      setTimeout(() => hero.classList.add('loaded'), 100);
    });
  }

  /* ── 2. Navbar: fundo preto sólido ao rolar ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // estado inicial
  }

  /* ── 3. Menu hamburguer (mobile) ── */
  const toggle   = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {

    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      const bars   = toggle.querySelectorAll('span');

      // Animação: barras → X
      if (isOpen) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        document.body.style.overflow = 'hidden'; // trava o scroll
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity   = '1';
        bars[2].style.transform = '';
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Fecha ao clicar em qualquer link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.querySelectorAll('span').forEach(b => {
          b.style.transform = '';
          b.style.opacity   = '1';
        });
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── 4. Scroll Reveal com IntersectionObserver ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // para de observar após revelar
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1,
      }
    );

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback para browsers sem suporte: mostra tudo imediatamente
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── 5. Stagger delay nos cards de área (efeito cascata) ── */
  document.querySelectorAll('.area-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

});