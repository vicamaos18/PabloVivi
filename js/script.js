/* ==========================================================================
   VIVIANA & [NOMBRE] — NUESTRA HISTORIA
   Script principal del sitio.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------
     1) AOS — Animate On Scroll
  ------------------------------------------------------------------ */
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }

  /* ------------------------------------------------------------------
     2) Scroll suave para el botón "Comenzar nuestra historia"
        (y cualquier ancla interna)
  ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ------------------------------------------------------------------
     3) Barra de progreso de lectura + navegación por puntos activa
  ------------------------------------------------------------------ */
  const progressBar = document.getElementById('scroll-progress');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const dotLinks = Array.from(document.querySelectorAll('.dot-link'));

  function updateOnScroll() {
    // Barra de progreso
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';

    // Sección activa para dot-nav
    let currentId = sections.length ? sections[0].id : null;
    const middle = scrollTop + window.innerHeight * 0.4;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= middle) {
        currentId = sec.id;
      }
    });
    dotLinks.forEach(function (dot) {
      dot.classList.toggle('active', dot.getAttribute('href') === '#' + currentId);
    });
  }

  window.addEventListener('scroll', updateOnScroll, { passive: true });
  updateOnScroll();

  /* ------------------------------------------------------------------
     4) Corazones flotantes decorativos
  ------------------------------------------------------------------ */
  const heartsContainer = document.getElementById('floating-hearts');
  if (heartsContainer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    function spawnHeart() {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = '❤';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
      heart.style.fontSize = (0.8 + Math.random() * 1.4) + 'rem';
      const duration = 10 + Math.random() * 8;
      heart.style.animationDuration = duration + 's';
      heartsContainer.appendChild(heart);
      setTimeout(function () {
        heart.remove();
      }, duration * 1000 + 500);
    }
    // Un corazón nuevo cada pocos segundos, sin saturar la página
    setInterval(spawnHeart, 3200);
    spawnHeart();
  }

  /* ------------------------------------------------------------------
     5) SECCIÓN 4 — Blur reveal de la foto del mar
  ------------------------------------------------------------------ */
  const revealBtn = document.getElementById('reveal-photo-btn');
  const revealMessage = document.getElementById('reveal-message');

  if (revealBtn) {
    revealBtn.addEventListener('click', function () {
      if (revealBtn.classList.contains('revealed')) return;
      revealBtn.classList.add('revealed');
      setTimeout(function () {
        if (revealMessage) revealMessage.classList.add('show');
      }, 500);

      // Pequeño estallido de confeti dorado al revelar (si la librería ya cargó)
      if (window.confetti) {
        confetti({
          particleCount: 60,
          spread: 55,
          startVelocity: 28,
          scalar: 0.8,
          colors: ['#C6A15B', '#E3C691', '#FFFAF0'],
          origin: { y: 0.6 },
        });
      }
    });
  }

  /* ------------------------------------------------------------------
     6) SECCIÓN 7 — Collage: soporte táctil (tap para mostrar overlay)
  ------------------------------------------------------------------ */
  document.querySelectorAll('.collage-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const wasTouched = item.classList.contains('touched');
      document.querySelectorAll('.collage-item.touched').forEach(function (other) {
        if (other !== item) other.classList.remove('touched');
      });
      item.classList.toggle('touched', !wasTouched);
    });
  });

  /* ------------------------------------------------------------------
     7) SECCIÓN 6 — Flip cards: soporte táctil (tap para voltear)
  ------------------------------------------------------------------ */
  document.querySelectorAll('.flip-card').forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('flipped');
    });
  });

  /* ------------------------------------------------------------------
     8) SECCIÓN 9 — Ruleta del amor
  ------------------------------------------------------------------ */

  // EDITAR AQUÍ: opciones de la ruleta (texto que se muestra en cada gajo)
  const WHEEL_OPTIONS = [
    ' Salida por helado',
    ' Ver un atardecer juntos',
    ' Noche de películas',
    ' Tarde de picnic',
    ' Juan valdez y charla larga',
    ' Cena especial',
    ' Domingo de spa en casa',
    ' Tarde de juegos de mesa',
    ' Sorpresa secreta',
  ];

  const WHEEL_COLORS = [
    '#3A5A78', '#C6A15B', '#233A52', '#E3C691',
    '#3A5A78', '#C6A15B', '#233A52', '#E3C691', '#3A5A78',
  ];

  const wheelCanvas = document.getElementById('wheelCanvas');
  const spinBtn = document.getElementById('spinBtn');
  const wheelResult = document.getElementById('wheelResult');

  if (wheelCanvas && window.CanvasRenderingContext2D) {
    const ctx = wheelCanvas.getContext('2d');
    const size = wheelCanvas.width;
    const center = size / 2;
    const radius = size / 2 - 6;
    const sliceAngle = (2 * Math.PI) / WHEEL_OPTIONS.length;
    let currentRotation = 0; // grados acumulados aplicados vía CSS transform
    let spinning = false;

    function drawWheel() {
      ctx.clearRect(0, 0, size, size);
      WHEEL_OPTIONS.forEach(function (label, i) {
        const startAngle = i * sliceAngle;
        const endAngle = startAngle + sliceAngle;

        // Gajo
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,250,240,0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Texto
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#FFFAF0';
        ctx.font = '600 15px Jost, sans-serif';
        ctx.fillText(label, radius - 18, 0);
        ctx.restore();
      });

      // Círculo central decorativo
      ctx.beginPath();
      ctx.arc(center, center, 30, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFAF0';
      ctx.fill();
      ctx.strokeStyle = '#C6A15B';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = '#C6A15B';
      ctx.font = '20px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('❤', center, center + 1);
    }

    drawWheel();

    function fireConfetti() {
      if (!window.confetti) return;
      const duration = 2200;
      const end = Date.now() + duration;
      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 65,
          origin: { x: 0, y: 0.6 },
          colors: ['#C6A15B', '#E3C691', '#3A5A78', '#FFFAF0'],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 65,
          origin: { x: 1, y: 0.6 },
          colors: ['#C6A15B', '#E3C691', '#3A5A78', '#FFFAF0'],
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#C6A15B', '#E3C691', '#3A5A78', '#FFFAF0'],
      });
    }

    if (spinBtn) {
      spinBtn.addEventListener('click', function () {
        if (spinning) return;
        spinning = true;
        spinBtn.disabled = true;
        if (wheelResult) {
          wheelResult.textContent = '';
        }

        const winnerIndex = Math.floor(Math.random() * WHEEL_OPTIONS.length);

        // Ángulo (en grados) para que el puntero termine centrado en el gajo
        // ganador, con varias vueltas completas.
        //
        // Sistema de ángulos del canvas: 0° = derecha (3 en punto), y crece
        // en sentido horario (90° = abajo, 180° = izquierda, 270° = arriba).
        // El puntero (.wheel-pointer) está ubicado ARRIBA del todo, es decir
        // en 270°, NO en 0°. Por eso el cálculo debe usar 270° como
        // referencia; usar 0° (como se hacía antes) hace que el texto
        // siempre reporte el gajo que queda a la derecha (3 en punto) en
        // lugar del que señala la flecha.
        const sliceDeg = 360 / WHEEL_OPTIONS.length;
        const winnerCenterDeg = winnerIndex * sliceDeg + sliceDeg / 2;
        const pointerDeg = 270; // posición del puntero: arriba (12 en punto)
        const targetMod = ((pointerDeg - winnerCenterDeg) % 360 + 360) % 360;
        const extraSpins = 6; // vueltas completas antes de detenerse
        const targetRotation =
          currentRotation -
          (currentRotation % 360) +
          360 * extraSpins +
          targetMod;

        currentRotation = targetRotation;
        wheelCanvas.style.transform = 'rotate(' + currentRotation + 'deg)';

        setTimeout(function () {
          spinning = false;
          spinBtn.disabled = false;
          if (wheelResult) {
            wheelResult.textContent = 'La ruleta eligió: ' + WHEEL_OPTIONS[winnerIndex];
          }
          fireConfetti();
        }, 5600); // debe coincidir con la duración de transición en CSS (#wheelCanvas)
      });
    }
  }

  /* ------------------------------------------------------------------
     9) Fallback de confeti: canvas ligero sin dependencias externas
        (se activa solo si la librería canvas-confetti no cargó,
        por ejemplo sin conexión a internet)
  ------------------------------------------------------------------ */
  if (!window.confetti) {
    window.confetti = function (opts) {
      const canvas = document.getElementById('confettiCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = (opts && opts.particleCount) || 60;
      const colors = (opts && opts.colors) || ['#C6A15B', '#3A5A78', '#FFFAF0'];
      const particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 1.2) * 12,
          size: 4 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
        });
      }
      let frame = 0;
      function tick() {
        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (p) {
          p.vy += 0.3;
          p.x += p.vx;
          p.y += p.vy;
          p.life++;
          ctx.globalAlpha = Math.max(0, 1 - p.life / 60);
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        });
        ctx.globalAlpha = 1;
        if (frame < 60) {
          requestAnimationFrame(tick);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      tick();
    };
  }

});
