/* ===== THEME: auto + toggle (persist) ===== */
const root = document.documentElement;
const btn = document.getElementById('themeToggle');

function applyTheme(t){
  root.setAttribute('data-theme', t);
  // change icon if lucide present
  try{
    const icon = btn.querySelector('svg');
    if(icon){
      if(t==='light'){ icon.setAttribute('data-icon','sun'); }
      else{ icon.setAttribute('data-icon','moon'); }
    }
  }catch(e){}
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
/* lightweight config for purple/cyan particles */
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

/* ===== SKILLS BARS: animate when visible ===== */
const skillBars = document.querySelectorAll('.bar > div');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const level = el.style.getPropertyValue('--level') || el.getAttribute('data-level') || el.style.width || el.getAttribute('style') || '';
        // try to read CSS var --level on parent
        const parent = el.parentElement;
        let target = el.style.width;
        // read computed style for --level on the parent (we set inline style in html as --level)
        try{
          const cs = getComputedStyle(parent);
          const val = cs.getPropertyValue('--level') || el.getAttribute('data-level');
          if(val){ el.style.width = val.trim(); }
          else { el.style.width = el.getAttribute('data-width') || '70%'; }
        }catch(e){
          el.style.width = el.getAttribute('data-width') || '70%';
        }
        obs.unobserve(el);
      }
    });
  }, {threshold: 0.35});
  skillBars.forEach(bar => {
    // if inline style --level used on parent, transfer to inner div as width when visible
    io.observe(bar);
  });
} else {
  // fallback: animate immediately
  skillBars.forEach(b => b.style.width = b.getAttribute('data-width') || '70%');
}

/* ===== MOTION-LIKE ENTRY (Motion One) for cards & sections ===== */
function animateOnView(selector, opts = {}) {
  const els = document.querySelectorAll(selector);
  if(!els.length) return;
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const e = entry.target;
        motion.animate(e, { opacity: [0,1], translateY: [20,0], scale: [0.98,1] }, { duration: 0.8, easing: "ease-out" });
        obs.unobserve(e);
      }
    });
  }, {threshold: 0.18});
  els.forEach(el => io.observe(el));
}
document.addEventListener('DOMContentLoaded', ()=>{
  animateOnView('.card');
  animateOnView('.service-card');
  animateOnView('.project-card');
  animateOnView('.timeline-item');
  animateOnView('.skill');
});

/* ===== Contact form (simple demo) ===== */
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
