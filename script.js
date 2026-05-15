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


const slides = [
  { label: 'Anotações de Cálculo',   bg: 'linear-gradient(135deg,#1a0a2e,#3d1a6e)', icon: '📐' },
  { label: 'Mapa Mental - História', bg: 'linear-gradient(135deg,#0a1a2e,#1a4a6e)', icon: '🗺️' },
  { label: 'Resumo de Biologia',     bg: 'linear-gradient(135deg,#0a2e1a,#1a6e3a)', icon: '🧬' },
  { label: 'Fórmulas de Física',     bg: 'linear-gradient(135deg,#2e1a0a,#6e3a1a)', icon: '⚡' },
  { label: 'Redação - Português',    bg: 'linear-gradient(135deg,#2e0a1a,#6e1a3a)', icon: '✍️' },
];

const cameraView = document.querySelector('.camera-view');
let atual = 0;
let timer = null;

function renderizarSlide(idx) {
  const s  = slides[idx];
  let dots = '';
  slides.forEach((_, i) => {
    dots += '<span class="dot ' + (i === idx ? 'dot-active' : '') + '"></span>';
  });
  cameraView.style.background = s.bg;
  cameraView.innerHTML =
    '<div class="slide-content">' +
      '<span class="slide-icon">' + s.icon + '</span>' +
      '<p class="slide-label">' + s.label + '</p>' +
      '<div class="slide-dots">' + dots + '</div>' +
    '</div>';

  
  cameraView.appendChild(playBtn);
}


const playBtn = document.createElement('button');
playBtn.className = 'slideshow-play-btn';
playBtn.innerHTML = '▶';

playBtn.onclick = function(e) {
  e.stopPropagation(); 
  if (timer) {
    clearInterval(timer);
    timer = null;
    playBtn.innerHTML = '▶';
  } else {
    timer = setInterval(function() {
      atual = (atual + 1) % slides.length;
      renderizarSlide(atual);
    }, 2000);
    playBtn.innerHTML = '⏸';
  }
};


cameraView.onclick = function() {
  atual = (atual + 1) % slides.length;
  renderizarSlide(atual);
};

renderizarSlide(0);


let favoritos = JSON.parse(localStorage.getItem('modoestudo_favoritos')) || [];

function salvarFavoritos() {
  localStorage.setItem('modoestudo_favoritos', JSON.stringify(favoritos));
}

function atualizarContador() {
  const contador = document.getElementById('fav-contador');
  if (contador) {
    contador.textContent = favoritos.length > 0 ? ` ★${favoritos.length}` : '';
  }
}


const navLogo  = document.querySelector('.nav-logo');
const contador = document.createElement('span');
contador.id    = 'fav-contador';
contador.className = 'fav-contador';
if (navLogo) navLogo.appendChild(contador);


const cards = document.querySelectorAll('.modo-card');
cards.forEach(card => {
  const titulo = card.querySelector('.card-title').textContent.trim();
  const isFav  = favoritos.includes(titulo);

  const btn = document.createElement('button');
  btn.className = 'fav-btn' + (isFav ? ' fav-ativo' : '');
  btn.innerHTML = isFav ? '★' : '☆';
  card.appendChild(btn);

  btn.onclick = function() {
    if (favoritos.includes(titulo)) {
      favoritos = favoritos.filter(f => f !== titulo);
      btn.innerHTML = '☆';
      btn.classList.remove('fav-ativo');
    } else {
      favoritos.push(titulo);
      btn.innerHTML = '★';
      btn.classList.add('fav-ativo');
    }
    salvarFavoritos();
    atualizarContador();
  };
});

atualizarContador();


let tema = localStorage.getItem('modoestudo_tema') || 'dark';

function aplicarTema(t) {
  tema = t;
  document.documentElement.setAttribute('data-tema', tema);
  localStorage.setItem('modoestudo_tema', tema);
  btnTema.textContent = tema === 'dark' ? '☀️' : '🌙';
}

const navInner = document.querySelector('.nav-inner');
const btnTema  = document.createElement('button');
btnTema.className = 'btn-tema';

btnTema.onclick = function() {
  aplicarTema(tema === 'dark' ? 'light' : 'dark');
};

if (navInner) navInner.appendChild(btnTema);

aplicarTema(tema);
