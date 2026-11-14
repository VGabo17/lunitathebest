const EXPERIENCES = [
  {
    name: "Domix Community",
    role: "Manager",
    category: "leadership",
    active: true,
    logo: "assets/domix.png",
    description: "Gestión integral de comunidad, coordinación de equipo de staff y organización de actividades."
  },
  {
    name: "Synthetix Studio",
    role: "Founder",
    category: "leadership",
    active: true,
    logo: "assets/synthetix.png",
    description: "Fundador y director creativo de Synthetix Studio, liderando proyectos y desarrollo de servicios digitales."
  },
  {
    name: "Mr Store",
    role: "Founder",
    category: "leadership",
    active: true,
    logo: "assets/mrstore.png",
    description: "Fundador de Mr Store, encargado de la administración, atención al cliente y crecimiento comercial."
  },
  {
    name: "LionsBuild",
    role: "Ex-Developer",
    category: "staff",
    active: false,
    logo: "assets/lionsbuild.png",
    description: "Desarrollo técnico, configuración y soporte en el entorno de LionsBuild."
  },
  {
    name: "MineKast",
    role: "Ex-Operator",
    category: "leadership",
    active: false,
    logo: "assets/minekast.png",
    description: "Operación administrativa, supervisión del servidor y toma de decisiones operativas."
  },
  {
    name: "Minefun",
    role: "Ex-Mod",
    category: "staff",
    active: false,
    logo: "assets/minefun.png",
    description: "Moderación activa, resolución de reportes y mantenimiento del orden dentro de la comunidad."
  },
  {
    name: "PyroMC",
    role: "Ex-Mod",
    category: "staff",
    active: false,
    logo: "assets/pyromc.png",
    description: "Moderación de jugadores, control de reglas y asistencia directa a usuarios en PyroMC."
  },
  {
    name: "PandaCraft",
    role: "Ex-Founder",
    category: "leadership",
    active: false,
    logo: "assets/pandacraft.png",
    description: "Fundación, planificación general y dirección del proyecto PandaCraft."
  },
  {
    name: "NixerMC",
    role: "Ex-Manager",
    category: "leadership",
    active: false,
    logo: "assets/nixermc.png",
    description: "Gestión del equipo administrativo, coordinación interna y optimización del servidor."
  },
  {
    name: "TopBox",
    role: "Ex-Manager",
    category: "leadership",
    active: false,
    logo: "assets/topbox.png",
    description: "Dirección de personal y gestión operativa en TopBox Network."
  },
  {
    name: "Silveon Network",
    role: "Ex-Jr. Mod",
    category: "staff",
    active: false,
    logo: "assets/silveon.png",
    description: "Asistencia inicial a jugadores, vigilancia del chat y apoyo al equipo de moderación."
  },
  {
    name: "MineTrix",
    role: "Ex-Founder",
    category: "leadership",
    active: false,
    logo: "assets/minetrix.png",
    description: "Creación y liderazgo general de MineTrix desde sus etapas iniciales."
  }
];

const cardsGrid = document.getElementById("cards-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("modal");
const toast = document.getElementById("toast");

const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function updateStats() {
  document.getElementById("stat-total").textContent = EXPERIENCES.length;
  document.getElementById("stat-active").textContent = EXPERIENCES.filter((e) => e.active).length;
  document.getElementById("stat-leadership").textContent = EXPERIENCES.filter(
    (e) => e.category === "leadership"
  ).length;
}

function renderCards(filter = "all") {
  const filtered = EXPERIENCES.filter((item) => {
    if (filter === "active") return item.active;
    if (filter === "leadership") return item.category === "leadership";
    if (filter === "staff") return item.category === "staff";
    return true;
  });

  cardsGrid.innerHTML = "";

  filtered.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "card";
    card.style.animationDelay = `${index * 40}ms`;

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
    `;

    card.addEventListener("click", () => openModal(item));
    cardsGrid.appendChild(card);
  });
}

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

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function copyDiscord() {
  navigator.clipboard.writeText("lunitathebest").then(() => {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2400);
  });
}

// Eventos
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderCards(btn.dataset.filter);
  });
});

document.getElementById("modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

document.getElementById("copy-discord").addEventListener("click", copyDiscord);
document.getElementById("copy-discord-footer").addEventListener("click", copyDiscord);
document.getElementById("year").textContent = new Date().getFullYear();

// Inicialización
updateStats();
renderCards();
