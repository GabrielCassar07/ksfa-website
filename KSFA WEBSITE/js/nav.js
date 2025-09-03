// Mobile nav toggle
(function () {
    const btn = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    if (!btn || !nav) return;
  
    const open = () => {
      nav.classList.add('open');
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');      // overlay + lock scroll
      document.body.style.overflow = 'hidden';
    };
  
    const close = () => {
      nav.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    };
  
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      expanded ? close() : open();
    });
  
    // Close when clicking overlay area
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('open')) return;
      const clickInside = nav.contains(e.target) || btn.contains(e.target);
      if (!clickInside) close();
    });
  
    // Close with Esc
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) close();
    });
  })();
  