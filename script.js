const EXPERIENCES = [
  {
    name: "Domix Community",
    role: "Manager",
    category: "leadership",
    active: true,
    logo: "assets/domix.png",
    tags: ["Gestión de Staff", "Comunidad", "Eventos"],
    description: "Dirección operativa de la comunidad, supervisión del equipo administrativo y organización constante."
  },
  {
    name: "Synthetix Studio",
    role: "Founder",
    category: "leadership",
    active: true,
    logo: "assets/synthetix.png",
    tags: ["Fundador", "Dirección", "Servicios Digitales"],
    description: "Fundador y líder estratégico de Synthetix Studio, impulsando calidad, marca y coordinación de proyectos."
  },
  {
    name: "Mr Store",
    role: "Founder",
    category: "leadership",
    active: true,
    logo: "assets/mrstore.png",
    tags: ["Fundador", "E-Commerce", "Atención al Cliente"],
    description: "Fundador de Mr Store, encargado de la gestión comercial, soporte y expansión de la tienda."
  },
  {
    name: "LionsBuild",
    role: "Ex-Developer",
    category: "staff",
    active: false,
    logo: "assets/lionsbuild.png",
    tags: ["Desarrollo", "Configuración", "Soporte Técnico"],
    description: "Encargado de tareas de desarrollo, optimización técnica y soluciones dentro de LionsBuild."
  },
  {
    name: "MineKast",
    role: "Ex-Operator",
    category: "leadership",
    active: false,
    logo: "assets/minekast.png",
    tags: ["Operación", "Administración", "Supervisión"],
    description: "Operador del servidor con enfoque en estabilidad, control administrativo y apoyo a la dirección."
  },
  {
    name: "Minefun",
    role: "Ex-Mod",
    category: "staff",
    active: false,
    logo: "assets/minefun.png",
    tags: ["Moderación", "Soporte", "Reportes"],
    description: "Moderación activa en servidor y Discord, garantizando un ambiente sano para la comunidad."
  },
  {
    name: "PyroMC",
    role: "Ex-Mod",
    category: "staff",
    active: false,
    logo: "assets/pyromc.png",
    tags: ["Moderación", "Control de Reglas", "Asistencia"],
    description: "Resolución de incidencias, vigilancia del cumplimiento de normativas y atención a jugadores."
  },
  {
    name: "PandaCraft",
    role: "Ex-Founder",
    category: "leadership",
    active: false,
    logo: "assets/pandacraft.png",
    tags: ["Fundador", "Liderazgo", "Gestión General"],
    description: "Creación del proyecto desde cero, estructuración de rangos y administración general."
  },
  {
    name: "NixerMC",
    role: "Ex-Manager",
    category: "leadership",
    active: false,
    logo: "assets/nixermc.png",
    tags: ["Manager", "Coordinación", "Equipo Staff"],
    description: "Gestión integral del staff, entrevistas, ascensos y planificación interna en NixerMC."
  },
  {
    name: "TopBox",
    role: "Ex-Manager",
    category: "leadership",
    active: false,
    logo: "assets/topbox.png",
    tags: ["Manager", "Operaciones", "BoxPvP / Network"],
    description: "Dirección administrativa y coordinación de equipo dentro de TopBox Network."
  },
  {
    name: "Silveon Network",
    role: "Ex-Jr. Mod",
    category: "staff",
    active: false,
    logo: "assets/silveon.png",
    tags: ["Jr. Mod", "Chat", "Soporte Inicial"],
    description: "Primer contacto de soporte para usuarios, control de chat y escalado de reportes."
  },
  {
    name: "MineTrix",
    role: "Ex-Founder",
    category: "leadership",
    active: false,
    logo: "assets/minetrix.png",
    tags: ["Fundador", "Visión", "Network"],
    description: "Fundador de MineTrix, liderando la propuesta inicial, equipo base y dirección del servidor."
  }
];

const state = {
  filter: "all",
  query: "",
  view: "grid"
};

const cardsGrid = document.getElementById("cards-grid");
const emptyState = document.getElementById("empty-state");
const filterButtons = document.querySelectorAll(".filter-btn");
const viewButtons = document.querySelectorAll(".view-btn");
const searchInput = document.getElementById("search-input");
const modal = document.getElementById("modal");
const toast = document.getElementById("toast");
const menuToggle = document.getElementById("menu-toggle");
const mobileDrawer = document.getElementById("mobile-drawer");
const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const getInitials = (name) =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/* 1. Cinta infinita (Marquee) */
function initMarquee() {
  const track = document.getElementById("marquee-track");
  const itemsHTML = EXPERIENCES.map(
    (item) => `<span class="marquee-item"><strong>${item.role}</strong> • ${item.name}</span>`
  ).join("");
  track.innerHTML = itemsHTML + itemsHTML;
}

/* 2. Contadores automáticos */
function setupCounters() {
  const total = EXPERIENCES.length;
  const active = EXPERIENCES.filter((e) => e.active).length;
  const leadership = EXPERIENCES.filter((e) => e.category === "leadership").length;
  const staff = EXPERIENCES.filter((e) => e.category === "staff").length;

  document.getElementById("stat-total").dataset.target = total;
  document.getElementById("stat-active").dataset.target = active;
  document.getElementById("stat-leadership").dataset.target = leadership;
  document.getElementById("stat-staff").dataset.target = staff;
}

