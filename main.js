// main.js - Lógica para la página del estudio de tatuaje
// main.js - Lógica para la página del estudio de tatuaje


document.addEventListener('DOMContentLoaded', function () {
  // Navegación suave y scroll animado, cierre menú móvil Bootstrap
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Cierra el menú móvil Bootstrap si está abierto
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          document.querySelector('.navbar-toggler').click();
        }
        // Enfatiza la sección destino
        const target = document.querySelector(href);
        target.classList.add('section-focus');
        setTimeout(() => target.classList.remove('section-focus'), 1200);
      }
    });
  });


  // Animación de entrada para secciones (opcional, mobile-friendly)
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


  // Formulario de contacto con validación avanzada y feedback accesible
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
        formMsg.setAttribute('role', 'alert');
        return;
      }
      if (!emailRegex.test(email)) {
        formMsg.textContent = 'Por favor, ingresa un email válido.';
        formMsg.style.color = '#c00';
        formMsg.setAttribute('role', 'alert');
        return;
      }
      formMsg.textContent = '¡Gracias por reservar! Te contactaremos pronto.';
      formMsg.style.color = '#111';
      formMsg.setAttribute('role', 'status');
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
