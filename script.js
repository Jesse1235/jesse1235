const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

const bookingForm = document.querySelector('#booking-form');
const formStatus = bookingForm.querySelector('.form-status');
const dateInput = bookingForm.querySelector('input[type="date"]');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
dateInput.min = localToday;

bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  bookingForm.querySelectorAll('.field-error').forEach(field => field.classList.remove('field-error'));
  const requiredFields = [...bookingForm.querySelectorAll('[required]')];
  const invalidFields = requiredFields.filter(field => !field.value.trim() || !field.checkValidity());

  if (invalidFields.length) {
    invalidFields.forEach(field => field.classList.add('field-error'));
    invalidFields[0].focus();
    formStatus.textContent = 'Please complete the highlighted fields.';
    return;
  }

  formStatus.textContent = 'Thank you. This demo form has not sent or booked an appointment.';
  bookingForm.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
