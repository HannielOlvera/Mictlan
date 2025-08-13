// main.js - Lógica para la página del estudio de tatuaje
// main.js - Lógica para la página del estudio de tatuaje


document.addEventListener('DOMContentLoaded', function () {
  // Navegación suave y énfasis visual tipo app
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Cierra menú móvil si existe y está abierto
        const mobileMenu = document.getElementById('mobileMenu');
        const navToggler = document.getElementById('navToggler');
        if (mobileMenu && navToggler && !mobileMenu.hasAttribute('hidden')) {
          mobileMenu.setAttribute('hidden','');
          navToggler.setAttribute('aria-expanded','false');
        }
        // Cierra menú Bootstrap si existe
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          document.querySelector('.navbar-toggler').click();
        }
        // Enfatiza la sección destino
        target.classList.add('section-focus');
        setTimeout(() => target.classList.remove('section-focus'), 1200);
      }
    });
  });

  // Animación de entrada para secciones y cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section, .card, .hero, .gallery img').forEach(el => {
    el.classList.add('fade-init');
    observer.observe(el);
  });

  // Lazy-load para galería si existe
  document.querySelectorAll('#gallery img[data-src]').forEach(img => {
    const src = img.getAttribute('data-src');
    if (src) img.src = src;
  });

  // Formulario de contacto UX mejorado
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = form.nombre?.value.trim() || '';
      const email = form.email?.value.trim() || '';
      const mensaje = form.mensaje?.value.trim() || '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!nombre || !email || !mensaje) {
        formMsg.textContent = 'Por favor completa los campos obligatorios (*).';
        formMsg.style.color = '#ffb3a3';
        formMsg.setAttribute('role', 'alert');
        return;
      }
      if (!emailRegex.test(email)) {
        formMsg.textContent = 'Email inválido. Revisa y vuelve a intentar.';
        formMsg.style.color = '#ffb3a3';
        formMsg.setAttribute('role', 'alert');
        return;
      }
      formMsg.textContent = '¡Gracias! Tu solicitud fue recibida. Te contactaremos pronto.';
      formMsg.style.color = '#1a7f4c';
      formMsg.setAttribute('role', 'status');
      form.reset();
      setTimeout(() => { formMsg.textContent = ''; }, 5000);
    });
    // UX: limpiar mensaje al escribir
    form.querySelectorAll('input, textarea, select').forEach(el => {
      el.addEventListener('input', () => { formMsg.textContent = ''; });
    });
  }

  // Accesibilidad: enfocar primer campo al abrir contacto
  document.querySelectorAll('a[href="#contacto"]').forEach(a => {
    a.addEventListener('click', () => setTimeout(() => {
      const nombre = document.getElementById('nombre') || (form && form.nombre);
      if (nombre) nombre.focus();
    }, 600));
  });

  // Año dinámico para footer si existe
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
