// Menú hamburguesa responsive
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('open');
    });
    // Cierra menú al hacer click en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', false);
        navLinks.classList.remove('open');
      });
    });
  }
});
// main.js - Lógica para la página del estudio de tatuaje

document.addEventListener('DOMContentLoaded', function () {
  // Navegación suave y scroll animado
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Enfatiza la sección destino
        target.classList.add('section-focus');
        setTimeout(() => target.classList.remove('section-focus'), 1200);
      }
    });
  });

  // Animación de entrada para secciones
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.section, .hero').forEach(sec => {
    sec.classList.add('fade-init');
    observer.observe(sec);
  });

  // Formulario de contacto con validación avanzada
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const mensaje = form.mensaje.value.trim();
      // Validación de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!nombre || !email || !mensaje) {
        formMsg.textContent = 'Por favor, completa todos los campos.';
        formMsg.style.color = '#c00';
        return;
      }
      if (!emailRegex.test(email)) {
        formMsg.textContent = 'Por favor, ingresa un email válido.';
        formMsg.style.color = '#c00';
        return;
      }
      formMsg.textContent = '¡Gracias por reservar! Te contactaremos pronto.';
      formMsg.style.color = '#111';
      form.reset();
      setTimeout(() => { formMsg.textContent = ''; }, 4000);
    });
    // UX: limpiar mensaje al escribir
    form.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('input', () => { formMsg.textContent = ''; });
    });
  }

  // Accesibilidad: enfocar primer campo al abrir contacto
  const contactoLink = document.querySelector('a[href="#contacto"]');
  if (contactoLink && form) {
    contactoLink.addEventListener('click', () => {
      setTimeout(() => form.nombre.focus(), 600);
    });
  }
});
