// Mobile nav toggle
const toggle = document.querySelector('.mobile-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.textContent = isOpen ? 'CLOSE' : 'MENU';
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

// Scroll reveal
const toObserve = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });
toObserve.forEach(el => io.observe(el));

// Header shadow on scroll
const header = document.querySelector('header');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Subtle parallax on hero graphics
const heroGraphic = document.querySelector('.hero-graphic');
if (heroGraphic && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    heroGraphic.style.transform = `translate(${x}px, ${y}px)`;
  }, { passive: true });
}

// ===== Contact form -> WhatsApp handoff =====
// On submit, the enquiry is packaged into a pre-filled WhatsApp message
// sent to TrueSynk's number, so every lead lands directly in WhatsApp.
const TRUESYNK_WHATSAPP_NUMBER = '917338753966'; // country code + number, no symbols

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const company = document.getElementById('company')?.value.trim() || '';
    const service = document.getElementById('service')?.value || '';
    const budget = document.getElementById('budget')?.value.trim() || '';
    const msg = document.getElementById('msg')?.value.trim() || '';

    let text = `Hi TrueSynk, I'd like to start a project.%0A%0A`;
    text += `*Name:* ${name}%0A`;
    if (email) text += `*Email:* ${email}%0A`;
    if (company) text += `*Company:* ${company}%0A`;
    if (service) text += `*Service needed:* ${service}%0A`;
    if (budget) text += `*Budget:* ${budget}%0A`;
    text += `%0A*Project details:*%0A${msg}`;

    const waUrl = `https://wa.me/${TRUESYNK_WHATSAPP_NUMBER}?text=${text}`;

    const note = document.getElementById('form-success-note');
    if (note) {
      note.textContent = 'Opening WhatsApp with your details filled in — just hit send.';
      note.style.display = 'block';
    }

    window.open(waUrl, '_blank');
    contactForm.reset();
  });
}