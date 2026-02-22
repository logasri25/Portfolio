/* ---------- PARTICLE BACKGROUND ---------- */
(() => {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize, false);
  resize();

  function rand(min, max){ return Math.random()*(max-min)+min }

  function createParticles(count = Math.round((w*h)/70000)) {
    particles = [];
    for(let i=0;i<count;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: rand(0.6,2.2),
        vx: rand(-0.3,0.3),
        vy: rand(-0.2,0.2),
        hue: rand(180,260),
        alpha: rand(0.04,0.22)
      });
    }
  }
  createParticles();

  function step(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < -10) p.x = w+10;
      if(p.x > w+10) p.x = -10;
      if(p.y < -10) p.y = h+10;
      if(p.y > h+10) p.y = -10;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 85%, 60%, ${p.alpha})`;
      ctx.shadowColor = `hsla(${p.hue}, 85%, 60%, ${p.alpha*1.4})`;
      ctx.shadowBlur = 12;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();
})();

/* ---------- TYPING EFFECT ---------- */
(() => {
  const el = document.querySelector('.typing');
  const phrases = ['Software Developer','Python Enthusiast','IoT & Web Builder','Problem Solver'];
  let pi = 0, ci = 0, forward = true;

  function tick(){
    const word = phrases[pi];
    if(forward){
      ci++;
      if(ci > word.length){ forward = false; setTimeout(tick,1200); return; }
    } else {
      ci--;
      if(ci < 0){ forward = true; pi = (pi+1)%phrases.length; setTimeout(tick,220); return; }
    }
    el.textContent = word.substring(0,ci);
    setTimeout(tick, forward ? 80 : 40);
  }
  tick();
})();

/* ---------- SKILL BAR ANIMATION ON SCROLL ---------- */
(() => {
  const fills = document.querySelectorAll('.skill-bar .fill');
  const options = {threshold: 0.35};
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const f = entry.target;
        const pct = f.dataset.percent || 80;
        f.style.width = pct + '%';
      }
    });
  }, options);

  fills.forEach(f => { f.style.width = '0%'; observer.observe(f); });
})();

/* ---------- SIMPLE TILT (mouse-based) ---------- */
(() => {
  const tilts = document.querySelectorAll('[data-tilt]');
  tilts.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width/2, cy = rect.height/2;
      const dx = (x - cx) / cx; const dy = (y - cy) / cy;
      el.style.transform = `perspective(900px) rotateX(${(-dy*6)}deg) rotateY(${(dx*6)}deg) translateY(-6px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
})();

/* ---------- NAV TOGGLE FOR MOBILE ---------- */
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  toggle && toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', (!open).toString());
    links.style.display = open ? 'none' : 'flex';
  });
})();

/* ---------- SMOOTH SCROLL (adjust offset for fixed nav) ---------- */
(() => {
  const OFFSET = 14;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - OFFSET - 70;
      window.scrollTo({top, behavior:'smooth'});
    });
  });
})();