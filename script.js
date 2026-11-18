const root = document.documentElement;
const themeToggle = document.querySelector('#themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const themeLabel = themeToggle.querySelector('.theme-label');

function setTheme(theme) {
  root.dataset.theme = theme;
  const isLight = theme === 'light';
  themeIcon.textContent = isLight ? '☾' : '☀';
  themeLabel.textContent = isLight ? 'Dark' : 'Light';
  themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
  localStorage.setItem('opscraft-theme', theme);
}

const savedTheme = localStorage.getItem('opscraft-theme');
if (savedTheme) setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
});

document.querySelectorAll('.expand-button').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.module-card');
    const isOpen = card.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

const filterButtons = document.querySelectorAll('.filter');
const moduleCards = document.querySelectorAll('.module-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.filter;

    moduleCards.forEach((card) => {
      const show = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('hidden', !show);
    });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
