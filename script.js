/* ============================================================
   CLEMENTINE — in-between
   script.js
   ============================================================ */


/* ============================================================
   PARALLAX SCROLL
   ============================================================ */
function onScroll() {
  const scrollY = window.scrollY;

  const rainbowWave = document.getElementById('rainbowWave');
  if (rainbowWave) {
    rainbowWave.style.transform = `translateY(${scrollY * 0.35}px)`;
  }

  document.querySelectorAll('[data-p]').forEach(el => {
    const speed = parseFloat(el.dataset.p);
    const rect  = el.parentElement.getBoundingClientRect();
    const offset = (window.innerHeight / 2 - rect.top) * speed;
    el.style.transform = `translateY(${offset}px)`;
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


/* ============================================================
   INTERSECTION OBSERVER — scroll-reveal animations
   ============================================================ */
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    el.classList.add('vis');

    if (el.classList.contains('mug-wrap')) {
      const fill  = el.querySelector('.mug-fill');
      const pct   = parseInt(el.dataset.pct || 0);
      const delay = parseInt(el.dataset.delay || 0) * 130;
      setTimeout(() => {
        fill.style.height = Math.round(pct * 0.3) + '%';
      }, delay);
    }

    obs.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  '.rev, .section-title, .id-card, .menu-card, .mug-wrap, .table-surface'
).forEach(el => obs.observe(el));

document.querySelectorAll('.world-card').forEach((card, i) => {
  const wObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      setTimeout(() => card.classList.add('vis'), i * 140);
      wObs.unobserve(card);
    });
  }, { threshold: 0.15 });
  wObs.observe(card);
});


/* ============================================================
   ABILITIES TABLE — popup modal
   Modal image = the same image that was clicked
   ============================================================ */
function showAbility(item) {
  document.querySelectorAll('.food-item').forEach(f => f.classList.remove('active'));
  item.classList.add('active');

  document.getElementById('modalTitle').textContent = item.dataset.title;
  document.getElementById('modalDesc').textContent  = item.dataset.desc;

  // Use the actual src from the clicked item's img element
  const clickedImg = item.querySelector('.ability-img-wrap img');
  const modalImg = document.getElementById('modalImg');
  const placeholder = document.getElementById('modalImgPlaceholder');

  if (clickedImg && clickedImg.style.display !== 'none') {
    modalImg.style.display = 'block';
    placeholder.style.display = 'none';
    modalImg.src = clickedImg.src;
    modalImg.onerror = function () {
      this.style.display = 'none';
      placeholder.style.display = 'flex';
    };
  } else {
    modalImg.style.display = 'none';
    placeholder.style.display = 'flex';
  }

  document.getElementById('abilModal').classList.add('show');
}

function closeAbility() {
  document.getElementById('abilModal').classList.remove('show');
}

document.getElementById('abilModal').addEventListener('click', e => {
  if (e.target === document.getElementById('abilModal')) closeAbility();
});


/* ============================================================
   THE OTHERS — character data & popup modal
   Popup image = same image shown on hover (the reveal image)
   ============================================================ */
const charData = {
  waiter: {
    name:  'The Waiter',
    badge: '✦ MAGIC CAFÉ STAFF ✦',
    role:  'Barista & Quiet Observer',
    img:   'images/waiter_reveal.jpg',
    desc:  "He's been at the Magic Café longer than most remember. Warm, attentive, always there with the right cup at the right time. He noticed Clementine long before she noticed him — she's been coming in so often, he could predict her order to the second. Something about her caught his eye. Something he can't quite explain.",
    tag:   '🫶 Has a soft spot for regulars'
  },
  boy: {
    name:  'The Small Boy',
    badge: '✦ MYSTERY ✦',
    role:  'The Stuck One',
    img:   'images/boy_reveal.jpg',
    desc:  "No one knows how long he's been sitting in that corner booth. He has a half-finished hot chocolate that never goes cold. Clementine was the first one to actually sit across from him — to ask him his name. Together they start unravelling why he can't leave, and what the café is really holding onto.",
    tag:   '☕ The hot chocolate never gets cold'
  }
};

function openOther(key) {
  const d = charData[key];

  document.getElementById('charModalBadge').textContent = d.badge;
  document.getElementById('charModalName').textContent  = d.name;
  document.getElementById('charModalRole').textContent  = d.role;
  document.getElementById('charModalDesc').textContent  = d.desc;
  document.getElementById('charModalTag').textContent   = d.tag;

  const img         = document.getElementById('charModalImg');
  const placeholder = document.getElementById('charModalImgPlaceholder');
  img.style.display = 'block';
  placeholder.style.display = 'none';
  img.src = d.img;
  img.onerror = function () {
    this.style.display = 'none';
    placeholder.style.display = 'flex';
    this.onerror = null;
  };

  document.getElementById('charModal').classList.add('show');
}

