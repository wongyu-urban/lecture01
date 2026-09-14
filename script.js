const button = document.querySelector('.menu-button');
const links = document.querySelector('.nav-links');
button?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  button.setAttribute('aria-expanded', open);
  button.querySelector('span').textContent = open ? '−' : '+';
});
