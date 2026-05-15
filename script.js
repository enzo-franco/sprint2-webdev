// ============================================================
// COMMIT 1 — Smooth scroll + link ativo na nav
// ============================================================

const links    = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    const id     = this.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

function marcarAtivo() {
  let idAtual = '';
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= 120) {
      idAtual = section.id;
    }
  });
  links.forEach(link => {
    if (link.getAttribute('href') === '#' + idAtual) {
      link.classList.add('nav-active');
    } else {
      link.classList.remove('nav-active');
    }
  });
}

window.addEventListener('scroll', marcarAtivo);
marcarAtivo();
