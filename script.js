/* ===== THEME: auto + toggle (persist) ===== */
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

function setLucideIcon(name){
  if(!themeBtn) return;
  themeBtn.innerHTML = `<i data-lucide="${name}"></i>`;
  if(window.lucide) lucide.createIcons();
}

function applyTheme(theme){
  root.setAttribute('data-theme', theme);
  setLucideIcon(theme === 'light' ? 'sun' : 'moon');
}

// Load saved theme or system preference
const savedTheme = localStorage.getItem('theme');
if(savedTheme){
  applyTheme(savedTheme);
}else{
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(prefersLight ? 'light' : 'dark');
}

// Toggle theme
if(themeBtn){
  themeBtn.addEventListener('click', ()=>{
    const curTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(curTheme);
    localStorage.setItem('theme', curTheme);
  });
}

/* ===== MOBILE MENU ===== */
const burgerToggle = document.getElementById('burgerToggle');
const mobileNav = document.getElementById('mobileMenu');

burgerToggle?.addEventListener('click', ()=> mobileNav.classList.toggle('show'));

/* ===== HERO TYPING EFFECT ===== */
const words = ["Développeur Web","Créateur d'applications","Passionné d'IA"];
const typingEl = document.getElementById('typing');
let wIndex = 0, chIndex = 0, deleting = false;

function typeLoop(){
  if(!typingEl) return;
  const word = words[wIndex];
  if(!deleting){
    chIndex++;
    typingEl.textContent = word.slice(0,chIndex);
    if(chIndex === word.length){ deleting = true; setTimeout(typeLoop, 900); return; }
    setTimeout(typeLoop, 80);
  } else {
    chIndex--;
    typingEl.textContent = word.slice(0,chIndex);
    if(chIndex === 0){ deleting = false; wIndex = (wIndex+1)%words.length; setTimeout(typeLoop, 200); return; }
    setTimeout(typeLoop, 40);
  }
}
typeLoop();

/* ===== PARTICLES.JS ===== */
if(window.particlesJS){
  particlesJS('particles-js', {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 900 } },
      color: { value: ["#7C3AED","#06B6D4","#ffffff"] },
      shape: { type: "circle" },
      opacity: { value: 0.12, random: true },
      size: { value: 4, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 1.4, direction: "none", out_mode: "out" }
    },
    interactivity: { detect_on: "canvas", events: { onhover: { enable: false }, onclick: { enable: false } } },
    retina_detect: true
  });
}

/* ===== VANILLA TILT ===== */
document.addEventListener('DOMContentLoaded', ()=>{
  const tiltEls = document.querySelectorAll('[data-tilt]');
  if(tiltEls.length && window.VanillaTilt){
    VanillaTilt.init(tiltEls, { max: 10, speed: 400, glare: true, "max-glare": 0.12, scale: 1.02 });
  }
});

/* ===== SKILL BARS ANIMATION ===== */
const skillBars = document.querySelectorAll('.bar > div');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const width = el.getAttribute('data-width') || '70%';
        el.style.width = width;
        obs.unobserve(el);
      }
    });
  }, {threshold: 0.32});
  skillBars.forEach(bar => io.observe(bar));
} else {
  skillBars.forEach(b => b.style.width = b.getAttribute('data-width') || '70%');
}

/* ===== STAGGERED ANIMATIONS ===== */
function animateStagger(selectors, stagger = 0.08){
  const els = document.querySelectorAll(selectors);
  if(!els.length) return;
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const list = Array.from(entry.target.querySelectorAll(selectors));
        if(list.length === 0) {
          motion.animate(entry.target, {opacity:[0,1], translateY:[18,0], scale:[0.995,1]}, {duration:0.8, easing:'ease-out'});
        } else {
          list.forEach((el,i)=>{
            motion.animate(el, {opacity:[0,1], translateY:[18,0], scale:[0.995,1]}, {duration:0.7, delay:i*stagger, easing:'ease-out'});
          });
        }
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.18});
  document.querySelectorAll(selectors).forEach(el=>{
    let parent = el.parentElement;
    if(parent) io.observe(parent);
  });
}
document.addEventListener('DOMContentLoaded', ()=>{
  const heroInner = document.getElementById('heroInner');
  if(heroInner) motion.animate(heroInner, { opacity:[0,1], translateY:[20,0] }, { duration: 0.9, easing: "ease-out" });
  animateStagger('.service-card');
  animateStagger('.project-card');
  animateStagger('.timeline-item');
  animateStagger('.skill');
  if(window.lucide) lucide.createIcons();
});

/* ===== HERO PARALLAX ===== */
const hero = document.querySelector('.hero');
const particlesLayer = document.getElementById('particles-js');
if(hero){
  hero.addEventListener('mousemove', e=>{
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    if(particlesLayer) particlesLayer.style.transform = `translate(${(x-0.5)*6}px, ${(y-0.5)*6}px)`;
    const heroInner = document.getElementById('heroInner');
    if(heroInner) heroInner.style.transform = `translate(${(x-0.5)*8}px, ${(y-0.5)*8}px)`;
  });
  hero.addEventListener('mouseleave', ()=>{
    if(particlesLayer) particlesLayer.style.transform = `translate(0,0)`;
    const heroInner = document.getElementById('heroInner');
    if(heroInner) heroInner.style.transform = `translate(0,0)`;
  });
}

/* ===== CUSTOM CURSOR GLOW ===== */
const cursor = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e=>{
  if(!cursor) return;
  cursor.style.opacity = '1';
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  clearTimeout(cursor._fade);
  cursor._fade = setTimeout(()=>{ cursor.style.opacity = '0'; }, 1200);
});

/* ===== CONTACT FORM SIMULÉ ===== */
const form = document.querySelector('.contact-form');
if(form){
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = 'Envoi...';
    setTimeout(()=>{
      btn.textContent = 'Envoyer';
      alert('Merci — message simulé envoyé ! (pendant dev, intègre un back-end pour envoi réel)');
      form.reset();
    },1200);
  });
}

/* ===== HEADER SCROLL EFFECT ===== */
window.addEventListener('scroll', ()=>{
  const header = document.querySelector('header');
  if(window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});


/* ===== MODAL PROJET ===== */
const videoUrl = "https://www.youtube.com/embed/FLlu4MnW1yE";

function openProject(){
  const modal = document.getElementById('projectModal');
  const container = document.getElementById('projectVideoContainer');

  // Réinitialise vidéo
  container.innerHTML = '';
  container.style.display = 'none';

  // Affiche modal
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden','false');
}

function showVideo(){
  const container = document.getElementById('projectVideoContainer');
  if(container.style.display === 'block') return;

  container.innerHTML = `
    <iframe src="${videoUrl}?autoplay=1"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="position:absolute; top:0; left:0; width:100%; height:100%;">
    </iframe>
  `;
  container.style.display = 'block';
}

function closeProject(){
  const modal = document.getElementById('projectModal');
  const container = document.getElementById('projectVideoContainer');

  modal.style.display = 'none';
  modal.setAttribute('aria-hidden','true');
  container.style.display = 'none';
  container.innerHTML = '';
}
