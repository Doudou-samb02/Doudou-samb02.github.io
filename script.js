/* THEME: auto + toggle (persist) */
const root = document.documentElement;
const btn = document.getElementById('themeToggle');

function setLucideIcon(name){
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

/* TYPING EFFECT */
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

/* PARTICLES */
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
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: false }, onclick: { enable: false } }
    },
    retina_detect: true
  });
}

/* VANILLA TILT init for elements with data-tilt */
document.addEventListener('DOMContentLoaded', ()=>{
  const tiltEls = document.querySelectorAll('[data-tilt]');
  if(tiltEls.length && window.VanillaTilt){
    VanillaTilt.init(tiltEls, {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.12,
      scale: 1.02
    });
  }
});

/* SKILL BARS animate on view */
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

/* MOTION-STYLE STAGGERED ENTRY */
function animateStagger(selectors, stagger = 0.08){
  const els = document.querySelectorAll(selectors);
  if(!els.length) return;
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const list = Array.from(entry.target.querySelectorAll(selectors));
        // if observer target is an element itself, animate it
        if(list.length === 0) {
          motion.animate(entry.target, {opacity:[0,1], translateY:[18,0], scale:[0.995,1]}, {duration:0.8, easing:'ease-out'});
        } else {
          list.forEach((el,i)=> {
            motion.animate(el, {opacity:[0,1], translateY:[18,0], scale:[0.995,1]}, {duration:0.7, delay:i*stagger, easing:'ease-out'});
          });
        }
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.18});
  // observe parents so we get grouped stagger animation
  document.querySelectorAll(selectors).forEach(el=>{
    let parent = el.parentElement;
    if(parent) io.observe(parent);
  });
}
document.addEventListener('DOMContentLoaded', ()=>{
  // hero initial animation
  const heroInner = document.getElementById('heroInner');
  if(heroInner){
    motion.animate(heroInner, { opacity:[0,1], translateY:[20,0] }, { duration: 0.9, easing: "ease-out" });
  }

  // staggered animations for groups
  animateStagger('.service-card');
  animateStagger('.project-card');
  animateStagger('.timeline-item');
  animateStagger('.skill');

  // create lucide icons
  if(window.lucide) lucide.createIcons();
});

/* PARALLAX HERO: subtle parallax on mousemove */
const hero = document.querySelector('.hero');
const particlesLayer = document.getElementById('particles-js');
if(hero){
  hero.addEventListener('mousemove', (e)=>{
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height;
    // move particles slightly for parallax
    if(particlesLayer) particlesLayer.style.transform = `translate(${(x-0.5)*6}px, ${(y-0.5)*6}px)`;
    // subtle tilt of hero inner
    const heroInner = document.getElementById('heroInner');
    if(heroInner) heroInner.style.transform = `translate(${(x-0.5)*8}px, ${(y-0.5)*8}px)`;
  });
  hero.addEventListener('mouseleave', ()=>{
    if(particlesLayer) particlesLayer.style.transform = `translate(0,0)`;
    const heroInner = document.getElementById('heroInner');
    if(heroInner) heroInner.style.transform = `translate(0,0)`;
  });
}

/* CURSOR GLOW follow */
const cursor = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e)=>{
  if(!cursor) return;
  cursor.style.opacity = '1';
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  // reduce opacity after time
  clearTimeout(cursor._fade);
  cursor._fade = setTimeout(()=>{ cursor.style.opacity = '0' }, 1200);
});

/* CONTACT FORM (demo) */
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
