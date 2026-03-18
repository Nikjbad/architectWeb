/* CURSOR */
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function tick(){
  rx += (mx - rx) * .12; ry += (my - ry) * .12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(tick);
})();
document.querySelectorAll('a, button, .form-input, select').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.width='6px'; cur.style.height='6px'; ring.style.width='56px'; ring.style.height='56px'; ring.style.borderColor='rgba(0,0,0,.4)'; });
  el.addEventListener('mouseleave', () => { cur.style.width='10px'; cur.style.height='10px'; ring.style.width='40px'; ring.style.height='40px'; ring.style.borderColor='rgba(0,0,0,.2)'; });
});

/* NAV */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scroll', window.scrollY > 50);
}, { passive: true });

/* MOBILE DRAWER */
const ham = document.getElementById('ham');
const drawer = document.getElementById('drawer');
const ov = document.getElementById('ov');
const toggleDrawer = open => {
  ham.classList.toggle('open', open);
  drawer.classList.toggle('open', open);
  ov.classList.toggle('show', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
ham.addEventListener('click', () => toggleDrawer(!drawer.classList.contains('open')));
ov.addEventListener('click', () => toggleDrawer(false));
document.querySelectorAll('.dl').forEach(a => a.addEventListener('click', () => toggleDrawer(false)));

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* REVEAL */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); ro.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.r').forEach(el => ro.observe(el));

/* COUNTERS */
const co = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, tgt = +el.dataset.target || 0, step = Math.ceil(tgt / 50);
    let v = 0;
    const t = setInterval(() => { v = Math.min(v + step, tgt); el.textContent = v; if (v >= tgt) clearInterval(t); }, 25);
    co.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(c => co.observe(c));

/* FAQ */
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    item.classList.toggle('open');
  });
});

/* FORM */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const n  = document.getElementById('cName').value.trim();
  const em = document.getElementById('cEmail').value.trim();
  const p  = document.getElementById('cPhone').value.trim();
  const t  = document.getElementById('cType').value || 'General Inquiry';
  const tl = document.getElementById('cTimeline')?.value || 'Not specified';
  const m  = document.getElementById('cMsg').value.trim();
  const txt = encodeURIComponent(`*New Project Inquiry — SG Architects*\n\n*Name:* ${n}\n*Email:* ${em}\n*Phone:* ${p}\n*Project Type:* ${t}\n*Timeline:* ${tl}\n*Message:* ${m}`);
  window.open(`https://wa.me/919411960694?text=${txt}`, '_blank');
  e.target.reset();
});

/* GSAP INTERACTIONS */
if (typeof gsap !== 'undefined') {
  document.querySelectorAll('.btng, .btno, .nav-cta').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      gsap.to(b, { x: (e.clientX - r.left - r.width/2) * .2, y: (e.clientY - r.top - r.height/2) * .2, duration: .3 });
    });
    b.addEventListener('mouseleave', () => gsap.to(b, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,.5)' }));
  });
}