function closeOther() {
  document.getElementById('charModal').classList.remove('show');
}

document.getElementById('charModal').addEventListener('click', e => {
  if (e.target === document.getElementById('charModal')) closeOther();
});


/* ============================================================
   ABOUT ME — icon modal: shows the same image as the icon
   ============================================================ */
const aboutData = {
  za: {
    img:   'images/south_africa.png',
    title: 'Proudly South African',
    body:  "I'm Pedi! 🌿 My home language is Sepedi — a rich, vibrant language full of warmth and meaning. I grew up in Johannesburg, the city of gold, where cultures collide and energy never sleeps. My roots, my family, my heritage are everything to me.",
    extra: '"Dumela" — Hello / I greet you 🌟  (Sepedi greeting)'
  },
  br: {
    img:   'images/brazil.png',
    title: 'Aprendendo Português! 🌺',
    body:  "I'm on a journey learning Brazilian Portuguese and I absolutely love it! There's something so musical about it. Every new word feels like opening a little gift. Big part of my love for it? Jorge Ben — his music is pure joy and groove, and honestly it makes me want to understand every single lyric.",
    extra: '"A vida é bela!" — Life is beautiful! 🌸'
  },
  cn: {
    img:   'images/china.png',
    title: 'Exploring Chinese Culture',
    body:  "I have a deep appreciation for Chinese culture — the art, the food, the philosophy, the sheer depth of history. It's one of those fascinating worlds within a world. I love learning about different cultures and finding the unexpected things that connect us all.",
    extra: 'My name in Chinese — 姆波 (Mǔ bō) ✨'
  },
  phone: {
    img:   'images/phone.png',
    title: 'My Hobbies & Interests',
    body:  "I'd love to tell you I spend my free time watching romance movies and listening to a plethora of music — mainly jazz, which I do actually participate in. But in all reality? School overwhelms me so completely that most days I'm just scrolling on my phone and having long calls with the people I love. And honestly... that's enough. 🤍",
    extra: 'Real hobby: keeping my people close 📞'
  },
  bible: {
    img:   'images/bible.png',
    title: 'Faith First — Always',
    body:  "I'm a Christian and my faith is the foundation of everything. I believe deeply in the power of prayer — like, genuinely believe it changes things. My relationship with God is personal, real, and growing every day. Faith gives me peace even when things are uncertain, and it shows up in my work too.",
    extra: '"With God, all things are possible." 🤍  Matthew 19:26'
  }
};

function openAboutModal(key) {
  const d = aboutData[key];
  const modalImg   = document.getElementById('aboutModalImg');
  const placeholder = document.getElementById('aboutModalImgPlaceholder');

  // Show the same image that's on the main page
  modalImg.src = d.img;
  modalImg.style.display = 'block';
  placeholder.style.display = 'none';
  modalImg.onerror = function () {
    this.style.display = 'none';
    placeholder.style.display = 'flex';
    this.onerror = null;
  };

  document.getElementById('aboutModalTitle').textContent = d.title;
  document.getElementById('aboutModalBody').textContent  = d.body;
  document.getElementById('aboutModalExtra').textContent = d.extra;
  document.getElementById('aboutModal').classList.add('show');
}

function closeAboutModal() {
  document.getElementById('aboutModal').classList.remove('show');
}

document.getElementById('aboutModal').addEventListener('click', e => {
  if (e.target === document.getElementById('aboutModal')) closeAboutModal();
});


/* ============================================================
   HEIGHT TOAST
   ============================================================ */
function showHeightJoke() {
  const toast = document.getElementById('heightToast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}


/* ============================================================
   MUSIC PLAYER
   ============================================================ */
let musicPlaying = false;

function toggleMusic() {
  const audio  = document.getElementById('cafeAudio');
  const btn    = document.getElementById('musicBtn');
  const label  = document.getElementById('musicLabel');
  const bars   = document.getElementById('musicBars');

  if (musicPlaying) {
    audio.pause();
    btn.classList.remove('playing');
    label.textContent = 'Play Café Jazz';
    bars.classList.remove('active');
    musicPlaying = false;
  } else {
    audio.play().catch(() => {
      label.textContent = 'Could not play — check file name!';
    });
    btn.classList.add('playing');
    label.textContent = 'Pause ♪';
    bars.classList.add('active');
    musicPlaying = true;
  }
}


/* ============================================================
   GLOBAL KEYBOARD HANDLER
   ============================================================ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeAbility();
    closeOther();
    closeAboutModal();
  }
});