/* 3. Renderizado de tarjetas */
function renderCards() {
  const filtered = EXPERIENCES.filter((item) => {
    const matchesFilter =
      state.filter === "all" ||
      (state.filter === "active" && item.active) ||
      item.category === state.filter;

    const term = state.query.trim().toLowerCase();
    const matchesSearch =
      !term ||
      item.name.toLowerCase().includes(term) ||
      item.role.toLowerCase().includes(term) ||
      item.tags.some((t) => t.toLowerCase().includes(term));

    return matchesFilter && matchesSearch;
  });

  cardsGrid.classList.toggle("timeline-view", state.view === "timeline");
  cardsGrid.innerHTML = "";
  emptyState.hidden = filtered.length > 0;

  filtered.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "card";
    card.style.animationDelay = `${index * 30}ms`;

    const badgeClass = item.active ? "badge-active" : "badge-past";
    const badgeText = item.active ? "Actual" : "Trayectoria";

    card.innerHTML = `
      <span class="badge ${badgeClass}">${badgeText}</span>
      <div class="card-top">
        <div class="card-logo">
          <img
            src="${item.logo}"
            alt="Logo de ${item.name}"
            onerror="this.replaceWith(Object.assign(document.createElement('span'), {className:'logo-fallback', textContent:'${getInitials(item.name)}'}))"
          />
        </div>
        <div>
          <h3 class="card-title">${item.name}</h3>
          <p class="card-role">${item.role}</p>
        </div>
      </div>
      <div class="card-footer">
        <span>${item.tags[0]}</span>
        <span class="card-more">Ver detalles &rarr;</span>
      </div>
    `;

    // Solo activar 3D y spotlight en dispositivos con mouse
    if (isFinePointer) {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        if (state.view === "grid") {
          const rotateX = ((y / rect.height) - 0.5) * -6;
          const rotateY = ((x / rect.width) - 0.5) * 6;
          card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        }
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    }

    card.addEventListener("click", () => openModal(item));
    cardsGrid.appendChild(card);
  });
}

/* 4. Modal */
function openModal(item) {
  const modalIcon = document.getElementById("modal-icon");
  const modalBadge = document.getElementById("modal-badge");

  modalIcon.innerHTML = `
    <img
      src="${item.logo}"
      alt="${item.name}"
      onerror="this.replaceWith(Object.assign(document.createElement('span'), {className:'logo-fallback', textContent:'${getInitials(item.name)}'}))"
    />
  `;

  modalBadge.className = `badge ${item.active ? "badge-active" : "badge-past"}`;
  modalBadge.textContent = item.active ? "Cargo Actual" : "Experiencia Previa";

  document.getElementById("modal-title").textContent = item.name;
  document.getElementById("modal-role").textContent = item.role;
  document.getElementById("modal-desc").textContent = item.description;
  document.getElementById("modal-tags").innerHTML = item.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* 5. Typewriter */
function initTypewriter() {
  const phrases = [
    "Founder en Synthetix Studio",
    "Founder en Mr Store",
    "Manager en Domix Community",
    "Ex-Developer & Staff Experimentado"
  ];
  const el = document.getElementById("typewriter");
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIdx];
    el.textContent = current.slice(0, charIdx);

    if (!deleting && charIdx < current.length) {
      charIdx++;
      setTimeout(tick, 60);
    } else if (!deleting && charIdx === current.length) {
      deleting = true;
      setTimeout(tick, 1750);
    } else if (deleting && charIdx > 0) {
      charIdx--;
      setTimeout(tick, 32);
    } else {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(tick, 280);
    }
  }

  tick();
}

/* 6. Partículas Rojo Vino */
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.min(42, Math.floor(window.innerWidth / 24));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.6,
      vy: -(Math.random() * 0.4 + 0.15),
      vx: (Math.random() - 0.5) * 0.22,
      alpha: Math.random() * 0.45 + 0.2
    }));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 51, 85, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  resize();
  createParticles();
  animate();
  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
}

/* 7. Observadores de Scroll */
function initScrollObservers() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");

        entry.target.querySelectorAll(".skill-fill").forEach((bar) => {
          bar.style.width = bar.dataset.width;
        });

        entry.target.querySelectorAll(".counter").forEach((counter) => {
          if (counter.dataset.done) return;
          counter.dataset.done = "true";
          const target = Number(counter.dataset.target || 0);
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 18));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = current;
            }
          }, 35);
        });
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  window.addEventListener("scroll", () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    document.getElementById("scroll-progress").style.width = `${progress}%`;
  });
}

/* 8. Menú Móvil & Copiar Discord */
function toggleMobileMenu(forceClose = false) {
  const isOpen = forceClose ? false : !mobileDrawer.classList.contains("open");
  mobileDrawer.classList.toggle("open", isOpen);
  mobileDrawer.setAttribute("aria-hidden", String(!isOpen));
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function copyDiscord() {
  navigator.clipboard.writeText("lunitathebest").then(() => {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2400);
  });
}

/* Eventos */
menuToggle.addEventListener("click", () => toggleMobileMenu());
document.querySelectorAll(".drawer-link").forEach((link) => {
  link.addEventListener("click", () => toggleMobileMenu(true));
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.filter = btn.dataset.filter;
    renderCards();
  });
});

viewButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    viewButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.view = btn.dataset.view;
    renderCards();
  });
});

searchInput.addEventListener("input", (e) => {
  state.query = e.target.value;
  renderCards();
});

document.getElementById("modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

document.getElementById("copy-discord").addEventListener("click", copyDiscord);
document.getElementById("copy-discord-footer").addEventListener("click", copyDiscord);
document.getElementById("year").textContent = new Date().getFullYear();

/* Inicio */
setupCounters();
initMarquee();
renderCards();
initTypewriter();
initParticles();
initScrollObservers();
