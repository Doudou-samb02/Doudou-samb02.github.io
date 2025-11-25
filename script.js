/* ===== THEME: auto + toggle (persist) ===== */
const root = document.documentElement;
const btn = document.getElementById('themeToggle');

function setLucideIcon(name){
  // replace button contents with icon and re-create icons
  btn.innerHTML = `<i data-lucide="${name}"></i>`;
  if(window.lucide) lucide.createIcons();
}

function applyTheme(t){
  root.setAttribute('data-theme', t);
  setLucideIcon(t === 'light' ? 'sun' : 'moon');
}

const saved = localStorage.getItem('theme');
if(saved){
  applyTheme(saved);
}else{
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(prefersLight ? 'light' : 'dark');
}

btn.addEventListener('click', ()=>{
  const cur = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(cur);
  localStorage.setItem('theme', cur);
});

/* ===== TYPING EFFECT ===== */
const words = ["Développeur Web","Créateur d'applications","Passionné d'IA"];
const el = document.getElementById('typing');
let wIndex = 0, chIndex = 0, deleting=false;

function typeLoop(){
  if(!el) return;
  const word = words[wIndex];
  if(!deleting){
    chIndex++;
    el.textContent = word.slice(0,chIndex);
    if(chIndex === word.length){
      deleting = true;
      setTimeout(typeLoop, 900);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    chIndex--;
    el.textContent = word.slice(0,chIndex);
    if(chIndex === 0){
      deleting=false;
      wIndex = (wIndex+1)%words.length;
      setTimeout(typeLoop, 200);
      return;
    }
    setTimeout(typeLoop, 40);
  }
}
if(el) typeLoop();

/* ===== PARTICLES (particles.js) ===== */
if(window.particlesJS){
  particlesJS('particles-js', {
    particles: {
      number: { value: 40, density: { enable: true, value_area: 800 } },
      color: { value: ["#7C3AED","#06B6D4","#ffffff"] },
      shape: { type: "circle" },
      opacity: { value: 0.12, random: true },
      size: { value: 4, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 1.2, direction: "none", out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: false }, onclick: { enable: false } }
    },
    retina_detect: true
  });
}

/* ===== SKILLS BARS: animate when visible (using data-width) ===== */
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
  }, {threshold: 0.3});
  skillBars.forEach(bar => io.observe(bar));
} else {
  skillBars.forEach(b => b.style.width = b.getAttribute('data-width') || '70%');
}

/* ===== MOTION-STYLE ENTRY (Motion One) ===== */
function animateOnView(selector){
  const els = document.querySelectorAll(selector);
  if(!els.length) return;
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        motion.animate(entry.target, { opacity: [0,1], translateY: [18,0], scale: [0.995,1] }, { duration: 0.8, easing: "ease-out" });
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.18});
  els.forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', ()=>{
  // animate hero inner on load
  const heroInner = document.getElementById('heroInner');
  if(heroInner){
    motion.animate(heroInner, { opacity: [0,1], translateY: [20,0] }, { duration: 0.9, easing: "ease-out" });
  }

  // animate elements when in view
  animateOnView('.card');
  animateOnView('.service-card');
  animateOnView('.project-card');
  animateOnView('.timeline-item');
  animateOnView('.skill');

  // ensure lucide icons rendered
  if(window.lucide) lucide.createIcons();
});

/* ===== CONTACT form (demo) ===== */
const form = document.querySelector('.contact-form');
if(form){
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = 'Envoi...';
    setTimeout(()=>{
      btn.textContent = 'Envoyer';
      alert('Merci — message simulé envoyé ! (intègre un back-end pour l’envoyer réellement)');
      form.reset();
    },1200);
  });
}
